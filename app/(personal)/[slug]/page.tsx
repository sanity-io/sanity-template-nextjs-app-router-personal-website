import { toPlainText } from '@portabletext/react'
import { Page } from 'components/pages/page/Page'
import PagePreview from 'components/pages/page/PagePreview'
import { readToken } from 'lib/sanity.api'
import { getClient } from 'lib/sanity.client'
import {
  homePageTitleQuery,
  pagePaths,
  pagesBySlugQuery,
  settingsQuery,
} from 'lib/sanity.queries'
import { defineMetadata } from 'lib/utils.metadata'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { PagePayload, SettingsPayload } from 'types'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params
  const preview = draftMode().isEnabled ? { token: readToken! } : undefined
  const client = getClient(preview)

  const [settings, page, homePageTitle] = await Promise.all([
    client.fetch<SettingsPayload | null>(settingsQuery),
    client.fetch<PagePayload | null>(pagesBySlugQuery, { slug }),
    client.fetch<string | null>(homePageTitleQuery),
  ])

  return defineMetadata({
    baseTitle: homePageTitle ?? undefined,
    description: page?.overview ? toPlainText(page.overview) : '',
    image: settings?.ogImage,
    title: page?.title,
  })
}

export async function generateStaticParams() {
  const client = getClient()
  const slugs = await client.fetch<string[]>(pagePaths)
  return slugs.map((slug) => ({ slug }))
}

export default async function PageSlugRoute({ params }: Props) {
  const { slug } = params
  const preview = draftMode().isEnabled ? { token: readToken! } : undefined
  const client = getClient(preview)
  const data = await client.fetch<PagePayload | null>(pagesBySlugQuery, {
    slug,
  })

  if (!data && !preview) {
    notFound()
  }

  return preview ? <PagePreview data={data} /> : <Page data={data} />
}
