'use client'
import Post from '../../../../components/blog/post'
import Layout from '../../../../components/MyLayout'
import PaginngIndicator from '../../../../components/blog/pagingIndicator'
import { perPage } from '../../../../functions/fetchPage'
import { useDarkMode, modeBackdrop, modeBackground } from '../../../../js/useDarkMode'
import { Helmet } from 'react-helmet'
import Head from 'next/head';


export default function BlogPagePost({ result, page }) {
  const [colorTheme, setTheme] = useDarkMode()

  return (
        <Layout backdrop={modeBackdrop(colorTheme)} footer={true}>
        <Helmet>
          <title>Confusians | Blog</title>
          <body className={modeBackground(colorTheme)}></body>
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
          {result.entries.length > 0 &&
            result.entries.map(p => (
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
          maxPage={Math.ceil((result.totalCount || 0) / perPage)}
        />
      </div>
    </Layout>
  )
}
