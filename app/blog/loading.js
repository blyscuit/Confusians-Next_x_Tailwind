'use client'
import Layout from '../../components/MyLayout'
import { useDarkMode, modeBackdrop, modeBackground } from '../../js/useDarkMode'
import { Helmet } from 'react-helmet'
import Head from 'next/head';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function BlogPageLoading({}) {
  const [colorTheme, setTheme] = useDarkMode()

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

      <div class={"p-10"}>
        <div class="dark container mx-auto md:max-w-xl px-4 md:px-0">
                <div>
                    <h1 class="font-medium text-3xl"><Skeleton /></h1>
                    <p class="text-sm pt-2"><Skeleton /></p>
                    <br></br>
                    <p><Skeleton count={10} /></p>
                </div>
            </div>
        </div>
    </Layout>
  )
}
