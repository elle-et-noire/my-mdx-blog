import { Post } from "@/types/post";
import PostCard from "./postCard";

interface PostListProps {
  posts: Post[]
}

function PostList({ posts }: PostListProps) {
  return (
    posts.map((post) => (
      <PostCard
        key={post.slug}
        post={post}
        widthClass={`w-80 md:w-148 lg:w-112 xl:w-132`}
        mainClassName="flex flex-col"
        textSize="text-base md:text-xl"
      />
    ))
  )
}

export default PostList;