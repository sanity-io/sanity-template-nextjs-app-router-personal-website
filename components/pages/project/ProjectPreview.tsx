'use client'

import { projectBySlugQuery } from 'lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'
import type { ProjectPayload } from 'types'

import { ProjectPage, ProjectPageProps } from './ProjectPage'

export default function ProjectPreview({
  data: initialData,
}: ProjectPageProps) {
  const [data] = useLiveQuery<ProjectPayload | null>(
    initialData,
    projectBySlugQuery,
    {
      slug: initialData?.slug,
    },
  )

  return <ProjectPage data={data} />
}
