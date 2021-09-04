
import Head from 'next/head'
import Post from '../../../components/blog/post'
import { Helmet } from 'react-helmet';
import Layout from '../../../components/MyLayout.js'
import PaginngIndicator from '../../../components/blog/pagingIndicator'
import fetchPage, { perPage } from '../fetchPage';
  
function BlogPage(props) {
  
  return (
        <Layout footer={true}>
        <Helmet>
          <title>Confusians | Blog</title>
          <body class={"white"}></body>
        </Helmet>

        <Head>
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={"Confusians | Blog"} />
          <meta property="og:site_name" content="Confusians" />
          <meta name="twitter:card" content="app" />
          <meta name="twitter:description" content={""} />
          <meta name="twitter:title" content={"Confusians | Blog"} />
        </Head>

        <div class="min-h-screen pt-20" style={{"paddingBottom": "-60rem"}}>
      {(props.entries || []).length > 0
        ? props.entries.map(p => (
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
        
        <PaginngIndicator currentPage={(props.page || 1) - 1} maxPage={Math.ceil((props.totalCount || 0) / perPage)}></PaginngIndicator>

        </Layout>
  )
}


export async function getServerSideProps(context) {

    return await fetchPage(context, perPage)
  };

export default BlogPage