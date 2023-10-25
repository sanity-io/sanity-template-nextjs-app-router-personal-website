import Post from "components/pages/post/Post"
import PostPreview from "components/pages/post/PostPreview"
import { getPostBySlug } from "lib/sanity.fetch"
import { postBySlugQuery } from "lib/sanity.queries"
import { LiveQuery } from "next-sanity/preview/live-query"
import { draftMode } from "next/headers"
import { notFound } from "next/navigation"

type Props = {
    params: { slug: string }
  }
  
export default async function PostSlugRoute({ params }: Props) {
    const data = await getPostBySlug(params.slug)
    if (!data && !draftMode().isEnabled) {
      notFound()
    }
  
    return (
      <LiveQuery
        enabled={draftMode().isEnabled}
        query={postBySlugQuery}
        params={params}
        initialData={data}
        as={PostPreview}
      >
        <Post data={data} />
      </LiveQuery>
    )
  }
  