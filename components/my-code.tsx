"use client";

import Copy from "./copy";

function MyCode({ children }: {
  children: string;
}) {
  return (
    <>
      <Copy message={children} />
      <code>
        {children}
      </code>
    </>
  );
}

export default MyCode;