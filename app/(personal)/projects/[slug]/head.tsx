import { toPlainText } from '@portabletext/react'
import { SiteMeta } from 'components/global/SiteMeta'
import { getHomePageTitle, getProjectBySlug } from 'lib/sanity.client'
import { getPreviewToken } from 'lib/sanity.server.preview'

export default async function ProjectPageHead({
  params,
}: {
  params: { slug: string }
}) {
  const token = getPreviewToken()

  const [homePageTitle, project] = await Promise.all([
    getHomePageTitle({ token }),
    getProjectBySlug({ slug: params.slug, token }),
  ])

  return (
    <SiteMeta
      baseTitle={homePageTitle}
      description={project?.overview ? toPlainText(project.overview) : ''}
      image={project?.coverImage}
      title={project?.title}
    />
  )
}
