import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tocbot/4.25.0/tocbot.css" /> {/* ここで CSS を追加する */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
