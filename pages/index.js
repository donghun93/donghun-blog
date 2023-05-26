import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import formatDate from '@/lib/utils/formatDate'
import TagNoLink from '@/components/TagNoLink'

const MAX_DISPLAY = 5

export async function getServerSideProps() {
  const time1 = performance.now()
  const response = await getPostsAPI()
  const posts = []

  console.log(response.length)
  for (let i = 0; i < response.length; i++) {
    const obj = { ...response[i] } // 새로운 객체 생성

    obj.date = obj.createdAt
    delete obj.createdAt

    posts.push(obj) // 새로운 객체를 newData 배열에 추가
  }
  const time2 = performance.now()
  console.log('%s %s', 'Home', (time2 - time1).toFixed(5))
  return { props: { posts } }
}

async function getPostsAPI() {
  const res = await fetch(`http://15.164.15.10:9000/post-service/api/v1/posts?size=${MAX_DISPLAY}`)
  const data = await res.json()
  return data.body.content
}

export default function Home({ posts }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {siteMetadata.mainTitle}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {posts.length === 0 && (
            <h1 className="pt-5 text-3xl font-normal leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-2xl md:leading-12">
              게시글이 존재하지 않습니다.
            </h1>
          )}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { id, date, title, summary, tags } = frontMatter
            return (
              <li key={id} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link href={`/blog/${id}`} className="text-gray-900 dark:text-gray-100">
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <TagNoLink key={tag.id} text={tag.name} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${id}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {/*{siteMetadata.newsletter.provider !== '' && (*/}
      {/*  <div className="flex items-center justify-center pt-4">*/}
      {/*    <NewsletterForm />*/}
      {/*  </div>*/}
      {/*)}*/}
    </>
  )
}
