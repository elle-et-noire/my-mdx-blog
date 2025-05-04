import { GetAllSlugs, GetPostBySlug } from "@/lib/post";
import Toc from "@/components/toc";
import Link from "next/link";
import PostContent from "@/components/post-content";
import DateInfo from "@/components/date-info";
import { markdownToHtml } from "@/lib/convert";
import PostContentMath from "@/components/post-content-math";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = GetAllSlugs();
  return slugs.map((slug) => {
    return {
      slug: slug
    }
  });
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const { content, data } = GetPostBySlug(slug);
  const [mdxSource, mathblocks] = await markdownToHtml(content || "");


  return (
    <>
      <div // glass morphism background
        className="
          z-10 fixed top-0 left-0 right-0
          size-full bg-[#76ddfc]
          backdrop-filter backdrop-blur-[3px] bg-opacity-15
        "
      />
      <div // modal window like
        className="
          z-20 relative flex flex-col
          mx-auto mt-8 px-4 md:pl-16 md:pr-4 pb-16
          w-[22rem] sm:w-[40rem] md:w-[68rem] rounded-lg
          bg-[#f8f8f8] shadow-[0_0px_3px_0px_rgba(128,128,128,0.5)]
          prose max-w-none
        "
      >
        <div // to put close button right
          className="invisible flex justify-end z-30 sticky top-0 pt-4">
          <Link href="/" className="visible h-8" prefetch={true}>
            <div className="batsu"></div>
          </Link>
        </div>
        <div className="grid grid-flow-col justify-stretch">
          <div // left column
            className="w-[20rem] sm:w-[38rem] md:w-[48rem] font-noto-sans overflow-x-visible"
          >
            <h1 className="mb-1 md:mb-3 font-[600] text-lg sm:text-3xl md:text-4xl">{data.title}</h1>
            <DateInfo data={data} className="text-xs sm:text-base" />
            {/* <div className="
              post prose-sm md:prose-base mt-8 font-[500]
              prose-h2:text-[#324e73] prose-h2:border-l-4 prose-h2:border-[#324e73]
              prose-h2:pl-2 sm:prose-h2:pl-4 prose-h2:py-0.5 sm:prose-h2:py-1
              prose-h2:text-base sm:prose-h2:text-2xl
              prose-a:underline-offset-[5px] prose-a:decoration-[1pt]
              hover:prose-a:no-underline
              prose-pre:my-2 prose-p:my-2
              prose-code:before:content-none prose-code:after:content-none
              prose-ul:my-2"
            > */}
            {/* <span className="block"> */}
              <PostContentMath mathblocks={mathblocks} content={mdxSource} />
            {/* </span> */}
            {/* </div> */}
          </div>
          <div //right column
            className="hidden md:block w-full md:w-[12rem] pl-4">
            <Toc />
          </div>
        </div>
      </div>
    </>
  );
}
