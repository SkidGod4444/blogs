"use client";
import { Button } from "@/components/ui/button";
import useLocalStorage from "@/hooks/use-local";
import { RiThumbUpFill, RiThumbUpLine } from "@remixicon/react";
import { useEffect, useState } from "react";

export default function LikeBtn({keyName}: {keyName: string}) {
  const [likes, setLikes] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useLocalStorage<string[]>("blogs-liked", [])
  const liked = isLiked.includes(keyName);
  // Fetch likes count on mount
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await fetch(`/api/like?key=${keyName}`);
        const data = await res.json();
        setLikes(data.likes || 0);
      } catch (error) {
        console.error("Failed to fetch likes:", error);
      }
    };

    fetchLikes();
  }, [keyName]);

  // Handle like button click
  const handleLike = async () => {
    if (loading) return;
    setLoading(true);

    const action = liked ? "decrement" : "increment";

    try {
      const res = await fetch(`/api/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: keyName, action }),
      });

      const data = await res.json();
      setLikes(data.likes);

      // Update local storage
      setIsLiked(liked ? isLiked.filter(item => item !== keyName) : [...isLiked, keyName]);
    } catch (error) {
      console.error("Failed to update likes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className="py-0 pe-0 flex items-center gap-1 cursor-pointer"
      variant="outline"
      onClick={handleLike}
      disabled={loading}
    >
      {liked ? <RiThumbUpFill className="opacity-60" size={16} aria-hidden="true" />:<RiThumbUpLine className="opacity-60" size={16} aria-hidden="true" />}
      {liked ? "Dislike" : "Like"}
      <span className="w-px h-4 bg-input mx-1"></span>
      <span className="text-muted-foreground relative flex h-5 w-6 items-center justify-center rounded-full text-sm font-medium">
        {likes}
      </span>
    </Button>
  );
}