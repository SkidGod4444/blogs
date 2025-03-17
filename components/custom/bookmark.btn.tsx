"use client";

import { BookmarkIcon } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

export default function BookMarkBtn() {
  const handleBookmark = () => {
    toast(
      "Press " +
        (navigator.platform.includes("Mac") ? "Cmd + D" : "Ctrl + D") +
        " to bookmark this page."
    );
  };

  return (
    <Button className="py-0 pe-0 cursor-pointer" variant="outline" onClick={handleBookmark}>
            <BookmarkIcon size={16} aria-hidden="true" />
          </Button>
  );
}