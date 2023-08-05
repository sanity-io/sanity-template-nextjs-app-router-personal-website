'use client'

import { pagesBySlugQuery } from 'lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'
import type { PagePayload } from 'types'

import { Page, type PageProps } from './Page'

export default function PagePreview({ data: initialData }: PageProps) {
  const [data] = useLiveQuery<PagePayload | null>(
    initialData,
    pagesBySlugQuery,
    {
      slug: initialData?.slug,
    },
  )

  return <Page data={data ?? initialData} />
}
