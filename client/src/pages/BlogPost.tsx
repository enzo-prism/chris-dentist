import { useMemo } from "react";
import { RouteComponentProps, useLocation } from "wouter";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import MetaTags from "@/components/common/MetaTags";
import { pageDescriptions, pageTitles } from "@/lib/metaContent";
import { ogImages } from "@/lib/ogImages";
import OptimizedImage from "@/components/seo/OptimizedImage";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

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
          <h1 className="text-4xl font-heading font-bold text-[#333333] mb-8">{post.title}</h1>
          {post.image ? (
            <div className="mb-10 rounded-2xl overflow-hidden">
              <OptimizedImage
                src={post.image}
                alt={post.title}
                className="w-full h-[420px] object-cover"
              />
            </div>
          ) : null}
          <article className="prose prose-lg max-w-none">
            {post.content.split(/\n\n+/).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </article>
        </div>
      </section>
    </>
  );
};

export default BlogPost;
