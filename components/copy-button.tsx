"use client";

import { useState } from "react";

export const CopyButton = ({ className = "", text = "" }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);

    // wait a while to prevent unintended continuous copying
    setTimeout(() => {
      setIsCopied(false);
    }, 700);
  };

  return (
    <button disabled={isCopied} onClick={copy} className={className} title="copy-code">
      {isCopied ? "Copied!" : "Copy"}
    </button>
  );
};
