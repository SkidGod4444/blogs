"use client";

import { Button } from "@/components/ui/button";
import { Link, LoaderCircleIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { RiDiscordFill } from "@remixicon/react";

export default function CommunityBanner() {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleDownload = () => {
    setIsRedirecting(true);
    setTimeout(() => {
      setIsRedirecting(false);
      window.open("https://l.devwtf.in/discord", "_blank");
    }, 2500);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 w-full bg-muted px-4 py-3 md:py-2 z-50">
      <div className="flex flex-col md:flex-row items-center justify-center gap-x-4 gap-y-2 text-center">
      <p className="text-sm flex items-center gap-1">
          <span className="font-medium">
            <RiDiscordFill/>
          </span>
          <span className="text-muted-foreground mx-2 hidden md:inline">•</span>
          <br className="md:hidden" />
          Join our community and meet some like-minded fellas.
        </p>
        <Button
          size="sm"
          variant="outline"
          disabled={isRedirecting}
          onClick={handleDownload}
          className="min-w-24 cursor-pointer"
        >
          {isRedirecting ? (
            <>
              <LoaderCircleIcon
                className="-ms-0.5 me-2 animate-spin"
                size={16}
                aria-hidden="true"
              />
              Hold tight...
            </>
          ) : (
            <>
              <Link size={16} className="-ms-0.5" aria-hidden="true" />
              Join now
            </>
          )}
        </Button>

        <Button
          variant="ghost"
          className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent cursor-pointer"
          onClick={() => setIsVisible(false)}
          aria-label="Close banner"
        >
          <XIcon
            size={16}
            className="opacity-60 transition-opacity group-hover:opacity-100"
            aria-hidden="true"
          />
        </Button>
      </div>
    </div>
  );
}