import { useQuery } from "@tanstack/react-query";
import { Star, Quote, ThumbsUp, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import TestimonialCard from "@/components/common/TestimonialCard";
import { Testimonial } from "@shared/schema";

const Testimonials = () => {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  // Additional testimonials (these would normally come from the database)
  const additionalTestimonials = [
    {
      name: "David K.",
      location: "Palo Alto, CA",
      rating: 5,
      text: "Dr. Wong completely transformed my smile with his exceptional cosmetic dentistry skills. His attention to detail and artistic approach resulted in veneers that look completely natural. The whole team made me feel comfortable throughout the process.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
    },
    {
      name: "Emma J.",
      location: "Menlo Park, CA",
      rating: 5,
      text: "I brought my 5-year-old son here for his first dental visit, and Dr. Wong was absolutely wonderful with him. He was patient, gentle, and made the experience fun rather than scary. My son now actually looks forward to his dental appointments!",
      image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
    },
    {
      name: "Robert P.",
      location: "Mountain View, CA",
      rating: 5,
      text: "After years of dental anxiety, I finally found a dentist I can trust. Dr. Wong took the time to understand my concerns and worked with me to develop a treatment plan I was comfortable with. His gentle approach and modern pain management techniques made a huge difference.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#F5F9FC] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-[#333333] mb-6">Patient Testimonials</h1>
            <p className="text-xl text-[#333333] max-w-3xl mx-auto">Read what our patients have to say about their experience with Dr. Christopher B. Wong and our dental practice.</p>
          </div>
        </div>
      </section>

      {/* Featured Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-[#333333] mb-4">What Our Patients Say</h2>
            <p className="text-[#333333] max-w-3xl mx-auto">Read honest reviews from real patients who have trusted us with their dental care.</p>
            <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
          </div>
          
          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="flex items-center">
                    <div className="rounded-full bg-gray-200 h-12 w-12 mr-4"></div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-32"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials?.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Quote */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Quote className="h-16 w-16 mx-auto mb-6 opacity-25" />
            <p className="text-2xl md:text-3xl italic font-light max-w-4xl mx-auto mb-8">Dr. Wong is not just a skilled dentist; he's an artist who transformed my smile and gave me back my confidence. His practice combines cutting-edge technology with genuine care for patients.</p>
            <div className="flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" 
                alt="Patient" 
                className="w-12 h-12 rounded-full border-2 border-white mr-4 object-cover"
              />
              <div className="text-left">
                <h4 className="font-semibold">Lisa M.</h4>
                <p className="text-sm opacity-75">Palo Alto, CA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading text-[#333333] mb-4">More Patient Stories</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {additionalTestimonials.map((testimonial, index) => (
              <Card key={index} className="h-full bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="flex text-yellow-400 mb-4">
                    {Array(5).fill(0).map((_, i) => (
                      <Star 
                        key={i} 
                        className="h-5 w-5" 
                        fill={i < testimonial.rating ? "currentColor" : "none"} 
                      />
                    ))}
                  </div>
                  <p className="text-[#333333] italic mb-4">{testimonial.text}</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-16 bg-[#F5F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading text-[#333333] mb-4">Video Testimonials</h2>
            <p className="text-[#333333] max-w-3xl mx-auto">Hear directly from our patients about their experience with Dr. Wong and our team.</p>
            <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                <div className="text-center p-8">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Video Testimonial</p>
                  <p className="text-gray-500 text-sm">Patient sharing their experience with Invisalign treatment</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold font-heading text-[#333333] mb-2">Sarah's Invisalign Journey</h3>
                <p className="text-[#333333] mb-2">Sarah shares her experience with Invisalign treatment and how it transformed her smile without disrupting her busy lifestyle.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                <div className="text-center p-8">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Video Testimonial</p>
                  <p className="text-gray-500 text-sm">Patient discussing their dental implant procedure</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold font-heading text-[#333333] mb-2">John's Dental Implant Story</h3>
                <p className="text-[#333333] mb-2">John discusses his experience with dental implant surgery and how it has improved his quality of life and confidence.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Review Platforms */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading text-[#333333] mb-4">Find Us on Review Platforms</h2>
            <p className="text-[#333333] max-w-3xl mx-auto">Read more reviews or share your own experience on these platforms.</p>
            <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="rounded-full bg-[#F5F9FC] p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <img 
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNERTUyNDYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS15ZWxwIj48cGF0aCBkPSJNMTguMjQxIDEyLjQxYS42NzQuNjc0IDAgMCAwLS42NzMuNjc1YzAgLjM3Mi4zLjY3My42NzMuNjczYS42NzQuNjc0IDAgMCAwIC42NzMtLjY3My42NzQuNjc0IDAgMCAwLS42NzMtLjY3NHoiLz48cGF0aCBkPSJNMTEuNDIxIDEwLjc1NWMwLTEuMDg5LS44MTQtMS43ODktMS44MzItMS43ODlzLTEuODM0LjctMS44MzQgMS43ODljMCAuMTA1LjAxMS4yMDcuMDMzLjMwNWwzLjM3MS0uMDEyYy0uMDg2LS4xMy0uMTM0LS4yOC0uMTM0LS40MyIvPjxwYXRoIGQ9Ik0xOC4yNDEgMTQuNDFhLjY3NC42NzQgMCAwIDAtLjY3My42NzVjMCAuMzcyLjMuNjczLjY3My42NzNhLjY3NC42NzQgMCAwIDAgLjY3My0uNjczLjY3NC42NzQgMCAwIDAtLjY3My0uNjc0eiIvPjxwYXRoIGQ9Ik0xOC4yNDEgMTYuNDFhLjY3NC42NzQgMCAwIDAtLjY3My42NzVjMCAuMzcyLjMuNjczLjY3My42NzNhLjY3NC42NzQgMCAwIDAgLjY3My0uNjczLjY3NC42NzQgMCAwIDAtLjY3My0uNjc0eiIvPjxwYXRoIGQ9Ik0xNS44NCA5Ljc1NWEuNjc0LjY3NCAwIDAgMC0uNjczLjY3NWMwIC4zNzIuMzAxLjY3My42NzQuNjczYS42NzQuNjc0IDAgMCAwIC42NzMtLjY3My42NzQuNjc0IDAgMCAwLS42NzQtLjY3NXoiLz48cGF0aCBkPSJNMTQuMjQgNy4wNzVhLjY3NC42NzQgMCAwIDAtLjY3My42NzVjMCAuMzcyLjMuNjczLjY3My42NzNhLjY3NC42NzQgMCAwIDAgLjY3My0uNjczLjY3NC42NzQgMCAwIDAtLjY3My0uNjc1eiIvPjxwYXRoIGQ9Ik0xMS42MyA3LjI2NWMwIC4zNzEuMy42NzMuNjczLjY3M2EuNjc0LjY3NCAwIDAgMCAuNjc0LS42NzMuNjc0LjY3NCAwIDAgMC0uNjc0LS42NzQuNjc0LjY3NCAwIDAgMC0uNjc0LjY3NHoiLz48cGF0aCBkPSJNMTcgMTAuNWwzLTJWMTloLTlhMyAzIDAgMCAxLTMtM1Y0YTIgMiAwIDAgMSAyLTJoNGwyLjIgMi4yYTMgMyAwIDAgMSAuOCAyLjA0VjkiLz48L3N2Zz4=" 
                  alt="Yelp" 
                  className="h-8 w-8"
                />
              </div>
              <h3 className="text-xl font-bold font-heading text-[#333333] mb-2">Yelp</h3>
              <div className="flex justify-center text-yellow-400 mb-4">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} className="h-5 w-5" fill="currentColor" />
                ))}
              </div>
              <p className="text-[#333333] mb-4">Based on 47 reviews</p>
              <Button variant="outline" className="border-[#DE5246] text-[#DE5246] hover:bg-[#DE5246] hover:text-white">
                <ThumbsUp className="h-4 w-4 mr-2" />
                Read on Yelp
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="rounded-full bg-[#F5F9FC] p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <img 
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM0Mjg1RjQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1nb29nbGUiPjxwYXRoIGQ9Ik0xNy44MiA1QTcgNyAwIDAgMCAxMiAzYTkgOSAwIDAgMCAwIDE4YzcuNSAwIDEyLTYuNSAxMi0xMiAwLS43LS4wOS0xLjUtLjI2LTJIMTJ2NWg2LjJhNSA1IDAgMCAxLTIuMiAzLjRsLS4wMi4wMS0uMDQuMDJBNyA3IDAgMCAwIDIwIDE0LjI1IDguNDggOC40OCAwIDAgMCAyMS4yNSAxMGMwLS44My0uMTMtMS40NS0uMjQtMmgtMy4yeiIvPjxwYXRoIGQ9Ik0xMiA3VjNIMiIvPjxwYXRoIGQ9Ik0xNiAwVjdjLTQtMS0xMCAzLTEwIDN2NFM4IDI0IDEyIDI0YzUtMiA4LTEwIDgtMTAiLz48L3N2Zz4=" 
                  alt="Google" 
                  className="h-8 w-8"
                />
              </div>
              <h3 className="text-xl font-bold font-heading text-[#333333] mb-2">Google</h3>
              <div className="flex justify-center text-yellow-400 mb-4">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} className="h-5 w-5" fill="currentColor" />
                ))}
              </div>
              <p className="text-[#333333] mb-4">Based on 65 reviews</p>
              <Button variant="outline" className="border-[#4285F4] text-[#4285F4] hover:bg-[#4285F4] hover:text-white">
                <ThumbsUp className="h-4 w-4 mr-2" />
                Read on Google
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="rounded-full bg-[#F5F9FC] p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <img 
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMEEwRTMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1oZWFsdGhjYXJlIj48cGF0aCBkPSJNNyAxOGE1IDUgMCAwIDEtMC42LTEwIi8+PHBhdGggZD0iTTE0IDE4YTUgNSAwIDEgMCA3LTciLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjgiIHI9IjIiLz48cGF0aCBkPSJNNSA1YTE0Ljk5IDE0Ljk5IDAgMCAwIDAgMTQiLz48cGF0aCBkPSJNMTkgNWExNC45OSAxNC45OSAwIDAgMSAwIDE0Ii8+PC9zdmc+" 
                  alt="Healthgrades" 
                  className="h-8 w-8"
                />
              </div>
              <h3 className="text-xl font-bold font-heading text-[#333333] mb-2">Healthgrades</h3>
              <div className="flex justify-center text-yellow-400 mb-4">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} className="h-5 w-5" fill="currentColor" />
                ))}
              </div>
              <p className="text-[#333333] mb-4">Based on 32 reviews</p>
              <Button variant="outline" className="border-[#00A0E3] text-[#00A0E3] hover:bg-[#00A0E3] hover:text-white">
                <ThumbsUp className="h-4 w-4 mr-2" />
                Read on Healthgrades
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Share Your Experience */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-6">Share Your Experience</h2>
          <p className="text-white text-xl mb-8 max-w-3xl mx-auto">We value your feedback! Your reviews help us improve our services and help other patients make informed decisions.</p>
          <Link href="/contact">
            <Button className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3 rounded-md">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
