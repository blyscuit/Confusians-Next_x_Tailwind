'use client'

import Post from '../../../components/blog/post'
import Layout from '../../../components/MyLayout'
import { useDarkMode, modeBackdrop, modeBackground } from '../../../js/useDarkMode'
import Head from 'next/head';

export default function BlogDetailPost({ post }) {
  const [colorTheme, setTheme] = useDarkMode()
  
  return (
      <Layout backdrop={modeBackdrop(colorTheme)} footer={true}>
        <Head>
          <title>{post?.fields?.title ?? ''} | Confusians | Blog</title>
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={"Confusians | Blog"} />
          <meta property="og:site_name" content="Confusians" />
          <meta name="twitter:card" content="app" />
          <meta name="twitter:description" content={""} />
          <meta name="twitter:title" content={"Confusians | Blog"} />
        </Head>

      <div className="min-h-screen flex flex-col items-center pt-20">
        {post != null && post.fields != null
        ? 
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
        : null}
      </div>
    </Layout>
  )
}
