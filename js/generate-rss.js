const fs = require("fs");
const path = require("path");
const RSS = require("rss");
const { createClient } = require("contentful");

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

async function generateRSS() {
  const feed = new RSS({
    title: "Confusians Blog RSS Feed",
    description: "Latest blog posts from Confusians",
    feed_url: "https://confusians.com/rss.xml",
    site_url: "https://confusians.com",
    language: "en",
  });

  const entries = await client.getEntries({
    limit: 20,
    order: '-fields.date',
    content_type: "post"
  });

  entries.items.forEach((item) => {
    const slug = item.fields.slug;
    const title = item.fields.title;
    const description = item.fields.description || "";
    const publishDate = item.fields.publishDate;
    const url = `https://confusians.com/blog/${slug}`;

    feed.item({
      title,
      description,
      url,
      date: publishDate,
    });
  });

  const rss = feed.xml({ indent: true });
  fs.writeFileSync(path.join(__dirname, "../public/rss.xml"), rss);
  console.log("✅ RSS feed generated: public/rss.xml");
}

generateRSS();
