"use client";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      // Here you would typically call your API to handle the subscription
      // For example: await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) })
      
      // Simulating API call with timeout
      console.log("Subscribing to newsletter...");
      const res = await fetch("https://nsl.devwtf.in/api/v1/subs/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic " + btoa("admin:saidevdhal")
        },
        body: JSON.stringify({
          email: [email]
        })
      })
      console.log(res);
      if (res.status === 200) {
        toast.success("Successfully subscribed to the newsletter!");
      } else {
        toast.error("Oops! You're already on the list.");
      }
      setEmail("");
    } catch (error) {
      toast.error("Failed to subscribe. Please try again later.");
      console.error("Subscription error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full my-50">
      <div className="items-start justify-center">
      <h1 className="text-4xl font-serif">
        hii, this is saidev.
      </h1>
      <p className="text-lg mt-3">
        i write blogs & run a newsletter in my free time. <br />
        i love ai & open source. have been building since am 14.
      </p>
      <div className="flex gap-4 items-center justify-center mt-5">
      <Input 
        type="email" 
        placeholder="Enter your email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()}
      />
      <Button 
        className="cursor-pointer" 
        onClick={handleSubscribe}
        disabled={isLoading}
      >
        {isLoading ? "Subscribing..." : "Subscribe"}
      </Button>
      </div>
      <p className="text-lg mt-5 italic">
        subscribe to my newsletter above, thanks for visiting!
      </p>
      <h2 className="text-2xl font-serif mt-5">
        find all my writings - <Link href="https://devwtf.in/blog" className="underline text-blue-500" target="_blank" rel="noopener noreferrer">here</Link>
      </h2>
      </div>
    </div>
  );
}