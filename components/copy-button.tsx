"use client";

import { useState } from "react";

// @ts-expect-error: type is not prepared
export const CopyButton = ({ className, text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <button disabled={isCopied} onClick={copy} className={className} title="copy-code">
      {isCopied ? "Copied!" : "Copy"}
    </button>
  );
};
