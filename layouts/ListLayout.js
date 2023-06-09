import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import Pagination from '@/components/Pagination'
import formatDate from '@/lib/utils/formatDate'
import React from 'react'
import TagNoLink from '@/components/TagNoLink'
import { useRouter } from 'next/router'

export default function ListLayout({ posts, pagination, keyword }) {
  const router = useRouter()
  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      const searchValue = event.target.value
      router.push(`/blog?keyword=${searchValue}`)
    }
  }
  function handleClick() {
    // 클릭 이벤트 핸들러에서 실행할 코드 작성
    const inputElement = document.getElementById('searchInput')
    if (inputElement) {
      const searchValue = inputElement.value
      handleKeyDown({ key: 'Enter', target: { value: searchValue } })
    }
  }

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {siteMetadata.postMainTitle}
          </h1>
          <div className="relative max-w-lg">
            <input
              id="searchInput"
              aria-label="Search articles"
              type="text"
              onKeyDown={handleKeyDown}
              placeholder="Search Keyword"
              className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
            />
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={handleClick}
              style={{ cursor: 'pointer' }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <ul className="pt-5">
          {posts.length === 0 && (
            <h1 className="pt-5 text-3xl font-normal leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-2xl md:leading-12">
              게시글이 존재하지 않습니다.
            </h1>
          )}
          {posts.map((frontMatter) => {
            const { id, date, title, summary, tags } = frontMatter
            return (
              <li key={id} className="py-5">
                <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>{formatDate(date)}</time>
                    </dd>
                  </dl>
                  <div className="space-y-3 xl:col-span-3">
                    <div>
                      <h3 className="pb-2 text-2xl font-bold leading-8 tracking-tight">
                        <Link href={`/blog/${id}`} className="text-gray-900 dark:text-gray-100">
                          {title}
                        </Link>
                      </h3>
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
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          keyword={keyword}
        />
      )}
    </>
  )
}
