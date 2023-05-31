import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'

export const POSTS_PER_PAGE = 5

export async function getServerSideProps({ query }) {
  const time1 = performance.now()
  const currentPage = query.page == null ? 1 : query.page

  const url =
    query.keyword === null || query.keyword === undefined || query.keyword === 'null'
      ? `http://15.164.15.10:9000/post-service/api/v1/posts?size=${POSTS_PER_PAGE}&page=${currentPage}`
      : `http://15.164.15.10:9000/post-service/api/v1/posts?size=${POSTS_PER_PAGE}&page=${currentPage}&keyword=${query.keyword}`

  const response = await fetch(url)
  const data = await response.json()
  const body = data.body.content
  const keyword = query.keyword === null || query.keyword === undefined ? null : query.keyword
  const posts = []

  for (let i = 0; i < body.length; i++) {
    const obj = { ...body[i] } // 새로운 객체 생성

    obj.date = obj.createdAt
    delete obj.createdAt

    posts.push(obj)
  }

  const pagination = {
    currentPage: parseInt(currentPage),
    totalPages: data.body.totalPages,
  }

  const time2 = performance.now()
  // console.log('%s %s', 'Blog List', (time2 - time1).toFixed(5))
  return { props: { posts, pagination, keyword } }
}

export default function Blog({ posts, pagination, keyword }) {
  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayout posts={posts} pagination={pagination} keyword={keyword} />
    </>
  )
}
