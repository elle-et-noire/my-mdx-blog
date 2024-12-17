import { GetAllPostSlugs, GetPostBySlug } from "@/libs/post";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import Toc from "@/components/toc";  // Tocコンポーネントを追加
import remarkMath from "remark-math";
import rehypeMathJax from "rehype-mathjax";


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
    <div>
      <div className="prose max-w-none w-[32rem] md:w-[64rem] flex justify-center mx-auto">
        <div className="w-full">
          <h1 className="flex justify-center mt-8">{data.title}</h1>
          <div className="post bg-gray-100 p-8 font-[family-name:var(--font-noto-sans)] font-[500]">
            <MDXRemote source={content} options={options} />
          </div>
        </div>
        <div className="w-3/12 hidden md:block">
          <Toc /> {/* Tocコンポーネントを追加 */}
        </div>
      </div>
    </div>
  );
}
