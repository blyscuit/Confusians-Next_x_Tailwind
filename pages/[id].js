import Layout from '../components/MyLayout';
import fetch from 'isomorphic-unfetch';
import catalog from '../db/catalog.json'
import { Helmet } from 'react-helmet';
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import IconView from '../components/IconView'
import Head from 'next/head'
import ProductImage from "../components/ProductImage"

const Post = props => {

  const router = useRouter()

  const item = props

  let linkSection = (
    <div class="w-2/3 md:w-1/4 lg:w-1/4 pb-4 pt-2 px-2">
    <div class="flex flex-col sm:flex-col md:flex-col lg:flex-row justify-between pt-4 items-stretch">

      {item.adr != null && item.adr != "" ? (
        <div class={"flex-1 flex items-center flex-col"}>
          <div class="">
            <a href={item.adr}>
              <img alt="Android app on Google Play"
                src="https://play.google.com/intl/en_us/badges/images/apps/en-play-badge-border.png" style={{ width: '122px', height: '44px', marginTop: -1 }} />
            </a>
          </div>
        </div>
      ) : null}

      {item.ios != null && item.ios != "" ? (
        <div class="flex-1 flex items-center flex-col pt-4 sm:pt-4 md:pt-4 lg:pt-0">
          <div class="pt-px ">
            <a href={item.ios} style={{ display: 'inline-block', overflow: 'hidden', background: 'url("http://linkmaker.itunes.apple.com/images/badges/en-us/badge_appstore-lrg.svg")', backgroundRepeat: 'no-repeat', width: '135px', height: '40px' }}></a>
          </div>
        </div>
      ) : null}
    </div>
  </div>
  )

  return (
    <div class={item.backgroundColor}>
      <Layout backdrop={(item.textColor || "").includes("lighten") ? "dark" : "light"}>

        <Helmet>
          <title>{item.name || ""} | Confusians</title>
          <body class={item.backgroundColor}></body>
        </Helmet>
        <Head>
        <title>{item.name || ""} | Confusians</title>
        <meta name="description" content={item.name + " | " + item.about} />
          <meta
            name="robots"
            content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
          />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={item.name} />
          <meta property="og:description" content={item.about} />
          <meta property="og:url" content={"https://confusians.com/" + item.name} />
          <meta property="og:site_name" content="Confusians" />
          <meta property="og:image" content={"https://confusians.com/" + (item.image || [""])[0]} />
          <meta property="og:image:secure_url" content={"https://confusians.com/" + (item.image || [""])[0]} />
          <meta property="og:image:width" content="1280" />
          <meta property="og:image:height" content="720" />
          <meta name="twitter:card" content="app" />
          <meta name="twitter:description" content={item.about} />
          <meta name="twitter:title" content={item.name} />
          <meta name="twitter:image" content={"https://confusians.com/" + (item.image || [""])[0]} />
        </Head>

        <div class={"flex flex-col items-center  pb-10"}>

          <div class="flex flex-col px-6 py-16">
            <h1 class={"text-6xl pb-4 text-center " + item.textColor} style={{ "fontFamily": item.font }}>{item.name}</h1>
            <h5 class={"text-2xl text-center font-light " + item.textColor}>{item.about}</h5>
          </div>

          <ProductImage item={item}></ProductImage>

          {linkSection}

          <div className="grid-container"></div>
          <div class={"self-stretch grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-2 mx-6 " + item.textColor}>
            {(item.description ?? []).map(function (des) {
              return (
                <div class="flex flex-col items-center pt-16">
                  <IconView icon={des.icon} size={60} color={item.textColor} />
                  <div class={"pt-4 "}>{des.text}</div>
                </div>
              )
            })
            }
          </div>

          {(item.description ?? []).length > 0 ? linkSection : null}

        </div>

      </Layout>
    </div>
  );
}

export async function getStaticPaths() {

  const paths = catalog.index.map(index => {
    return {
      params: {
        id: index.id
      }
    }
  })
  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps(context) {
  var { id } = context.params
  id = id || ''
  var item = catalog[id.toLowerCase()]

  if (!item) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return { props: item };
}

export default Post;