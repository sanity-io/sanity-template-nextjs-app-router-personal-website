import { toPlainText } from '@portabletext/react'
import { ProjectPage } from 'components/pages/project/ProjectPage'
import { ProjectPreview } from 'components/pages/project/ProjectPreview'
import { PreviewSuspense } from 'components/preview/PreviewSuspense'
import { PreviewWrapper } from 'components/preview/PreviewWrapper'
import { readToken } from 'lib/sanity.api'
import { getClient } from 'lib/sanity.client'
import { homePageTitleQuery, projectBySlugQuery } from 'lib/sanity.queries'
import { defineMetadata } from 'lib/utils.metadata'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { ProjectPayload } from 'types'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params
  const preview = draftMode().isEnabled ? { token: readToken! } : undefined
  const client = getClient(preview)

  const [homePageTitle, project] = await Promise.all([
    client.fetch<string | null>(homePageTitleQuery),
    client.fetch<ProjectPayload | null>(projectBySlugQuery, {
      slug,
    }),
  ])

  return defineMetadata({
    baseTitle: homePageTitle ?? undefined,
    description: project?.overview ? toPlainText(project.overview) : '',
    image: project?.coverImage,
    title: project?.title,
  })
}

export default async function ProjectSlugRoute({ params }: Props) {
  const { slug } = params
  const preview = draftMode().isEnabled ? { token: readToken! } : undefined
  const client = getClient(preview)
  const data = await client.fetch<ProjectPayload | null>(projectBySlugQuery, {
    slug,
  })

  if (!data && !preview) {
    notFound()
  }

  return (
    <>
      {preview ? (
        <PreviewSuspense
          fallback={
            <PreviewWrapper>
              <ProjectPage data={data} />
            </PreviewWrapper>
          }
        >
          <ProjectPreview token={preview.token} slug={slug} />
        </PreviewSuspense>
      ) : (
        <ProjectPage data={data} />
      )}
    </>
  )
}
