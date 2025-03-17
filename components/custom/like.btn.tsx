import { Button } from "@/components/ui/button";
import { ThumbsUpIcon } from "lucide-react";

export default function LikeBtn() {
    return (
      <Button className="py-0 pe-0 flex items-center gap-1 cursor-pointer" variant="outline">
        <ThumbsUpIcon className="opacity-60" size={16} aria-hidden="true" />
        Like
        <span className="w-px h-4 bg-input mx-1"></span>
        <span className="text-muted-foreground relative flex h-5 w-6 items-center justify-center rounded-full text-sm font-medium">
          86
        </span>
      </Button>
    );
  }