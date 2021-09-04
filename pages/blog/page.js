const BlogPage = props => {
}

export async function getServerSideProps(context) {

  return {
    redirect: {
      destination: '/blog',
      permanent: true,
    },
  }
}

export default BlogPage