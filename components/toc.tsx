"use client";

import React, { useEffect } from "react";
import * as tocbot from "tocbot";

function Toc() {
  useEffect(() => {
    // Tocbotの初期化
    tocbot.init({
      tocSelector: ".toc", // 目次の表示部分のクラス
      contentSelector: ".post", // 目次を生成する対象のクラス
      headingSelector: "h2, h3", // 目次に表示する見出しのタグ
    });

    // コンポーネントがアンマウントされたときにTocbotを破棄
    return () => tocbot.destroy();
  }, []);

  return (
    <div className="sticky top-0 pt-16 ml-8">
      <h2 className="text-xl border-l-4 border-secondary pl-1">ToC</h2>
      <div className="toc px-0 pb-8 text-base"></div> {/* 目次の表示部分 */}
    </div>
  );
}

export default Toc;
