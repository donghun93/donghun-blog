import PageTitle from '@/components/PageTitle'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { convertToMDXCode } from '@/lib/mdx'
import { get } from '../api/getAuthorDetailAPI'

const DEFAULT_LAYOUT = 'PostLayout'

export async function getServerSideProps({ query }) {
  const time1 = performance.now()
  const res = await fetch(`http://15.164.15.10:9000/post-service/api/v1/posts/${query.id}`)
  const data = await res.json()
  const body = data.body
  const mdxSource = await convertToMDXCode(body.contents)
  const post = {
    mdxSource: mdxSource,
    toc: [],
    frontMatter: {
      slug: null,
      fileName: null,
      title: body.title,
      date: body.createdAt,
      tags: body.tags,
      draft: false,
      summary: body.summary,
    },
  }

  const authorDetail = await get()
  const authorDetails = []
  authorDetails.push(authorDetail.frontMatter)

  const prev = null
  const next = null
  const time2 = performance.now()
  console.log('%s %s', 'Blog Detail', (time2 - time1).toFixed(5))
  return { props: { post, authorDetails, prev, next } }
}

export default function Blog({ post, authorDetails, prev, next }) {
  const { mdxSource, toc, frontMatter } = post

  return (
    <>
      {frontMatter.draft !== true ? (
        <MDXLayoutRenderer
          layout={frontMatter.layout || DEFAULT_LAYOUT}
          toc={toc}
          mdxSource={mdxSource}
          frontMatter={frontMatter}
          authorDetails={authorDetails}
          prev={prev}
          next={next}
        />
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  )
}
