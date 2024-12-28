import { MDXRemote } from "next-mdx-remote/rsc";
import { Root } from "hast";
import { visit } from "unist-util-visit";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypePrettyCode from "rehype-pretty-code";
import { transformerLineNumbers } from "@rehype-pretty/transformers";
import rehypeSlug from "rehype-slug";
import rehypeMathJaxSvg from "rehype-mathjax";
import _Link from "./_link";
import _Pre from "./_pre";

export default function PostContent({ content }: {
  content: string;
}) {
  const options = {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [
        () => (tree: Root) => {
          visit(tree, (node) => {
            if (node?.type === "element" && node?.tagName === "pre") {
              const [codeEl] = node.children;
              if (codeEl.type === "element") {
                if (codeEl.tagName == "code") {
                  // @ts-expect-error: type is not prepared
                  const s = codeEl.children?.[0].value
                  if (typeof s === "string")
                    // @ts-expect-error: type is not prepared
                    node.raw = s.slice(0, -1); // trailing breakline
                }
              }
            }
          });
        },
        [rehypePrettyCode, {
          theme: "one-dark-pro",
          keepBackground: false,
          transformers: [
            transformerLineNumbers({ autoApply: true }),
          ]
        }],
        () => (tree: Root) => {
          visit(tree, (node) => {
            if (node?.type === "element" && node?.tagName === "figure") {
              if (!("data-rehype-pretty-code-figure" in node.properties)) return;

              for (const child of node.children) {
                if (child.type === "element" && child.tagName === "pre") {
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

  return (
    <MDXRemote
      source={content
        .replace(/\\\(/g, "<span className='inlinemath'>$")
        .replace(/\\\)/g, "$</span>")
      }
      // @ts-expect-error: type is not prepared
      options={options}
      components={{
        a: _Link,
        pre: _Pre,
      }}
    />);
}