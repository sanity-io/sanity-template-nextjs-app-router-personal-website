import 'styles/index.css'

import type { PortableTextBlock } from '@portabletext/types'
import { Footer } from 'components/global/Footer'
import { Navbar } from 'components/global/Navbar'
import { PreviewBanner } from 'components/preview/PreviewBanner'
import IntroTemplate from 'intro-template'
import { getSettings } from 'lib/sanity.client'
import { getPreviewToken } from 'lib/sanity.server.preview'

export default async function IndexRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const token = getPreviewToken()
  const settings = (await getSettings({ token })) || {
    menuItems: [],
    footer: [],
  }

  return (
    <div className="flex min-h-screen flex-col bg-white text-black">
      {token && <PreviewBanner />}
      <Navbar menuItems={settings.menuItems} />
      <div className="mt-20 flex-grow px-4 md:px-16 lg:px-32">{children}</div>
      <Footer footer={settings.footer as PortableTextBlock[]} />
      <IntroTemplate />
    </div>
  )
}
