import { CheckCircle, Award, UserCheck, Shield, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import OfficeGallerySection from "@/components/sections/OfficeGallerySection";
import { drWongImages } from "@/lib/imageUrls";
import { ogImages } from "@/lib/ogImages";
import { pageTitles, pageDescriptions } from "@/lib/metaContent";
import * as data from "@/lib/data";
import MetaTags from "@/components/common/MetaTags";
import { useState } from "react";
import VideoModal from "@/components/common/VideoModal";

const About = () => {
  // State for video modal
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const interviewVideoUrl = "https://youtu.be/HrksJeYb02Q";
  
  // Using the team members from shared data
  const { teamMembers: sharedTeamMembers } = data;
  
  // Create a full team with Dr. Wong at the top, using shorter bio for team display
  const teamMembers = [
    {
      name: "Dr. Wong",
      role: "Lead Dentist",
      image: drWongImages.drWongPortrait1,
      bio: "Dr. Christopher B. Wong was born and raised in Sacramento and earned his bachelor's degree in Biology from UC Davis. He graduated from the University of the Pacific School of Dentistry in San Francisco in 2018. He specializes in conservative dentistry, Invisalign®, and implant restoration while practicing ethical and non-invasive care."
    },
    ...sharedTeamMembers
  ];

  return (
    <>
      <MetaTags 
        title={pageTitles.about}
        description={pageDescriptions.about}
        image={ogImages.about}
      />
      {/* Hero Section */}
      <section className="bg-[#F5F9FC] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-[#333333] mb-6">About Our Practice</h1>
            <p className="text-xl text-[#333333] max-w-3xl mx-auto">Get to know Dr. Christopher B. Wong and our dedicated team of dental professionals committed to providing exceptional care in Palo Alto.</p>
          </div>
        </div>
      </section>

      {/* Doctor Profile */}
      <section className="py-16 bg-gradient-to-b from-white to-[#F5F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-[#333333] mb-3">Dr. Christopher B. Wong, DDS</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden md:flex">
            <div className="md:w-2/5">
              <img 
                src="https://cdn.prod.website-files.com/6647633c9b317c62a46de335/67e986d38336152373ca94ad_Frame%201-min.png" 
                alt="Dr. Christopher B. Wong's Dental Office" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="md:w-3/5 p-8 md:p-10">
              <p className="text-[#333333] mb-6 leading-relaxed">
                {data.doctorInfo.bio}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="flex items-center">
                  <div className="text-primary mr-2">
                    <Award className="h-5 w-5" />
                  </div>
                  <span className="text-[#333333]">University of the Pacific Arthur A. Dugoni School of Dentistry Graduate</span>
                </div>
                <div className="flex items-center">
                  <div className="text-primary mr-2">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <span className="text-[#333333]">American Dental Association</span>
                </div>
                <div className="flex items-center">
                  <div className="text-primary mr-2">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <span className="text-[#333333]">California Dental Association</span>
                </div>
                <div className="flex items-center">
                  <div className="text-primary mr-2">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <span className="text-[#333333]">Santa Clara County Dental Society</span>
                </div>
              </div>
              
              {/* Watch Interview CTA */}
              <div className="mt-6">
                <Button 
                  onClick={() => setIsVideoModalOpen(true)}
                  className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
                >
                  <Play className="h-4 w-4" />
                  Watch Interview with Dr. Wong
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 bg-[#F5F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-[#333333] mb-4">Our Approach to Dental Care</h2>
            <p className="text-[#333333] max-w-3xl mx-auto">We believe in providing comprehensive, personalized dental care that puts your comfort and well-being first.</p>
            <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <UserCheck className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold font-heading text-[#333333] mb-2">Patient-Centered Care</h3>
              <p className="text-[#333333]">We take the time to listen to your concerns and goals, creating personalized treatment plans that address your specific needs.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="rounded-full bg-[#00AA90] bg-opacity-10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-[#00AA90]" />
              </div>
              <h3 className="text-xl font-bold font-heading text-[#333333] mb-2">Excellence in Quality</h3>
              <p className="text-[#333333]">We use only the highest quality materials and latest techniques to ensure lasting results that look natural and feel comfortable.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="rounded-full bg-[#E63946] bg-opacity-10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-[#E63946]" />
              </div>
              <h3 className="text-xl font-bold font-heading text-[#333333] mb-2">Comprehensive Care</h3>
              <p className="text-[#333333]">From preventive cleanings to complex restorations, we provide a full range of services to meet your oral health needs in one location.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-[#333333] mb-4">Meet Our Team</h2>
            <p className="text-[#333333] max-w-3xl mx-auto">Our skilled professionals work together to provide comprehensive, compassionate dental care to our community.</p>
            <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold font-heading text-[#333333] mb-1">{member.name}</h3>
                  <p className="text-[#00AA90] font-semibold mb-3">{member.role}</p>
                  <p className="text-[#333333]">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Office Gallery */}
      <OfficeGallerySection />

      {/* Video Modal */}
      <VideoModal 
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={interviewVideoUrl}
      />
    </>
  );
};

export default About;
