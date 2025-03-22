import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { BlogPost } from "@shared/schema";

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard = ({ post }: BlogPostCardProps) => {
  return (
    <Card className="h-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300" id={post.slug}>
      <div className="h-48 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardContent className="p-6">
        <div className="text-sm text-gray-500 mb-2">{post.date}</div>
        <h3 className="text-xl font-bold font-heading text-[#333333] mb-2">{post.title}</h3>
        <p className="text-[#333333] mb-4">{post.content}</p>
        <Link href={`/blog#${post.slug}`}>
          <div className="text-primary font-semibold hover:text-blue-700 flex items-center group transition-colors cursor-pointer">
            Read Article
            <ArrowRight className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default BlogPostCard;
