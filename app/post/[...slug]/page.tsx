import { GetAllPostSlugs, GetPostBySlug } from "@/libs/post";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

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
  const options = {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  };
  const params = await props.params;
  const { content, data } = GetPostBySlug(params.slug);

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.category}</p>
      <div className="prose">
        <MDXRemote source={content} options={options} />
      </div>
    </div>
  );
}
