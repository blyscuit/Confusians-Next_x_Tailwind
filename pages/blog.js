import { useEffect, useState } from 'react'
import Head from 'next/head'
import Post from '../components/blog/post'
import { Helmet } from 'react-helmet';
import Layout from '../components/MyLayout.js'
import PaginngIndicator from '../components/blog/pagingIndicator'

const client = require('contentful').createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
})

const perPage = 4

function HomePage(props) {
  async function fetchEntries() {
    const entries = await client.getEntries({
      limit: perPage,
      skip: ((parseInt(props.page) || 1) - 1) * perPage,

        order: '-fields.date',
        content_type: "post"})
    if (entries.items) return entries
    console.log(`Error getting Entries for ${contentType.name}.`)
  }

  const [posts, setPosts] = useState([])
  const [pagesArray, setPagesArray] = useState(0)

  useEffect(() => {
    async function getPosts() {
      const allPosts = await fetchEntries()
      const entries = allPosts.items
      setPosts([...entries])
      setPagesArray(allPosts.total)
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
      {posts.length > 0
        ? posts.map(p => (
            <Post
              alt={p.fields.alt}
              date={p.fields.date}
              key={p.fields.title}
              image={p.fields.image}
              title={p.fields.title}
              url={p.fields.url}
              id={p.sys.id}
              markdown={p.fields.markdown}
            />
          ))
        : null}
        </div>
        
        <PaginngIndicator currentPage={(parseInt(props.page) || 1) - 1} maxPage={Math.ceil(pagesArray / perPage)}></PaginngIndicator>

        </Layout>
  )
}

HomePage.getInitialProps = async function (context) {
  return context.query;
};

export default HomePage