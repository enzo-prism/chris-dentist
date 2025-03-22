import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { BlogPost } from "@shared/schema";

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard = ({ post }: BlogPostCardProps) => {
  // Extract category from post if available
  const category = post.category || "Dental Health";
  
  // Function to truncate content for preview
  const truncateContent = (content: string, maxLength: number = 120) => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + '...';
  };

  return (
    <Card 
      className="h-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col" 
      id={post.slug}
    >
      {/* Image container with responsive height */}
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        
        {/* Category Badge */}
        <Badge className="absolute top-3 left-3 bg-primary/90 text-white hover:bg-primary">
          {category}
        </Badge>
      </div>
      
      <CardContent className="p-4 sm:p-6 flex-grow">
        {/* Date with icon */}
        <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-2">
          <Calendar className="h-3.5 w-3.5 mr-1.5" />
          <span>{post.date}</span>
          
          {/* Optional reading time */}
          {post.readTime && (
            <>
              <span className="mx-2">•</span>
              <Clock className="h-3.5 w-3.5 mr-1.5" />
              <span>{post.readTime} min read</span>
            </>
          )}
        </div>
        
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold font-heading text-[#333333] mb-2">{post.title}</h3>
        
        {/* Content preview with line clamp */}
        <p className="text-sm sm:text-base text-[#333333] mb-4 line-clamp-3">
          {truncateContent(post.content)}
        </p>
      </CardContent>
      
      <CardFooter className="px-4 sm:px-6 py-4 border-t border-gray-100">
        <Link href={`/blog#${post.slug}`} className="w-full">
          <div className="text-primary font-semibold hover:text-blue-700 flex items-center group transition-colors cursor-pointer text-sm sm:text-base">
            Read Article
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogPostCard;
