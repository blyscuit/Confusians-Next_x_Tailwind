
export var perPage = 4

export default async function fetchPage(context, perPage) {

  const client = require('contentful').createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
  })

  var { page } = context.query || ""
  var pageInt = parseInt(page) || 1
  pageInt = pageInt > 0 ? pageInt : 1
  const entries = await client.getEntries({
    limit: perPage,
    skip: ((parseInt(page) || 1) - 1) * perPage,

    order: '-fields.date',
    content_type: "post"
  })

  return { props:
      { totalCount: entries.total, page: pageInt + 1, entries: entries.items}
  }
};