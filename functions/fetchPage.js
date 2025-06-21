
export var perPage = 4

export default async function fetchPage(context, perPage) {

  const client = require('contentful').createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
  })

  var blogPage = context.query.page
  blogPage = blogPage || ""
  if (blogPage == "") { 
    blogPage = '1' 
  }
  var pageInt = parseInt(blogPage)
  if (isNaN(pageInt)) {
    return {
      redirect: {
        destination: '/blog',
        permanent: false,
      },
    }
  }

  pageInt = pageInt > 0 ? pageInt : 1
  var skip = (pageInt - 1) * perPage
  const entries = await client.getEntries({
    limit: perPage,
    skip: skip,
    order: '-fields.date',
    content_type: "post"
  })
  return { totalCount: entries.total, page: pageInt, entries: entries.items }
};
