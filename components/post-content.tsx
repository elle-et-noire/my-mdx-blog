import { MDXRemote } from "next-mdx-remote/rsc";
import { Root } from "hast";
import { visit } from "unist-util-visit";
import { Element } from "hast";

interface ExtendedElement extends Element {
  raw?: string;
}
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypePrettyCode from "rehype-pretty-code";
import { transformerLineNumbers } from "@rehype-pretty/transformers";
import rehypeSlug from "rehype-slug";
import rehypeMathJaxSvg from "rehype-mathjax";
import _Link from "./_link";
import _Pre from "./_pre";
import { ShikiTransformer } from "shiki";

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
                  const child = codeEl.children?.[0];
                  if (child && child.type === "text") {
                    const s = child.value;
                    if (typeof s === "string")
                      (node as Element & { raw?: string }).raw = s.slice(0, -1); // trailing breakline
                  }
                }
              }
            }
          });
        },
        [rehypePrettyCode, {
          keepBackground: false,
          transformers: [
            transformerLineNumbers({ autoApply: true }),
          ],
        }] as [typeof rehypePrettyCode, { keepBackground: boolean; transformers: ShikiTransformer[] }],
        () => (tree: Root) => {
          visit(tree, (node) => {
            if (node?.type === "element" && node?.tagName === "figure") {
              if (!("data-rehype-pretty-code-figure" in node.properties)) return;

              for (const child of node.children) {
                if (child.type === "element" && child.tagName === "pre") {
                  (child as ExtendedElement).properties["raw"] = (node as ExtendedElement).raw;
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
      options={options}
      components={{
        a: _Link,
        pre: _Pre,
      }}
    />);
}