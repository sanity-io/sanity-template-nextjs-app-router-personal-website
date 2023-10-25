import type { PortableTextBlock } from '@portabletext/types'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import ImageBox from 'components/shared/ImageBox'
import type { Post } from 'types'

interface PostProps {
  post: Post
  odd: number
}

export function PostListItem(props: PostProps) {
  const { post, odd } = props
  return (
    <div
      className={`flex flex-col gap-x-5 p-2 transition hover:bg-gray-50/50 xl:flex-row ${
        odd && 'border-b border-t xl:flex-row-reverse'
      }`}
      style={{ maxWidth: '500px' }}
    >
      <div className="w-1/2 xl:w-9/12">
        <ImageBox
          image={post.mainImage}
          alt={`Cover image from ${post.title}`}
          classesWrapper="relative aspect-[16/9]"
        />
      </div>
      <div className="flex w-1/2 xl:w-1/4">
        <TextBox Post={post} />
      </div>
    </div>
  )
}

function TextBox({ Post }: { Post: Post }) {
  return (
    <div className="relative mt-2 flex w-full flex-col justify-between p-3 xl:mt-0">
      <div>
        {/* Title */}
        <div className="mb-2 text-xl font-extrabold tracking-tight md:text-2xl">
          {Post.title}
        </div>
        {/* Overview  */}
        {/* <div className="font-serif text-gray-500">
          <CustomPortableText value={Post.title as PortableTextBlock[]} />
        </div> */}
      </div>
      {/* Tags */}
      <div className="mt-4 flex flex-row gap-x-2">
        {/* {Post.tags?.map((tag, key) => (
          <div className="text-sm font-medium lowercase md:text-lg" key={key}>
            #{tag}
          </div>
        ))} */}
      </div>
    </div>
  )
}
