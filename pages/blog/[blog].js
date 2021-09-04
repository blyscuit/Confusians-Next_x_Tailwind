import Head from 'next/head'
import Post from '../../components/blog/post'
import { Helmet } from 'react-helmet';
import Layout from '../../components/MyLayout.js'

const client = require('contentful').createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
})

const BlogDetail = props => {

  const posts = props

  return (
        <Layout footer={true}>
        <Helmet>
          <title>{posts.fields != null ? posts.fields.title + " | " : ""} Confusians | Blog</title>
          <body class={"white"}></body>
        </Helmet>

        <Head>
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={(posts.fields != null ? posts.fields.title + " | " : "") + "Confusians | Blog"} />
          <meta property="og:site_name" content="Confusians" />
          <meta property="og:image" content={(posts.fields != null ? posts.fields.image : "")} />
          <meta name="twitter:card" content="app" />
          <meta name="twitter:description" content={""} />
          <meta name="twitter:title" content={(posts.fields != null ? posts.fields.title : "")} />
        </Head>

        <div class="min-h-screen flex flex-col items-center pt-20" style={{"paddingBottom": "-60rem"}}>
      {posts.fields != null
        ? <Post
        alt={posts.fields.alt}
        date={posts.fields.date}
        key={posts.fields.title}
        image={posts.fields.image}
        title={posts.fields.title}
        url={posts.fields.url}
        markdown={posts.fields.markdown}
        isDetail={true}
      />
        : null}
        </div>
        </Layout>
  )
}

export async function getServerSideProps(context) {

  async function fetchEntries() {
    if (context.query.id != null) {
      const entry = await client.getEntry(
        context.query.id)
      if (entry) return entry
    } else {
      const entries = await client.getEntries({
        "fields.title": context.query.blog,
        content_type: "post"})
      if (entries.items) return entries.items[0] || {}
      console.log(`Error getting Entries for ${contentType.name}.`)
    }
    }

  return  { props:
    await fetchEntries()
  }
};

export default BlogDetail