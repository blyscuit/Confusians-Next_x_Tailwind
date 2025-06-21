import fetchPage, { perPage } from '../../../../functions/fetchPage'
import BlogPagePosts from './post'

export const metadata = {
  title: 'Confusians | Blog',
  description: 'Confusians Blog',
}

export default async function BlogPage({ params }) {

  const page = parseInt(params?.page || 1)

  const result = await fetchPage({ query: { page } }, perPage)

  return (
        <BlogPagePosts result={result} page={page}></BlogPagePosts>
  )
}
