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
    <>
      <div className="mb-[-8pt] flex justify-between">
        <p className="uppercase text-xs font-medium bg-slate-700 text-white p-1 rounded-tl-lg">
          {lang}
        </p>
        <CopyButton text={raw} className="italic" />
      </div>
      <pre {...props} className="">
        {children}
      </pre>
    </>
  );
}
