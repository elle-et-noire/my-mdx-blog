---
title: Next.js + MDXでブログサイト制作入門
publish: 2024-12-19
lastUpdate: 2024-12-19
tags:
- web
- nextjs
---

## Next.jsによるウェブサイト制作

自分用の静的サイトを作ろうと思ったとき、今のご時世選択肢はいくらでもある。
- Google Site
- Hugo
- Zola
- Pelican
- 11ty
- Next.js  etc.

上の方のものを選べばものの数分でウェブサイトが完成する（Google Siteは使ったことがないが）。Zolaなどはウェブサイトのテンプレートも[たくさん用意されていて](https://www.getzola.org/themes/)、好みのものを`git clone`すればよい。個人的には[Serene](https://www.getzola.org/themes/serene/)がやりたいことを全部兼ね備えていて感動した。

しかし、後から別の機能を追加したいという思いが湧いてきたときにどのくらい労力を割くことになるかはまた別の話である。Zolaのようなテンプレート形式のフレームワークでは追加するごとにコードが見づらくなってゆくものだと思う。

Next.jsは数か月前にもバージョン15が出たような活発なフレームワークであり、うかうかしているとすぐに置いて行かれる。一方で、`npm install`から追加できるライブラリ群は豊富で、やりたいと思ったことはたいてい先人が実装してくれている。またJSX言語を用いて自分でコンポーネントを作成することもできる。

YAGNIという箴言もあるが、どうせなら自由度の高い環境で自分好みのサイトを制作したいという人はNext.jsが合うと思われる。

またMarkdownをNext.jsでHTML表示する際にMDXを利用することで、自作のcomponentをMarkdown内へ埋め込むことが可能となる。

## 環境構築

Node.jsをインストールして`npm`コマンドが使える状態にしておく。エディタはVimでもよいが、慣れていないうちはVisual Studio Codeに入れたTypescript用の拡張機能の警告に助けられることになる。また都度`git commit`をしておくと安心。

## プロジェクトの作成

対話的に環境設定を行う。
```sh
❯ npx create-next-app@latest
✔ What is your project named? … my-app
✔ Would you like to use TypeScript? … No / Yes
✔ Would you like to use ESLint? … No / Yes
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like your code inside a `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to use Turbopack for `next dev`? … No / Yes
✔ Would you like to customize the import alias (`@/*` by default)? … No / Yes
```

<details><summary>{`現在のlatestのパッケージバージョン`}</summary>
```json
{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next": "15.1.1"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "eslint": "^9",
    "eslint-config-next": "15.1.1",
    "@eslint/eslintrc": "^3"
  }
}
```
</details>

プロジェクトフォルダに移動して`npm run dev`で現状にウェブサイトを確認できる。


## Markdownを読み込んで表示する

```sh
npm install gray-matter # Markdownのメタデータを取得する
npm install next-mdx-remote # MarkdownをHTMLへ変換する
```


<details><summary><code>{'my-app/content/posts/sample-post.md'}</code>{' : 仮の記事'}</summary>
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

<details><summary><code>{`my-app/libs/post.ts`}</code>{` : 記事を取得するための関数群`}</summary>
```ts
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
  const markdown = readFileSync(path.join(POSTS_PATH, `${slug}.md`), "utf8");

  const { content, data } = matter(markdown);
  return {
    content,
    data,
  };
}
```
</details>


<details><summary><code>{`my-app/app/post/[...slug]/page.tsx`}</code>{` : 記事ページのテンプレート`}</summary>
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

export default async function PostPage(props: PostPageProps) {
  const params = await props.params;
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

以上のファイルを追加して`npm run dev`を実行し、`localhost:3000/post/sample-post`へアクセスすればMarkdownを一応取得できていることが確認できる。しかし見た目がひどい。

## 見た目を整える

```sh
npm install remark-gfm # GitHubに固有のMarkdown記法を解釈する
npm install -D @tailwindcss/typography # 記事に適した見た目に整えるCSS群
```
細かいCSSの設定をしたければ[tailwindlabs/tailwindcss-typography](https://github.com/tailwindlabs/tailwindcss-typography)を見よ。


<details><summary><code>{`my-app/tailwind.config.ts`}</code></summary>
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

<details><summary><code>{`my-app/app/post/[...slug]/page.tsx`}</code></summary>
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
```
</details>

<details><summary><code>{`my-app/app/globals.css`}</code></summary>
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

若干端に寄ってはいるものの、Markdownの見た目は整えられた。

`npm run dev`が通っても実際にGitHub Pagesなどに配置する段になってエラーが起こることがあるので`npm run build`が通ることまで確認してから`git commit`する。


## シンタックスハイライトを付ける

[Rehype Pretty](https://rehype-pretty.pages.dev/)を利用する。

```sh
npm install rehype-pretty-code shiki
```


## 数式を表示する

TBA


## リンクを新しいタブで開く

[参考文献](#参考文献)[3]を参考に`MyLink`コンポーネントを追加する。

`<MDXRemote ... components={{a: MyLink}}/>`で置換できる。

## 目次をつける

[参考文献](#参考文献)[2]を参考にTocbotをインストールして目次を追加する。

## 参考文献

1. [Next.js + MDXでブログ開発](https://amateur-engineer-blog.com/build-blog-using-nextjs-with-mdx)
2. [Next.js+MarkdownのブログにTocbotを使って目次を作成する](https://amateur-engineer-blog.com/create-toc-by-tocbot-for-nextjs-mdx-blog)
3. [Next.jsを利用した初めての本格的Markdownブログサイトの構築](https://reffect.co.jp/react/nextjs-markdown-blog)