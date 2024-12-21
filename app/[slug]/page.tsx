import { GetAllPostSlugs, GetPostBySlug } from "@/lib/post";
import Toc from "@/components/toc";
import Link from "next/link";
import PostContent from "@/components/post-content";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = GetAllPostSlugs();
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
      />
      <div className="
        z-20 relative
        mx-auto mt-8 pl-8 md:pl-16 pr-4 md:pr-8 pb-16
        w-[40rem] md:w-[64rem] rounded-lg
        bg-[#fefefe] shadow-[0_0px_3px_0px_rgba(128,128,128,0.5)]
        flex justify-center
        prose max-w-none"
        // modal window
      >
        <div className="w-[36rem] md:w-[48rem] font-noto-sans" /* left column */ >
          <h1 className="mt-16 mb-3 font-[600]">{data.title}</h1>
          <div className="
            flex justify-start gap-2
            font-[family-name:var(--font-kosugi-maru)] font-[400]
            text-gray-400 italic"
          >
            <div>
              <span className="pr-1">投稿日</span>{data.publish.toISOString().split('T')[0]}
              <span className="pl-2 pr-1">» 最終更新日</span>{data.lastUpdate.toISOString().split('T')[0]}
            </div>
          </div>
          <div className="
            post font-[500] mt-8 md:w-[43rem]
            prose-h2:text-[#324e73] prose-h2:border-l-4 prose-h2:border-[#324e73] prose-h2:pl-4 prose-h2:py-1
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
        <Link href="/" className="h-8 sticky top-0 pt-4 md:pt-8">
          <div className="batsu"></div>
        </Link>
      </div>
    </>
  );
}
