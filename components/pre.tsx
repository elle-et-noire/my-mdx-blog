import { CopyButton } from "./copy-button";

// @ts-expect-error: type is not prepared
export const Pre = ({ children, raw, ...props }) => {
  const lang = props["data-language"];
  return (
    <pre {...props} className={""}>
      <div className={"code-header"}>
        {lang}
        <CopyButton text={raw} />
      </div>
      {children}
    </pre>
  );
};
