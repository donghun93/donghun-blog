import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import formatDate from '@/lib/utils/formatDate'
import Comments from '@/components/comments'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import Image from '@/components/Image'
import TagNoLink from '@/components/TagNoLink'
import TagRoundNoLink from '@/components/TagRoundNoLink'

export default function PostLayout({ frontMatter, authorDetails, next, prev, children }) {
  const { date, title, tags } = frontMatter
  const author = authorDetails[0]

  return (
    <SectionContainer>
      <BlogSEO url={`${siteMetadata.siteUrl}/blog/${frontMatter.slug}`} {...frontMatter} />
      <ScrollTopAndComment />
      <article>
        <div>
          <header>
            <div className="space-y-1 border-b border-gray-200 pb-5 text-center dark:border-gray-700">
              <div>
                <PageTitle>{title}</PageTitle>

                {/*<div className="flex items-center justify-center pt-3">*/}
                <div className="flex items-center pt-3">
                  {author.avatar && (
                    <Image
                      src={author.avatar}
                      width="38px"
                      height="38px"
                      alt="avatar"
                      className="h-10 w-10 rounded-full"
                    />
                  )}
                  <dd className="pl-2 text-gray-900 dark:text-gray-100">{author.nickName}</dd>
                  <span className="pl-1 text-gray-500 dark:text-gray-400">·</span>
                  <dl>
                    <div>
                      <dt className="sr-only">Published on</dt>
                      <dd className="pl-1 text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="flex flex-wrap pt-3">
                  {tags.map((tag) => (
                    <TagRoundNoLink key={tag.id} text={tag.name} />
                  ))}
                </div>
              </div>
            </div>
          </header>
          <div
            className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:divide-y-0 "
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pt-10 pb-8 dark:prose-dark">{children}</div>
            </div>
            <Comments frontMatter={frontMatter} />
            <footer>
              <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                {prev && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/blog/${prev.slug}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      &larr; {prev.title}
                    </Link>
                  </div>
                )}
                {next && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/blog/${next.slug}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {next.title} &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
