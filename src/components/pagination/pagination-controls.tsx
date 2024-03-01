'use client'

import { FC } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface PaginationControlsProps {
  hasNextPage: boolean
  hasPrevPage: boolean
}

const PaginationControls: FC<PaginationControlsProps> = (
  {
    hasNextPage,
    hasPrevPage,
  }
) => {
  const router = useRouter()
  const pathname = usePathname();
  console.log(pathname)
  const searchParams = useSearchParams()

  const page = searchParams.get('page') ?? '1'
  const per_page = searchParams.get('per_page') ?? '6'

  return (
    <div className='flex justify-center gap-2 mt-20 mb-10 items-center'>

      <button
        className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`${pathname}?page=${Number(page) - 1}&per_page=${per_page}`)
        }}>
        <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
        </svg>
            Previous
      </button>

      <h4 className='text-center text-white'>
        {`Page ${page} of `}{Math.ceil(10 / Number(per_page))}
      </h4>

      <button
        className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`${pathname}/?page=${Number(page) + 1}&per_page=${per_page}`)
        }}>
         Next
        <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
      </button>

    </div>
  )
}

export default PaginationControls