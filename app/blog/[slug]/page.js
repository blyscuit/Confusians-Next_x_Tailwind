
import { createClient } from 'contentful'
import BlogDetailPost from './post'


const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
})

export default async function BlogDetail({ params, searchParams }) {

  let post = null

  if (searchParams?.id) {
    post = await client.getEntry(searchParams.id)
  } else {
    const entries = await client.getEntries({
      'fields.title': decodeURIComponent(params.slug), // decode %20 to space
      content_type: 'post'
    })
    post = entries.items[0] || null
  }

  return (
    <BlogDetailPost post={post}></BlogDetailPost>
  )
}
