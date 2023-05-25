import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { convertToMDXCode } from '@/lib/mdx'

const DEFAULT_LAYOUT = 'AuthorLayout'

export async function getStaticProps() {
  const body = await getAuthorDetailAPI()
  const authorDetails = await convertAuthorDetail(body)
  return { props: { authorDetails } }
}

async function getAuthorDetailAPI() {
  const res = await fetch(`http://15.164.15.10:9000/member-service/api/v1/members/about/alswn4516`)
  const data = await res.json()
  return data.body
}

async function convertAuthorDetail(body) {
  const mdxSource = await convertToMDXCode(body.introduce)
  return {
    mdxSource: mdxSource,
    toc: [],
    frontMatter: {
      slug: ['default'],
      fileName: '',
      name: body.name,
      avatar: body.avatar,
      occupation: body.occupation,
      company: body.company,
      email: body.email,
      twitter: body.twitter,
      linkedin: body.linkedin,
      github: body.github,
      date: null,
    },
  }
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
