import { GetAllSlugs, GetPostBySlug } from "@/lib/post";
import Toc from "@/components/toc";
import Link from "next/link";
import PostContent from "@/components/post-content";
import DateInfo from "@/components/date-info";

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

  return (
    <>
      <div className="
        z-10 fixed top-0 left-0 right-0
        size-full bg-[#76ddfc]
        backdrop-filter backdrop-blur-[3px] bg-opacity-15"
      // glass morphism
      />
      <div className="
        z-20 relative
        mx-auto mt-8 pl-8 md:pl-16 pr-4 md:pr-8 pb-16
        w-[22rem] sm:w-[40rem] md:w-[64rem] rounded-lg
        bg-[#fefefe] shadow-[0_0px_3px_0px_rgba(128,128,128,0.5)]
        flex justify-center
        prose max-w-none"
      // modal window
      >
        <div className="relative top-0 left-0 w-full md:w-[43rem] font-noto-sans" /* left column */ >
          <h1 className="mt-8 md:mt-16 mb-1 md:mb-3 font-[600] text-lg md:text-4xl">{data.title}</h1>
          <DateInfo data={data} className="text-xs md:text-base" />
          <div className="
            post prose-sm md:prose-base font-[500] mt-8
            prose-h2:text-[#324e73] prose-h2:border-l-4 prose-h2:border-[#324e73] prose-h2:pl-4 prose-h2:py-1
            prose-h2:text-lg md:prose-h2:text-2xl
            hover:prose-a:no-underline prose-a:underline-offset-[5px]
            prose-pre:my-1 prose-p:my-2 prose-code:before:content-none prose-code:after:content-none
            prose-ul:my-2"
          >
            <PostContent content={content} />
          </div>
        </div>
        <div className="w-3/12 hidden md:block">
          <Toc />
        </div>
        <Link href="/" className="sticky top-0 pt-4 md:pt-8 h-8">
          <div className="batsu"></div>
        </Link>
      </div>
    </>
  );
}
