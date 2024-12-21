import { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export const _Code = {
  code: (props: HTMLAttributes<HTMLElement>) => {
    const { className, ...rest } = props;
    return (
      <code
        className={cn(
          "rounded-sm bg-slate-950 px-[0.5rem] py-1 font-mono text-sm text-foreground text-pretty leading-relaxed text-white",
          className
        )}
        {...rest}
      />
    );
  },
};