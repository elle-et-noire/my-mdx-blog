import { CopyButton } from "./copy-button";

// @ts-expect-error: type is not prepared
export const _Pre = ({ children, raw, ...props }) => {
  const lang = props["data-language"];
  return (
    <pre {...props} className={""}>
      <div className={"code-header static flex justify-between"}>
        {lang}
        <CopyButton text={raw} className={""} />
      </div>
      {children}
    </pre>
  );
};
