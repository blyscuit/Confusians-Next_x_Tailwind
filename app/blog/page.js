import BlogPage from './[blog]/page'
import fetchPage, { perPage } from '../../functions/fetchPage'

export default async function BlogList({ searchParams }) {
  // You may want to handle pagination via searchParams.page
  const context = { query: searchParams || {} }
  const { entries } = await fetchPage(context, perPage)
  return <BlogPage entries={entries} />
}
