import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'

export const POSTS_PER_PAGE = 5

export async function getServerSideProps({ query }) {
  const currentPage = query.page == null ? 1 : query.page

  const response = await fetch(
    `http://15.164.15.10:9000/post-service/api/v1/posts?size=${POSTS_PER_PAGE}&page=${currentPage}`
  )
  const data = await response.json()
  const body = data.body.content

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

  return { props: { posts, pagination } }
}

export default function Blog({ posts, pagination }) {
  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayout posts={posts} pagination={pagination} />
    </>
  )
}
