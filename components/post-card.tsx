"use client";

import Link from "next/link";
import DateInfo from "./date-info";

export default function PostCard({ slug, data }: {
  slug: string;
  data: { [key: string]: string };
}) {
  return (
    <Link
      href={slug}
      className="
        no-underline w-full bg-[#fefefe] text-[#324e73] rounded-md border-[#dadfe4] border-[1pt]
        shadow-[0_1px_0px_2px_rgba(128,167,180,1)] overflow-hidden"
    >
      <h2 className="
        ml-6 mt-4
        font-semibold font-[family-name:var(--font-noto-sans)]
        text-lg md:text-xl"
      >
        {data.title}
      </h2>
      <DateInfo data={data} className="m-0 pl-6 pt-1 pb-2 text-sm" />
    </Link>
  )
}
