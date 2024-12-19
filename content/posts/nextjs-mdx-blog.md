---
title: Next.js+MDXでブログ制作入門
publish: 2024-12-17
lastUpdate: 2024-12-20
tags:
- web
- ssg
- nextjs
---

## Next.jsとは

ReactベースのWebアプリケーションを制作できるフレームワーク。つい最近Next.js 15がリリースされた。

Next.jsはSSGとSSRのどちらもできる。`next/link`を利用した高速なページ遷移が可能。SSRなら`next/image`を利用した高速な画像読み込みもできる。

今回はNext.jsのSSGの機能を用いてMarkdownで書かれた記事を載せるブログサイトの制作を目指す。

## 環境構築

- npm

さえあれば十分。エディタとして

- Visual Studio Code

もあるとなおよい。

## はじめの一歩

```sh
npx create-next-app@latest
```
によって対話的な環境設定を経ると基本となるプロジェクトフォルダが作成される。

<details><summary>{`設定の詳細`}</summary>
- use Typescript ... Yes
- use ESLint ... どちらでも
- use Tailwind CSS ... Yes
- inside `src/` ... No
- use App Router ... Yes
- use Turbopack for `next dev` ... Yes
- customize the import alias ... No
</details>

作成されたフォルダに移動して
```sh
npm run dev
```
と打つことで、サーバーが立ち上がり現状のウェブサイトが表示される。

## 必要なパッケージの追加

プロジェクトフォルダで
```bash
npm install next-mdx-remote gray-matter
```
を実行する。`gray-matter`によってプロジェクト内に配置された`.md`ファイル内のメタデータを取得し、`next-mdx-remote`によってMarkdownをHTMLとして表示する。


## ファイルの追加

<details><summary><code>{'content/posts/sample-post.md'}</code>{' : 仮の記事'}</summary>
```md
---
title: Sample Post
category: category
---

## Paragraph

This is a paragraph.

## List

- item 1
- item 2
- item 3

## Table

| Name  | Age |
| ----- | --- |
| Alice | 20  |
| Bob   | 25  |
| Carol | 30  |

## Quote

> This is a quote.

## Task List

- [x] task 1
- [ ] task 2
- [ ] task 3
```

冒頭のYAMLにメタ情報を記載する。MDXからこのMarkdownを読み込むことを考えて、HTML要素を埋め込む際は`` <code>{`int i = 0;`}</code> ``のように内部を`` {` ``と`` `} ``で囲む。
</details>

<details><summary><code>{`libs/post.ts`}</code>{` : 記事を取得するための関数群`}</summary>
```typescript
import { readFileSync, readdirSync } from "fs";
import path from "path";
import matter from "gray-matter";

// MDXファイルのディレクトリ
const POSTS_PATH = path.join(process.cwd(), "content/posts");

// ファイル名（slug）の一覧を取得
export function GetAllPostSlugs() {
  const postFilePaths = readdirSync(POSTS_PATH).filter((path) =>
    /\.md?$/.test(path)
  );
  return postFilePaths.map((path) => {
    const slug = path.replace(/\.md?$/, "");
    return slug;
  });
}

// slugからファイルの中身を取得
export function GetPostBySlug(slug: string) {
  const markdown = readFileSync(`content/posts/${slug}.md`, "utf8");

  const { content, data } = matter(markdown);
  return {
    content,
    data,
  };
}
```
</details>


<details><summary><code>{`app/post/[...slug]/page.tsx`}</code>{` : 記事ページのテンプレート`}</summary>
```tsx
import { GetAllPostSlugs, GetPostBySlug } from "@/libs/post";
import { MDXRemote } from "next-mdx-remote/rsc";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = GetAllPostSlugs();
  return slugs.map((slug) => ({ params: { slug } }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { content, data } = GetPostBySlug(params.slug);

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.category}</p>
      <div>
        <MDXRemote source={content} />
      </div>
    </div>
  );
}
```
</details>

上記の内容のファイルを追加して`npm run dev`を実行し、立ち上がったローカルサーバーで`localhost:3000/post/sample-post`へアクセスすると仮の記事が表示される。しかし見た目がひどい。

## 見た目を整える

必要なパッケージを追加する。

```sh
npm install remark-gfm
npm install -D @tailwindcss/typography
```

`remark-gfm`はGithubに固有のMarkdown記法をHTMLへ変換してくれる。

`tailwindcss/typography`は記事の見た目を整える際に便利。細かい見た目を変更したい場合は[tailwindlabs/tailwindcss-typography](https://github.com/tailwindlabs/tailwindcss-typography)を見よ。

<details><summary><code>{`tailwind.config.ts`}</code></summary>
```ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")], // 追加
} satisfies Config;
```
</details>

<details><summary><code>{`app/post/[...slug]/page.tsx`}</code></summary>
```tsx
import { GetAllPostSlugs, GetPostBySlug } from "@/libs/post";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = GetAllPostSlugs();
  return slugs.map((slug) => ({ params: { slug } }));
}

export default async function PostPage({ params }: PostPageProps) {
  const options = {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  };
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
```
</details>

<details><summary><code>{`app/globals.css`}</code></summary>
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```
</details>

仕組みがつかめたら欲しい機能を拡張していく。

## 参考文献

[【Typescript】Next.js + MDXでブログ開発](https://amateur-engineer-blog.com/build-blog-using-nextjs-with-mdx)