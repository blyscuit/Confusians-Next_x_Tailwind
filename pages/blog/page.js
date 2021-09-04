const BlogPage = props => {
}

export async function getStaticProps(context) {

  return {
    redirect: {
      destination: '/blog',
      permanent: true,
    },
  }
}

export default BlogPage