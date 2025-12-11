import { useMemo } from "react";
import { RouteComponentProps, useLocation } from "wouter";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import MetaTags from "@/components/common/MetaTags";
import { pageDescriptions, pageTitles } from "@/lib/metaContent";
import { ogImages } from "@/lib/ogImages";
import OptimizedImage from "@/components/seo/OptimizedImage";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import StructuredData from "@/components/seo/StructuredData";
import { absoluteUrl } from "@/lib/structuredData";
import StructuredData from "@/components/seo/StructuredData";
import { absoluteUrl } from "@/lib/structuredData";

interface Params {
  slug: string;
}

const BlogPost = ({ params }: RouteComponentProps<Params>) => {
  const { slug } = params ?? { slug: "" };
  const { posts, isLoading } = useBlogPosts();
  const [, setLocation] = useLocation();

  const post = useMemo(() => {
    return posts.find((candidate) => candidate.slug === slug);
  }, [posts, slug]);

  const pageTitle = post ? `${post.title} | Dr. Christopher Wong DDS` : pageTitles.blog;
  const pageDescription = post?.content
    ? `${post.content.slice(0, 160)}${post.content.length > 160 ? "…" : ""}`
    : pageDescriptions.blog;
  const pageUrl = absoluteUrl(`/blog/${slug}`);
  const blogSchema = post
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: pageDescription,
        image: post.image,
        datePublished: post.date,
        dateModified: post.date,
        author: {
          "@type": "Person",
          name: "Dr. Christopher B. Wong",
        },
        publisher: {
          "@type": "Organization",
          name: "Christopher B. Wong, DDS",
          logo: {
            "@type": "ImageObject",
            url: absoluteUrl("/favicon/apple-touch-icon.png"),
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": pageUrl,
        },
        url: pageUrl,
      }
    : null;
  const pageUrl = absoluteUrl(`/blog/${slug}`);
  const blogSchema = post
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: pageDescription,
        image: post.image,
        datePublished: post.date,
        dateModified: post.date,
        author: {
          "@type": "Person",
          name: "Dr. Christopher B. Wong",
        },
        publisher: {
          "@type": "Organization",
          name: "Christopher B. Wong, DDS",
          logo: {
            "@type": "ImageObject",
            url: absoluteUrl("/favicon/apple-touch-icon.png"),
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": pageUrl,
        },
        url: pageUrl,
      }
    : null;

  const parsedContent = useMemo(() => {
    if (!post?.content) return [];
    const lines = post.content
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const blocks: React.ReactNode[] = [];
    let bulletList: string[] | null = null;
    let orderedList: string[] | null = null;

    const flushLists = () => {
      if (bulletList) {
        blocks.push(
          <ul
            key={`ul-${blocks.length}`}
            className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed"
          >
            {bulletList.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>,
        );
      }
      if (orderedList) {
        blocks.push(
          <ol
            key={`ol-${blocks.length}`}
            className="list-decimal pl-6 space-y-2 text-gray-700 leading-relaxed"
          >
            {orderedList.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ol>,
        );
      }
      bulletList = null;
      orderedList = null;
    };

    const isHeading = (line: string) => {
      const wordCount = line.split(/\s+/).length;
      return /[:?]$/.test(line) || wordCount <= 7;
    };

    lines.forEach((line) => {
      if (/^-\s+/.test(line)) {
        orderedList = null;
        bulletList = bulletList ?? [];
        bulletList.push(line.replace(/^-\s+/, ""));
        return;
      }

      if (/^\d+\)\s+/.test(line)) {
        bulletList = null;
        orderedList = orderedList ?? [];
        orderedList.push(line.replace(/^\d+\)\s+/, ""));
        return;
      }

      flushLists();

      if (isHeading(line)) {
        blocks.push(
          <h2
            key={`h2-${blocks.length}`}
            className="text-2xl sm:text-3xl font-heading font-semibold text-[#1F2933] pt-6"
          >
            {line.replace(/[:?]$/, "")}
          </h2>,
        );
      } else {
        blocks.push(
          <p
            key={`p-${blocks.length}`}
            className="text-base sm:text-lg text-gray-700 leading-relaxed"
          >
            {line}
          </p>,
        );
      }
    });

    flushLists();
    return blocks;
  }, [post?.content]);

  if (isLoading) {
    return (
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-pulse space-y-6">
            <div className="h-6 bg-gray-200 rounded w-1/3" />
            <div className="h-10 bg-gray-200 rounded w-2/3" />
            <div className="h-96 bg-gray-200 rounded" />
          </div>
        </div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <p className="text-gray-500">We couldn't find that article.</p>
          <Button onClick={() => setLocation("/blog")} className="bg-primary text-white">
            Back to Blog
          </Button>
        </div>
      </section>
    );
  }

  return (
    <>
      <MetaTags title={pageTitle} description={pageDescription} image={post.image || ogImages.blog} />
      {blogSchema && <StructuredData data={blogSchema} />}
      <section className="bg-[#F5F9FC] py-12">
        <div className="max-w-5xl mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => setLocation("/blog")}
            className="mb-6 inline-flex items-center text-primary hover:bg-primary/5"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog
          </Button>
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{post.date}</span>
            {post.readTime ? (
              <>
                <span className="mx-2">•</span>
                <Clock className="h-4 w-4 mr-2" />
                <span>{post.readTime} min read</span>
              </>
            ) : null}
            {post.category ? (
              <>
                <span className="mx-2">•</span>
                <Tag className="h-4 w-4 mr-2" />
                <span>{post.category}</span>
              </>
            ) : null}
          </div>
          <h1 className="text-4xl font-heading font-bold text-[#333333] mb-4 sm:mb-6">{post.title}</h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-8">
            Practical, patient-friendly guidance from Dr. Wong and team—built to help you act quickly and confidently.
          </p>
          {post.image ? (
            <div className="mb-10 rounded-2xl overflow-hidden shadow-lg border border-white/70">
              <OptimizedImage
                src={post.image}
                alt={post.title}
                className="w-full h-[420px] object-cover"
              />
            </div>
          ) : null}
          <article
            className={cn(
              "bg-white rounded-3xl shadow-xl border border-[#E5E7EB]/80",
              "p-6 sm:p-8 space-y-4 sm:space-y-6 leading-relaxed text-gray-700",
            )}
          >
            <div className="space-y-4 sm:space-y-5">{parsedContent}</div>
          </article>
        </div>
      </section>
    </>
  );
};

export default BlogPost;
