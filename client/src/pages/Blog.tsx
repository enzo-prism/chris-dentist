import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Tag, Clock, Calendar, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import BlogPostCard from "@/components/common/BlogPostCard";
import { BlogPost } from "@shared/schema";
import { useState } from "react";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  // Filter blog posts based on search query and selected category
  const filteredPosts = blogPosts?.filter(post => {
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || true; // In a real app, posts would have categories

    return matchesSearch && matchesCategory;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the filter above
  };

  const categories = [
    { id: "all", name: "All Posts" },
    { id: "oral-health", name: "Oral Health" },
    { id: "dental-procedures", name: "Dental Procedures" },
    { id: "pediatric", name: "Children's Dentistry" },
    { id: "cosmetic", name: "Cosmetic Dentistry" }
  ];

  // Featured blog post (in a real app, this could be marked as featured in the database)
  const featuredPost = blogPosts?.[0];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#F5F9FC] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-[#333333] mb-6">Dental Health Blog</h1>
            <p className="text-xl text-[#333333] max-w-3xl mx-auto">Stay informed with the latest in dental health news, tips, and advances in dental technology.</p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {!isLoading && featuredPost && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-[#333333] mb-4">Featured Article</h2>
              <div className="w-24 h-1 bg-primary mx-auto"></div>
            </div>
            
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{featuredPost.date}</span>
                    <span className="mx-2">•</span>
                    <Tag className="h-4 w-4 mr-2" />
                    <span>Oral Health</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold font-heading text-[#333333] mb-4">{featuredPost.title}</h3>
                  <p className="text-[#333333] mb-6">{featuredPost.content}</p>
                  <div className="mt-auto">
                    <Link href={`/blog#${featuredPost.slug}`}>
                      <Button className="bg-primary text-white font-semibold hover:bg-blue-700 inline-flex items-center">
                        Read Full Article
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts List */}
      <section className="py-16 bg-[#F5F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-start md:space-x-8">
            {/* Sidebar - Categories and Search */}
            <div className="md:w-1/4 mb-8 md:mb-0">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-bold font-heading text-[#333333] mb-4">Search Articles</h3>
                <form onSubmit={handleSearch} className="flex">
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-r-none"
                  />
                  <Button type="submit" className="rounded-l-none bg-primary hover:bg-blue-700">
                    <Search className="h-4 w-4" />
                  </Button>
                </form>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold font-heading text-[#333333] mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <button
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex items-center w-full text-left py-2 px-3 rounded-md hover:bg-[#F5F9FC] transition-colors ${
                          selectedCategory === category.id 
                            ? 'bg-primary text-white hover:bg-primary' 
                            : 'text-[#333333]'
                        }`}
                      >
                        <ArrowRight className={`h-4 w-4 mr-2 ${
                          selectedCategory === category.id ? 'text-white' : 'text-primary'
                        }`} />
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h3 className="text-xl font-bold font-heading text-[#333333] mb-4">Subscribe</h3>
                <p className="text-[#333333] mb-4">Get the latest dental health tips and news delivered to your inbox.</p>
                <Link href="/#newsletter">
                  <Button className="w-full bg-[#00AA90] hover:bg-teal-700 text-white">
                    Subscribe to Newsletter
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Main Content - Blog Posts */}
            <div className="md:w-3/4">
              <Tabs defaultValue="recent" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="recent">Recent Posts</TabsTrigger>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                </TabsList>
                
                <TabsContent value="recent">
                  {isLoading ? (
                    <div className="grid md:grid-cols-2 gap-8">
                      {[...Array(4)].map((_, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                          <div className="w-full h-48 bg-gray-200"></div>
                          <div className="p-6">
                            <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      {filteredPosts?.length ? (
                        <div className="grid md:grid-cols-2 gap-8">
                          {filteredPosts.map((post) => (
                            <BlogPostCard key={post.id} post={post} />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 bg-white rounded-lg shadow-md">
                          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-xl font-bold font-heading text-[#333333] mb-2">No Articles Found</h3>
                          <p className="text-[#333333]">Try adjusting your search or category selection.</p>
                        </div>
                      )}
                    </>
                  )}
                </TabsContent>
                
                <TabsContent value="popular">
                  {isLoading ? (
                    <div className="grid md:grid-cols-2 gap-8">
                      {[...Array(4)].map((_, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                          <div className="w-full h-48 bg-gray-200"></div>
                          <div className="p-6">
                            <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* In a real app, you might have a way to track popular posts */}
                      {filteredPosts?.slice(0, 4).map((post) => (
                        <BlogPostCard key={post.id} post={post} />
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">Stay Informed</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Subscribe to our newsletter to receive dental health tips, special offers, and the latest industry news.</p>
          <Link href="/#newsletter">
            <Button className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3 rounded-md">
              Subscribe Now
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Blog;
