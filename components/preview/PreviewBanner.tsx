'use client'

import { useSyncExternalStore } from 'react'

/* eslint-disable @next/next/no-html-link-for-pages */
const subscribe = () => () => {}

export function PreviewBanner() {
  const shouldShow = useSyncExternalStore(
    subscribe,
    () => window.top === window,
    () => false,
  )

  if (!shouldShow) return null

  return (
    <div className="bg-black p-3 text-center text-white">
      {'Previewing drafts. '}
      <a
        className="underline transition hover:opacity-50"
        href="/api/disable-draft"
      >
        Back to published
      </a>
    </div>
  )
}
