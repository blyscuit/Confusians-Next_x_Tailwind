import BlogPage from './blog/page/[blockPage]'
import fetchPage, { perPage } from './blog/fetchPage'

const BlogDetail = props => {
  return(
    <BlogPage entries={props.entries}></BlogPage>
  )
}


export async function getServerSideProps(context) {

  return await fetchPage(context, perPage)
};

export default BlogPage