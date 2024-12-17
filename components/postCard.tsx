'use client';

import { Post } from "@/types/post";
import Link from "next/link";

interface PostCardProps {
  post: Post;
  widthClass: string;
  mainClassName: string;
  textSize: string;
}

function PostCard({
  post,
  widthClass,
  mainClassName,
  textSize,
}: PostCardProps) {
  return (
    <Link href={`post/${post.slug}`} className={`no-underline ${widthClass} ${mainClassName}`}>
      <h2 className={`font-semibold ${textSize} mb-1`}>
        {post.data.title}
      </h2>
      <div className="flex justify-start gap-2 font-[family-name:var(--font-kosugi-maru)] text-gray-400 text-sm font-[400] italic">
        <div>
          <span className="pr-1">投稿日</span>{post.data.publish.toISOString().split('T')[0]}
          <span className="pl-2 pr-1">» 最終更新日</span>{post.data.lastUpdate.toISOString().split('T')[0]}
        </div>
      </div>
    </Link>
  )
}

export default PostCard;