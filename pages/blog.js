import { useEffect, useState } from 'react'
import Head from 'next/head'
import Post from '../components/blog/post'
import { Helmet } from 'react-helmet';
import catalog from '../db/catalog.json'
import Layout from '../components/MyLayout.js'

const client = require('contentful').createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
})

function HomePage() {
  async function fetchEntries() {
    const entries = await client.getEntries({
        order: 'sys.createdAt',
        content_type: "post"})
    console.log(entries)
    if (entries.items) return entries.items
    console.log(`Error getting Entries for ${contentType.name}.`)
  }

  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function getPosts() {
      const allPosts = await fetchEntries()
      setPosts([...allPosts])
    }
    getPosts()
  }, [])

  return (
        <Layout footer={true}>
        <Helmet>
          <title>Confusians | Blog</title>
          <body class={catalog.home.backgroundColor}></body>
        </Helmet>
        <div class="min-h-screen flex flex-col items-center pt-20" style={{"paddingBottom": "-60rem"}}>
      {posts.length > 0
        ? posts.map(p => (
            <Post
              detail={p.fields.detail}
              alt={p.fields.alt}
              date={p.fields.date}
              key={p.fields.title}
              image={p.fields.image}
              title={p.fields.title}
              url={p.fields.url}
            />
          ))
        : null}
        </div>
        </Layout>
  )
}

export default HomePage