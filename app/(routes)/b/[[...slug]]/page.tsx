import { notFound } from "next/navigation";
import { blogs } from "#site/content";
import type { Metadata } from "next";
import Balancer from "react-wrap-balancer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { siteConfig } from "@/config/site.config";
import { absoluteUrl, cn } from "@/lib/utils";
import { DashboardTableOfContents } from "@/components/mdx/toc";
import { MDXContentRenderer } from "@/components/mdx/content.renderer";

type DocPageProps = {
    slug: string[];
};

async function getDocFromParams({ params }: { params: Promise<DocPageProps> }) {
  const parameters = await params;
  const slug = parameters.slug?.join("/") || "";
  const blog = blogs.find((blog) => blog.slugAsParams === slug);

  if (!blog) {
    return null;
  }

  return blog;
}

export async function generateMetadata({
  params,
}: { params: Promise<DocPageProps> }): Promise<Metadata> {
  const blog = await getDocFromParams({ params });

  if (!blog) {
    return {};
  }

  return {
    title: `${blog.title} - ${siteConfig.name}`,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: "article",
      url: absoluteUrl(blog.slug),
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(
            blog.title
          )}&description=${encodeURIComponent(blog.description)}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(
            blog.title
          )}&description=${encodeURIComponent(blog.description)}`,
        },
      ],
      creator: "@SaidevDhal",
    },
  };
}

export async function generateStaticParams(): Promise<
  { slug: string[] }[]
> {
  return blogs.map((blog) => ({
    slug: blog.slugAsParams.split("/"),
  }));
}

export default async function BlogsPage({ params }: { params: Promise<DocPageProps> }) {
  const blog = await getDocFromParams({ params });

  if (!blog) {
    notFound();
  }

  return (
    <main className="relative p-2 md:p-4 lg:py-6 md:gap-10 lg:grid lg:grid-cols-[1fr_180px]">
      <div className="w-full mx-auto min-w-0">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            {blog.slug.split("/").map((slug, index) => (
              <div className="flex items-center gap-2" key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={`/${blog.slug
                      .split("/")
                      .slice(0, index + 1)
                      .join("/")}`}
                    className={cn(
                      index === blog.slug.split("/").length - 1
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {slug.charAt(0).toUpperCase() + slug.slice(1)}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index < blog.slug.split("/").length - 1 && (
                  <BreadcrumbSeparator />
                )}
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="space-y-2">
          <h1 className={cn("scroll-m-20 text-5xl font-bold tracking-tight")}>
            {blog.title}
          </h1>
          {blog && (
            <p className="tracking-tight text-muted-foreground mt-5">
              <Balancer>{blog.description}</Balancer>
            </p>
          )}
        </div>
        <div className="py-5">
          <MDXContentRenderer code={blog.body} />
        </div>
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] pt-4">
          {blog.toc.visible && (
            <DashboardTableOfContents toc={blog.toc.content} github={blog.github} shortenSlug={blog.shortenSlug} />
          )}
        </div>
      </div>
    </main>
  );
}