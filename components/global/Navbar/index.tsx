import { getSettings } from 'lib/sanity.fetch'
import { settingsQuery } from 'lib/sanity.queries'
import { draftMode } from 'next/headers'
import { LiveQuery } from 'next-sanity/preview/live-query'

import NavbarLayout from './NavbarLayout'
import NavbarPreview from './NavbarPreview'

export async function Navbar() {
  const data = await getSettings()

  return (
    <LiveQuery
      enabled={draftMode().isEnabled}
      query={settingsQuery}
      initialData={data}
      as={NavbarPreview}
    >
      <NavbarLayout data={data} />
    </LiveQuery>
  )
}
