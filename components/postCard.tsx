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
    <div className={`${widthClass} my-5 ${mainClassName}`}>
      <Link href={`post/${post.slug}`} className="no-underline">
        <h2 className={`font-semibold ${textSize} my-0`}>
          {post.data.title}
        </h2>
      </Link>
    </div>
  )
}

export default PostCard;