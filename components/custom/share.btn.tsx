"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CheckIcon, CopyIcon, Share } from "lucide-react";
import { useId, useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ShareBtn({shortenSlug}: {shortenSlug: string}) {
  const id = useId();
  const [copied, setCopied] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [shortUrl, setShortUrl] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  const handleCopy = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  useEffect(() => {
    console.log("useEffect triggered - isOpen:", isOpen, "shortenSlug:", shortenSlug);
    
    const fetchShortUrl = async () => {
      if (isOpen) {
        setIsLoading(true);
        try {
          console.log("Fetching short URL...");
          const response = await fetch(`/api/dub?shortenSlug=${shortenSlug}`);
  
          const data = await response.json();
          console.log("API Response:", data);
  
          if (data.error) {
            console.warn("Short link not found, creating new one...");
  
            const resp = await fetch("/api/dub", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ url: `https://blogs.devwtf.in${pathname}`, shortenSlug }),
            });
  
            const link = await resp.json();
            console.log("Created short URL:", link);
  
            if (link.shortUrl) {
              setShortUrl(link.shortUrl);
            }
          } else {
            if (data) {
              console.log("Fetched short URL:", data);
              setShortUrl(data);
            }
          }
        } catch (error) {
          console.error("Error fetching short URL:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
  
    fetchShortUrl();
  }, [isOpen, shortenSlug, pathname]);


  return (
    <div className="flex flex-col gap-4">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="cursor-pointer">
            <Share/>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72">
          <div className="flex flex-col gap-3 text-center">
            <div className="text-sm font-medium">Share this blog using short links!</div>
            {/* <div className="flex flex-wrap justify-center gap-2">
              <Button size="icon" variant="outline" aria-label="Embed">
                <RiCodeFill size={16} aria-hidden="true" />
              </Button>
              <Button size="icon" variant="outline" aria-label="Share on Twitter">
                <RiTwitterXFill size={16} aria-hidden="true" />
              </Button>
              <Button size="icon" variant="outline" aria-label="Share on Facebook">
                <RiFacebookFill size={16} aria-hidden="true" />
              </Button>
              <Button size="icon" variant="outline" aria-label="Share via email">
                <RiMailLine size={16} aria-hidden="true" />
              </Button>
            </div> */}
            <div className="space-y-2">
              <div className={cn(
                            "relative",
                            isLoading ? "cursor-progress" : "cursor-copy",
                          )}>
                <Input
  ref={inputRef}
  id={id}
  className="pe-9"
  type="text"
  placeholder="https://b.devwtf.in/..."
  value={shortUrl ?? ""}
  aria-label="Share link"
  disabled={isLoading}
  readOnly={!isLoading}
/>
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={handleCopy}
                        className="text-muted-foreground/80 cursor-pointer hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed"
                        aria-label={copied ? "Copied" : "Copy to clipboard"}
                        disabled={copied || isLoading}
                      >
                        <div
                          className={cn(
                            "transition-all",
                            copied ? "scale-100 opacity-100" : "scale-0 opacity-0",
                          )}
                        >
                          <CheckIcon className="stroke-emerald-500" size={16} aria-hidden="true" />
                        </div>
                        <div
                          className={cn(
                            "absolute transition-all",
                            copied ? "scale-0 opacity-0" : "scale-100 opacity-100",
                          )}
                        >
                          <CopyIcon size={16} aria-hidden="true" />
                        </div>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="px-2 py-1 text-xs">Copy to clipboard</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
