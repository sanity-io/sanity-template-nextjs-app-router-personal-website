'use client'

import dynamic from 'next/dynamic'

import type { HomePageProps } from './HomePage'

// Re-exported components using next/dynamic ensures they're not bundled
// and sent to the browser unless actually used, with draftMode().enabled.

const HomePage = dynamic(() => import('./HomePage'))

export default function HomePagePreview({ data }: HomePageProps) {
  if (!data) {
    return (
      <div className="text-center">
        Please start editing your Home document to see the preview!
      </div>
    )
  }

  return <HomePage data={data} />
}
