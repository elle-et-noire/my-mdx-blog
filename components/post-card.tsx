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
        px-4 md:px-6 pt-4 pb-2
        no-underline w-full bg-[#fefefe] text-[#324e73] rounded-md border-[#dadfe4] border-[0.5pt]
        shadow-[0_1px_1px_1px_rgba(0,0,0,0.2)] overflow-hidden"
    >
      <h2 className="
        mb-1
        font-semibold font-noto-sans
        text-base md:text-xl"
      >
        {data.title}
      </h2>
      <DateInfo data={data} className="text-xs md:text-sm" />
    </Link>
  )
}
