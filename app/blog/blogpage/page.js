'use client'
import Post from '../../../components/blog/post'
import Layout from '../../../components/MyLayout'
import PaginngIndicator from '../../../components/blog/pagingIndicator'
import fetchPage, { perPage } from '../../../functions/fetchPage'
import { useDarkMode, modeBackdrop, modeBackground } from '../../../js/useDarkMode'
import { Helmet } from 'react-helmet'
import Head from 'next/head';

import { useEffect, useState } from 'react'

export default function BlogPage({ searchParams }) {
  const [colorTheme, setTheme] = useDarkMode()
  const [data, setData] = useState({ entries: [], page: 1, totalCount: 0 })

  const page = parseInt(searchParams?.page || 1)

  useEffect(() => {
    async function loadData() {
      console.log(`Loading blog page ${page} with perPage ${perPage}`)
      const result = await fetchPage({ query: { page } }, perPage)
      setData(result)
    }
    loadData()
  }, [page])

  return (
        <Layout backdrop={modeBackdrop(colorTheme)} footer={true}>
        <Helmet>
          <title>Confusians | Blog</title>
          <body class={modeBackground(colorTheme)}></body>
        </Helmet>

        <Head>
          <title>Confusians | Blog</title>
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={"Confusians | Blog"} />
          <meta property="og:site_name" content="Confusians" />
          <meta name="twitter:card" content="app" />
          <meta name="twitter:description" content={""} />
          <meta name="twitter:title" content={"Confusians | Blog"} />
        </Head>

      <div className={modeBackground(colorTheme)}>
        <div className="min-h-screen pt-20" style={{ paddingBottom: '-60rem' }}>
          {data.entries.length > 0 &&
            data.entries.map(p => (
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
            ))}
        </div>

        <PaginngIndicator
          currentPage={page - 1}
          maxPage={Math.ceil((data.totalCount || 0) / perPage)}
        />
      </div>
    </Layout>
  )
}
