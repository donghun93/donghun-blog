import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { get } from './api/getAuthorDetailAPI'

const DEFAULT_LAYOUT = 'AuthorLayout'

export async function getServerSideProps() {
  const time1 = performance.now()
  const authorDetails = await get()
  const time2 = performance.now()
  // console.log('%s %s', 'About', (time2 - time1).toFixed(5))
  return { props: { authorDetails } }
}

export default function About({ authorDetails }) {
  const { mdxSource, frontMatter } = authorDetails

  return (
    <MDXLayoutRenderer
      layout={frontMatter.layout || DEFAULT_LAYOUT}
      mdxSource={mdxSource}
      frontMatter={frontMatter}
    />
  )
}
