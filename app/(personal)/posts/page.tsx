import HomePost from "components/pages/homepost/HomePost";
import HomePostPreview from "components/pages/homepost/HomePostPreview";
import { getPosts } from "lib/sanity.fetch";
import { homePostsQuery } from "lib/sanity.queries";
import { defineMetadata } from "lib/utils.metadata";
import { Metadata } from "next";
import LiveQuery from "next-sanity/preview/live-query";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

type Props = {
    params: { slug: string }
}
  
export default async function PostsRoute({ params }: Props) {
    const data = await getPosts()
    if (!data && !draftMode().isEnabled) {
        notFound()
      }
    
    return (
        <LiveQuery
          enabled={draftMode().isEnabled}
          // enabled={false}
          query={homePostsQuery}
          initialData={data}
          as={HomePostPreview}
        >
          <HomePost data={data} />
        </LiveQuery>
      )
}
  