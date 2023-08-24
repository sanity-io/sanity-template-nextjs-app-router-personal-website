import { toPlainText } from '@portabletext/react'
import { HomePage } from 'components/pages/home/HomePage'
import HomePagePreview from 'components/pages/home/HomePagePreview'
import { getHomePage, getSettings } from 'lib/sanity.fetch'
import { homePageQuery } from 'lib/sanity.queries'
import { defineMetadata } from 'lib/utils.metadata'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import { LiveQuery } from 'next-sanity/preview/live-query'

export const runtime = 'edge'

export async function generateMetadata(): Promise<Metadata> {
  const [settings, page] = await Promise.all([getSettings(), getHomePage()])

  return defineMetadata({
    description: page?.overview ? toPlainText(page.overview) : '',
    image: settings?.ogImage,
    title: page?.title,
  })
}

export default async function IndexRoute() {
  const data = await getHomePage()

  if (!data && !draftMode().isEnabled) {
    return (
      <div className="text-center">
        You don&rsquo;t have a homepage document yet,{' '}
        <Link
          href="/studio/desk/home%7C%2Cview%3Dpreview"
          className="underline"
        >
          create one now
        </Link>
        !
      </div>
    )
  }

  return (
    <LiveQuery
      enabled={draftMode().isEnabled}
      query={homePageQuery}
      initialData={data}
      as={HomePagePreview}
    >
      <HomePage data={data} />
    </LiveQuery>
  )
}
