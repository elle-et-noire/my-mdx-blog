"use client";

import React, { useEffect } from "react";
import * as tocbot from "tocbot";

export default function Toc() {
  useEffect(() => {
    tocbot.init({
      tocSelector: ".toc", // tell tocbot at which class to make toc
      contentSelector: ".post", // gather headings in .post
      headingSelector: "h2, h3", // to be show in toc
    });

    // コンポーネントがアンマウントされたときにTocbotを破棄
    return () => tocbot.destroy();
  }, []);

  return (
    <div className="sticky top-0 pt-16 ml-8 font-system">
      <h2 className="text-base text-white text-center bg-[#324e73] py-0.5 font-[300]">目次</h2>
      <div className="toc px-0 pb-8 text-base"></div>
    </div>
  );
}

