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
    <div className="code-block-container relative">
      <p className="absolute z-30 top-[-5pt] left-0 uppercase text-xs font-medium bg-slate-700 text-white px-2 rounded-tl-lg">
        {lang}
      </p>
      <CopyButton text={raw} className="absolute z-30 top-1 right-3 italic text-[#888] text-sm" />
      <pre {...props} className="">
        {children}
      </pre>
    </div>
  );
}
