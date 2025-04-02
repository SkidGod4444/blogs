"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const timeout = setTimeout(() => {
      router.push("https://devwtf.in/blog");
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full my-50">
      <h1 className="font-semibold text-2xl">
        hey, thanks alot for visiting my blogs app here i don&apos;t want to say anything other than...
      </h1>
      <span className="font-semibold mt-10 text-xl">- i love you ❤️</span>
      <p className="mt-5 text-lg">Redirecting in {timer} seconds...</p>
    </div>
  );
}