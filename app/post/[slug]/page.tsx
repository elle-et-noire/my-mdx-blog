import { GetAllPostSlugs, GetPostBySlug } from "@/libs/post";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import Toc from "@/components/toc";  // Tocコンポーネントを追加
import remarkMath from "remark-math";
import Link from "next/link";
import rehypeMathJaxSvg from "rehype-mathjax";
import rehypePrettyCode from "rehype-pretty-code";
import MyLink from "@/components/my-link";
// import MyCode from "@/components/my-code";
import { visit } from 'unist-util-visit';
import { Root } from 'hast';
import { Pre } from "@/components/pre";

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

  const options = {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [
        () => (tree: Root) => {
          visit(tree, (node) => {
            if (node?.type === "element" && node?.tagName === "pre") {
              const [codeEl] = node.children;
              // @ts-expect-error: type is not prepared
              if (codeEl.tagName !== "code") return;
              // @ts-expect-error: type is not prepared
              node.raw = codeEl.children?.[0].value;
            }
          });
        },
        [rehypePrettyCode, {
          // theme: {
          //   dark: "one-dark-pro",
          //   light: "github-light",
          // },
        }],
        () => (tree: Root) => {
          visit(tree, (node) => {
            if (node?.type === "element" && node?.tagName === "figure") {
              if (!("data-rehype-pretty-code-figure" in node.properties)) {
                return;
              }

              for (const child of node.children) {
                // @ts-expect-error: type is not prepared
                if (child.tagName === "pre") {
                  // @ts-expect-error: type is not prepared
                  child.properties["raw"] = node.raw;
                }
              }
            }
          });
        },
        rehypeSlug,
        rehypeMathJaxSvg,
      ],
    },
  };
  const { slug } = await params;
  const { content, data } = GetPostBySlug(slug);

  return (
    <main className="min-h-screen min-w-max m-0 pb-12 bg-[#a0bac8]">
      <div className="
        z-0 fixed top-0 left-0 right-0
        pt-4 pb-2 w-full
        bg-[#fefefe] shadow-[0_1px_1px_1px_rgba(0,0,0,0.3)]
        text-center text-[#112b45] text-2xl font-system
        underline underline-offset-[12px] decoration-4 decoration-yellow-300"
      >
        記事一覧
      </div>
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
      >
        <div className="w-[36rem] md:w-[48rem] font-noto-sans">
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
            <MDXRemote
              source={content
                .replace(/\\\(/g, "<span className='inlinemath'>$\\hspace{0.2em}")
                .replace(/\\\)/g, "\\hspace{0.2em}$</span>")
              }
              // @ts-expect-error: type is not prepared
              options={options}
              components={{
                a: MyLink,
                pre: Pre
                // code: MyCode,
              }}
            />
          </div>
        </div>
        <div className="w-3/12 hidden md:block">
          <Toc />
        </div>
        <Link href="/" className="h-8 sticky top-0 pt-4 md:pt-8">
          <div className="batsu"></div>
        </Link>
      </div>
    </main>
  );
}
