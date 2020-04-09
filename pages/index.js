import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import catalog from '../db/catalog.json'
import { Helmet } from 'react-helmet';
import HomeCard from '../components/HomeCard'

const Index = props => (
  <Layout footer={true}>
    <Helmet>
          <title>Confusians</title>
          <body class={catalog.home.backgroundColor}></body>
        </Helmet>

    <div class="flex flex-wrap py-10">
      {((catalog || {}).index || []).map(item => {
        var detail = catalog[item.name] || {}
        return (
          <div key={item.name} class={' sm: w-full md:' + item.size}>
            <Link href={{pathname: "/[id]", query: {}}} as={`/${item.name}`} >
              <a><HomeCard backgroundColor={detail.backgroundColor} name={detail.name} textColor={detail.textColor} image={item.image} font={detail.font}></HomeCard></a>
            </Link>
          </div>
        )
      })}
      </div>
  </Layout>
)

Index.getInitialProps = async function() {
  return {}
}

export default Index
