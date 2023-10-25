'use client'

import dynamic from 'next/dynamic'

import type { HomePostProps } from './HomePost'

// Re-exported components using next/dynamic ensures they're not bundled
// and sent to the browser unless actually used, with draftMode().enabled.

const HomePost = dynamic(() => import('./HomePost'))

export default function HomePostPreview({ data }: HomePostProps) {
  if (!data) {
    return (
      <div className="text-center">
        Please start editing your Home document to see the preview!
      </div>
    )
  }

  return <HomePost data={data} />
}
