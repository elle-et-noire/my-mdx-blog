'use client';

import { Post } from "@/types/post";
import Link from "next/link";

function PostCard({
  post,
}: { post: Post }) {
  return (
    <Link
      href={`${post.slug}`}
      className="
        no-underline w-full bg-[#fefefe] text-[#324e73] rounded-md border-[#dadfe4] border-[1pt]
        shadow-[0_1px_0px_2px_rgba(128,167,180,1)] overflow-hidden"
    >
      <h2 className="
        ml-6 mt-4
        font-semibold font-[family-name:var(--font-noto-sans)]
        text-lg md:text-xl"
      >
        {post.data.title}
      </h2>
      <div className="
        m-0 pl-6 pt-1 pb-2
        flex justify-start
        font-[family-name:var(--font-kosugi-maru)] font-[400]
        text-gray-400 text-sm italic"
      >
        <span className="pr-1">投稿日</span>{post.data.publish.toISOString().split('T')[0]}
        <span className="pl-2 pr-1">» 最終更新日</span>{post.data.lastUpdate.toISOString().split('T')[0]}
      </div>
    </Link>
  )
}

export default PostCard;