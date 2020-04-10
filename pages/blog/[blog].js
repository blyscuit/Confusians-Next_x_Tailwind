import { useEffect, useState } from 'react'
import Head from 'next/head'
import Post from '../../components/blog/post'
import { Helmet } from 'react-helmet';
import catalog from '../../db/catalog.json'
import Layout from '../../components/MyLayout.js'

const client = require('contentful').createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
})

const BlogPage = props => {
  async function fetchEntries() {
  console.log(props)
  if (props.id != null) {
    const entry = await client.getEntry(
      props.id)
      console.log(entry)
    if (entry) return entry
  } else {
    const entries = await client.getEntries({
      "fields.title": props.blog,
      content_type: "post"})
    if (entries.items) return entries.items[0] || {}
    console.log(`Error getting Entries for ${contentType.name}.`)
  }
  }

  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function getPosts() {
      const allPosts = await fetchEntries()
      setPosts(allPosts)
    }
    getPosts()
  }, [])

  return (
        <Layout footer={true}>
        <Helmet>
          <title>Confusians | Blog</title>
          <body class={"white"}></body>
        </Helmet>
        <div class="min-h-screen flex flex-col items-center pt-20" style={{"paddingBottom": "-60rem"}}>
      {posts.fields != null
        ? <Post
        detail={posts.fields.detail}
        alt={posts.fields.alt}
        date={posts.fields.date}
        key={posts.fields.title}
        image={posts.fields.image}
        title={posts.fields.title}
        url={posts.fields.url}
      />
        : null}
        </div>
        </Layout>
  )
}

BlogPage.getInitialProps = async function (context) {
  return context.query;
};

export default BlogPage