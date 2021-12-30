import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import catalog from '../db/catalog.json'
import { Helmet } from 'react-helmet';
import HomeCard from '../components/HomeCard'
import Head from 'next/head'

const Index = props => (
  <Layout footer={true}>
    <Helmet>
      <title>Confusians</title>
      <body class={catalog.home.backgroundColor}></body>
    </Helmet>
    
    <Head>
      <title>Confusians</title>
      <meta name="description" content="Creates independent Games and Apps." />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={"Confusians"} />
      <meta property="og:url" content={"https://confusians.com/"} />
      <meta property="og:site_name" content="Confusians" />
      <meta property="og:image" content={"https://confusians.com/logofull.png"} />
      <meta property="og:image:secure_url" content={"https://confusians.com/logofull.png"} />
      <meta property="og:image:width" content="1280" />
      <meta property="og:image:height" content="720" />
      <meta name="twitter:card" content="app" />
      <meta name="twitter:title" content={"Confusians"} />
      <meta name="twitter:image" content={"https://confusians.com/logofull.png"} />
    </Head>

    <div class="hidden">
      <h1 href="https://confusians.com">Confusians</h1>
    </div>

    <div class="flex flex-wrap py-10">
      {((props.catalog || {}).index || []).map(item => {
        var detail = props.catalog[item.id] || {}
        return (
          <div key={item.id} class={' sm: w-full md:' + item.size}>
            <Link href={{pathname: "/[id]", query: {}}} as={`/${item.id}`} >
              <a><HomeCard backgroundColor={detail.backgroundColor} name={detail.name} textColor={detail.textColor} image={item.image} font={detail.font}></HomeCard></a>
            </Link>
          </div>
        )
      })}
      </div>
  </Layout>
)

export async function getStaticProps(context) {
  return {props: {catalog : catalog}}
}

export default Index
