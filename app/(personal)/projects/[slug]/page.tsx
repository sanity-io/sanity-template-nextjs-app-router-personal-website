import { ProjectPage } from 'components/pages/project/ProjectPage'
import { ProjectPreview } from 'components/pages/project/ProjectPreview'
import { PreviewSuspense } from 'components/preview/PreviewSuspense'
import { PreviewWrapper } from 'components/preview/PreviewWrapper'
import { getProjectBySlug } from 'lib/sanity.client'
import { getPreviewToken } from 'lib/sanity.server.preview'
import { notFound } from 'next/navigation'

export default async function ProjectSlugRoute({
  params,
}: {
  params: { slug: string }
}) {
  const token = getPreviewToken()
  const data = await getProjectBySlug({ slug: params.slug })

  if (!data && !token) {
    notFound()
  }

  return (
    <>
      {token ? (
        <PreviewSuspense
          fallback={
            <PreviewWrapper>
              <ProjectPage data={data} />
            </PreviewWrapper>
          }
        >
          <ProjectPreview token={token} slug={params.slug} />
        </PreviewSuspense>
      ) : (
        <ProjectPage data={data} />
      )}
    </>
  )
}
