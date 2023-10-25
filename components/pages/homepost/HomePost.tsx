import { getPosts } from "lib/sanity.fetch"
import { resolveHref } from "lib/sanity.links"
import { ProjectListItem } from "../home/ProjectListItem"
import Link from 'next/link'
import { HomePostPayload } from "types"
import { Header } from "components/shared/Header"
import { PostListItem } from "./PostslistItem"
import post from "schemas/documents/post"

export interface HomePostProps {
  data: HomePostPayload | null
}

export async function HomePost({ data }: HomePostProps) {
  const posts = convertDataToHomePostPayload(data).posts

  return (
      <div className="space-y-20">
        {/* Header */}
        {/* {"title" && <Header centered title={"title"} description={""} />} */}
        {/* Showcase posts */}
        {posts && posts.length > 0 && (
          <div className="mx-auto max-w-[100rem] rounded-md border">
            {
              posts.map((post, key) => {
                const href = resolveHref(post._type, post.slug?.current)
                if (!href) {
                  return null
                }
                  
                return (
                  <Link key={key} href={href}>
                    <PostListItem post={post} odd={key % 2} />
                  </Link>
                )
              })
            }
          </div>
        )}
      </div>
  )
}

function convertDataToHomePostPayload(data: any): HomePostPayload {
  return {
    posts: data
  }
}

export default HomePost