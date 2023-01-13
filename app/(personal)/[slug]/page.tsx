import { Page } from 'components/pages/page/Page'
import { PagePreview } from 'components/pages/page/PagePreview'
import { PreviewSuspense } from 'components/preview/PreviewSuspense'
import { PreviewWrapper } from 'components/preview/PreviewWrapper'
import { getPageBySlug } from 'lib/sanity.client'
import { getPreviewToken } from 'lib/sanity.server.preview'
import { notFound } from 'next/navigation'

export default async function PageSlugRoute({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const token = getPreviewToken()
  const data = await getPageBySlug({ slug })

  if (!data && !token) {
    notFound()
  }

  return (
    <>
      {token ? (
        <PreviewSuspense
          fallback={
            <PreviewWrapper>
              <Page data={data} />
            </PreviewWrapper>
          }
        >
          <PagePreview token={token} slug={params.slug} />
        </PreviewSuspense>
      ) : (
        <Page data={data} />
      )}
    </>
  )
}
