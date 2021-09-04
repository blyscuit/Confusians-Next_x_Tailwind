import BlogPage from './blog/page/[blogPage]'
import fetchPage, { perPage } from '../functions/fetchPage'

const BlogDetail = props => {
  return(
    <BlogPage entries={props.entries}></BlogPage>
  )
}


export async function getServerSideProps(context) {

  return await fetchPage(context, perPage)
};

export default BlogPage