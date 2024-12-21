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
        no-underline w-full bg-[#fefefe] text-[#324e73] rounded-md border-[#dadfe4] border-[0.5pt]
        shadow-[0_1px_1px_1px_rgba(0,0,0,0.2)] overflow-hidden"
    >
      <h2 className="
        ml-6 mt-4
        font-semibold font-noto-sans
        text-lg md:text-xl"
      >
        {data.title}
      </h2>
      <DateInfo data={data} className="m-0 pl-6 pt-1 pb-2 text-sm" />
    </Link>
  )
}
