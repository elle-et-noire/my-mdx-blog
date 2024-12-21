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

    // destroy tocbot if the component was unmounted
    return () => tocbot.destroy();
  }, []);

  return (
    <div className="sticky top-0 pt-8 font-system">
      <h2 className="py-0.5 w-full text-base text-white text-center bg-[#324e73] font-[300]">目次</h2>
      <div className="toc px-0 pb-8 w-full text-base"></div>
    </div>
  );
}

