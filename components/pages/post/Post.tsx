import { CustomPortableText } from "components/shared/CustomPortableText"
import { Header } from "components/shared/Header"
import { PostPayload } from "types"

export interface PostProps {
    data: PostPayload | null
}

export function Post({data}: PostProps ) {
    const { body, author, title } = data ?? {}
    return (
        <div className="flex flex-col items-center">
          <div className="mb-8" >
            {/* Header */}
            <Header title={title}  centered={true} />
    
            {/* Body */}
            {body && (
              <CustomPortableText
                paragraphClasses="font-serif max-w-3xl text-gray-600 text-xl"
                value={body}
              />
            )}
          </div>
          <div className="absolute left-0 w-screen border-t" />
        </div>
      )
}

export default Post