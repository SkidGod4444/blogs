import { CopyButton } from "@/components/custom/copy.btn";
import { cn } from "@/lib/utils";

export const CodeBlock = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) => {
  return (
    <div className="relative rounded-xl font-mono text-sm">
      <div className="absolute top-2 right-4 z-50">
        <CopyButton>{children}</CopyButton>
      </div>
      <div className="w-full p-[2px]">
        <pre
          className={cn("overflow-x-auto p-4 rounded-md font-mono bg-transparent", className)}
          {...props}
        >
          <code>{children}</code>
        </pre>
      </div>
    </div>
  );
};