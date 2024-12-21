import { CopyButton } from "./copy-button";

interface PreProps extends React.HTMLProps<HTMLPreElement> {
  raw?: string;
  ["data-language"]?: string;
}

export default function _Pre(props: PreProps) {
  const {
    children,
    raw = "",
    ["data-language"]: lang = "Shell",
  } = props;
  return (
    <pre {...props} className="relative shadow-smooth pt-4">
      {/* <div className={"code-header static flex justify-between"}> */}
        <p className="absolute top-[-8pt] left-2 capitalize text-xs font-medium bg-slate-700 text-white p-1 rounded-tl-lg">
          {lang}
        </p>
        <CopyButton text={raw} className="absolute right-3 top-1 shadow-smooth italic" />
      {/* </div> */}
      {children}
    </pre>
  );
}
