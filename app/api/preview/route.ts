import { previewSecretId, readToken } from 'lib/sanity.api'
import { getClient } from 'lib/sanity.client'
import { resolveHref } from 'lib/sanity.links'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { getSecret } from 'plugins/productionUrl/utils'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
  const documentType = searchParams.get('documentType')

  if (!secret) {
    return new Response('Invalid secret', { status: 401 })
  }

  const token = readToken
  if (!token) {
    throw new Error(
      'A secret is provided but there is no `SANITY_API_READ_TOKEN` environment variable setup.'
    )
  }
  const client = getClient().withConfig({ useCdn: false, token })
  const generatedSecret = await getSecret(client, previewSecretId)
  if (generatedSecret !== secret) {
    return new Response('Invalid secret', { status: 401 })
  }

  const href = resolveHref(documentType!, slug!)

  if (!href) {
    return new Response(
      'Unable to resolve preview URL based on the current document type and slug',
      { status: 400 }
    )
  }

  draftMode().enable()

  redirect(href)
}
