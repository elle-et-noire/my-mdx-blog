import { GetAllPostSlugs, GetPostBySlug } from "@/libs/post";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import Toc from "@/components/toc";  // Tocコンポーネントを追加

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
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
    },
  };
  const { content, data } = GetPostBySlug(params.slug);

  return (
    <div>
      <div className="prose flex justify-center mx-auto p-8">
        <div className="w-9/12">
          <h1 className="flex justify-center mt-8">{data.title}</h1>
          <div className="post bg-gray-100 p-8">
            <MDXRemote source={content} options={options} />
          </div>
        </div>
        <div className="w-3/12">
          <Toc /> {/* Tocコンポーネントを追加 */}
        </div>
      </div>
    </div>
  );
}
