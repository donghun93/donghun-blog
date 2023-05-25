import { convertToMDXCode } from '@/lib/mdx'

export async function get() {
  const res = await fetch(`http://15.164.15.10:9000/member-service/api/v1/members/about/alswn4516`)
  const data = await res.json()
  if (data.result.status === 'fail') {
    const mdxSource = await convertToMDXCode('# 회원이 존재하지 않습니다.')
    const authorDetails = {
      mdxSource: mdxSource,
      toc: [],
      frontMatter: {
        slug: ['default'],
        fileName: null,
        name: null,
        avatar: '/static/images/canada/lake.jpg',
        occupation: null,
        company: null,
        email: null,
        twitter: 'https://twitter.com/',
        linkedin: 'https://kr.linkedin.com/',
        github: 'https://github.com/',
        date: null,
      },
    }
    return authorDetails
  } else {
    const body = data.body
    return await convertAuthorDetail(body)
  }
}

async function convertAuthorDetail(body) {
  const mdxSource = await convertToMDXCode(body.introduce)
  if (body.avatar === null || body.avatar === undefined) {
    body.avatar = '/static/images/canada/lake.jpg'
  }
  return {
    mdxSource: mdxSource,
    toc: [],
    frontMatter: {
      slug: ['default'],
      fileName: null,
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
