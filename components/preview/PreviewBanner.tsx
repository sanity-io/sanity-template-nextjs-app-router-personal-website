/* eslint-disable @next/next/no-html-link-for-pages */

export function PreviewBanner() {
  return (
    <div className="bg-black p-3 text-center text-white">
      {'Previewing draft content. '}
      <a
        className="underline transition hover:opacity-50"
        href="/api/exit-preview"
      >
        Exit preview mode
      </a>
    </div>
  )
}
