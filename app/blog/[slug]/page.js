"use client"

import { Helmet } from 'react-helmet'
import { createClient } from 'contentful'
import Post from '../../../components/blog/post'
import Layout from '../../../components/MyLayout'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
})

export default async function BlogDetail({ params, searchParams }) {
  console.log('BlogDetail params:', params)
  console.log('BlogDetail searchParams:', searchParams)

  let post = null

  if (searchParams?.id) {
    post = await client.getEntry(searchParams.id)
  } else {
    const entries = await client.getEntries({
      'fields.title': params.blog,
      content_type: 'post'
    })
    post = entries.items[0] || null
  }

  if (!post) return <div>Not found</div>

  return (
    <Layout footer={true}>
      <Helmet>
        <title>{post.fields?.title} | Confusians | Blog</title>
      </Helmet>
      <div className="min-h-screen flex flex-col items-center pt-20">
        <Post
          alt={post.fields.alt}
          date={post.fields.date}
          key={post.fields.title}
          image={post.fields.image}
          title={post.fields.title}
          url={post.fields.url}
          markdown={post.fields.markdown}
          isDetail={true}
        />
      </div>
    </Layout>
  )
}
