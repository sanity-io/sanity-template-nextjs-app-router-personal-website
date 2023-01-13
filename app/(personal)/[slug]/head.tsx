import { toPlainText } from '@portabletext/react'
import { SiteMeta } from 'components/global/SiteMeta'
import { getHomePageTitle, getPageBySlug, getSettings } from 'lib/sanity.client'
import { getPreviewToken } from 'lib/sanity.server.preview'

export default async function PageHead() {
  const token = getPreviewToken()

  const [homePageTitle, page, settings] = await Promise.all([
    getHomePageTitle({ token }),
    getPageBySlug({ slug: 'about', token }),
    getSettings({ token }),
  ])

  return (
    <SiteMeta
      baseTitle={homePageTitle}
      description={page?.overview ? toPlainText(page.overview) : ''}
      image={settings?.ogImage}
      title={page?.title}
    />
  )
}
