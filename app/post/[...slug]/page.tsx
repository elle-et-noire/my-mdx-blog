import { GetAllPostSlugs, GetPostBySlug } from "@/libs/post";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import Toc from "@/components/toc";  // Tocコンポーネントを追加
import remarkMath from "remark-math";
import Link from "next/link";
import rehypeMathJaxSvg from "rehype-mathjax";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = GetAllPostSlugs();
  return slugs.map((slug) => ({ params: { slug } }));
}

export default async function PostPage(props: PostPageProps) {
  const params = await props.params;
  const options = {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [rehypeSlug, rehypeMathJaxSvg],
    },
  };
  const { content, data } = GetPostBySlug(params.slug);

  return (
    <div className="m-0 py-12 bg-[#a0bac8]">
      <div className="prose max-w-none w-[40rem] md:w-[64rem] flex justify-center mx-auto pl-8 md:pl-16 pr-4 md:pr-8 pb-16 rounded-lg bg-gray-100">
        <div className="w-[48rem] font-[family-name:var(--font-noto-sans)]">
          <h1 className="mt-16 mb-3 font-[600]">{data.title}</h1>
          <div className="flex justify-start gap-2 font-[family-name:var(--font-kosugi-maru)] text-gray-400 font-[400] italic">
            <div>
              <span className="pr-1">投稿日</span>{data.publish.toISOString().split('T')[0]}
              <span className="pl-2 pr-1">» 最終更新日</span>{data.lastUpdate.toISOString().split('T')[0]}
            </div>
          </div>
          <div className="post bg-gray-100 font-[500] prose-h2:text-[#324e73] prose-h2:border-l-4 prose-h2:border-l-[#324e73] prose-h2:pl-3 prose-h2:py-1">
            <MDXRemote source={content.replace(/\\\(/g, "<span className='inlinemath'>$\\hspace{0.2em}").replace(/\\\)/g, "\\hspace{0.2em}$</span>")} options={options} />
          </div>
        </div>
        <div className="w-3/12 hidden md:block">
          <Toc />
        </div>
        <Link href="/" className="h-8 sticky top-0 pt-4 md:pt-8">
          <div className="batsu"></div>
        </Link>
      </div>
    </div>
  );
}
