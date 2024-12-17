import { GetAllPostSlugs, GetPostBySlug } from "@/libs/post";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import Toc from "@/components/toc";  // Tocコンポーネントを追加
import remarkMath from "remark-math";
import rehypeMathJax from "rehype-mathjax";
import Link from "next/link";


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
      rehypePlugins: [rehypeSlug, rehypeMathJax],
    },
  };
  const { content, data } = GetPostBySlug(params.slug);

  return (
    <div className="bg-zinc-700 m-0 p-12">
      <div className="prose max-w-none w-[32rem] md:w-[72rem] flex justify-center mx-auto p-10 rounded-lg bg-gray-100">
        <div className="w-full font-[family-name:var(--font-noto-sans)]">
          <h1 className="mt-8 ml-4 font-[600]">{data.title}</h1>
          <div className="post bg-gray-100 p-8 font-[500]">
            <MDXRemote source={content} options={options} />
          </div>
        </div>
        <div className="w-3/12 hidden md:block">
          <Toc />
        </div>
        <Link href="/" className="h-8">
          {/* <i className="icon-close"></i> */}
          <div className="batsu"></div>
        </Link>
      </div>
    </div>
  );
}
