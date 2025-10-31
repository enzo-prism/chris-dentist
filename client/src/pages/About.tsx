import { CheckCircle, Award, UserCheck, Shield, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import OfficeGallerySection from "@/components/sections/OfficeGallerySection";
import { drWongImages } from "@/lib/imageUrls";
import { ogImages } from "@/lib/ogImages";
import { pageTitles, pageDescriptions } from "@/lib/metaContent";
import * as data from "@/lib/data";
import MetaTags from "@/components/common/MetaTags";
import StructuredData from "@/components/seo/StructuredData";
import CanonicalUrl from "@/components/seo/CanonicalUrl";
import { useState } from "react";
import VideoModal from "@/components/common/VideoModal";
import OptimizedImage from "@/components/seo/OptimizedImage";
import { motion } from "framer-motion";

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
      <StructuredData type="dentist" />
      <CanonicalUrl path="/about" />
      {/* Hero Section - Mobile First */}
      <section className="bg-[#F5F9FC] py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-[#333333] mb-4 sm:mb-6 leading-tight">About Our Practice</h1>
            <p className="text-lg sm:text-xl text-[#333333] max-w-3xl mx-auto leading-relaxed">Get to know Dr. Christopher B. Wong and our dedicated team of dental professionals committed to providing exceptional care in Palo Alto.</p>
          </div>
        </div>
      </section>

      {/* Doctor Profile - Mobile First */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-white to-[#F5F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-[#333333] mb-3 leading-tight">Dr. Christopher B. Wong, DDS</h2>
            <div className="w-16 sm:w-24 h-1 bg-primary mx-auto"></div>
          </div>
          
          <motion.div 
            className="bg-white rounded-3xl shadow-lg overflow-hidden border border-[#E0E6EF]/70"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid md:grid-cols-5">
              <motion.div 
                className="relative bg-gradient-to-br from-[#F5F9FC] via-[#EEF4FB] to-[#D7E8FF] p-6 sm:p-10 flex items-center justify-center md:col-span-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative w-full max-w-sm sm:max-w-md">
                  <div className="absolute -inset-4 hidden md:block rounded-[32px] bg-white/40 blur-md"></div>
                  <div className="relative rounded-[28px] bg-white/70 backdrop-blur-sm shadow-xl border border-white/60 p-4 sm:p-6 flex items-center justify-center">
                    <OptimizedImage
                      src="https://cdn.prod.website-files.com/6647633c9b317c62a46de335/67e986d38336152373ca94ad_Frame%201-min.png"
                      alt="Portrait of Dr. Christopher B. Wong"
                      className="w-full h-full object-contain max-h-[520px]"
                    />
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="md:col-span-3 p-6 sm:p-8 md:p-10 space-y-8"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="space-y-4 text-left">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-1 text-xs sm:text-sm font-semibold tracking-wide">
                    <span>Meet Dr. Wong</span>
                  </div>
                  <p className="text-[#333333] leading-relaxed text-sm sm:text-base">
                    {data.doctorInfo.bio}
                  </p>
                </div>
                
                <div className="grid gap-3 sm:gap-4">
                  {[
                    { icon: Award, text: "University of the Pacific Arthur A. Dugoni School of Dentistry Graduate" },
                    { icon: CheckCircle, text: "American Dental Association" },
                    { icon: CheckCircle, text: "California Dental Association" },
                    { icon: CheckCircle, text: "Santa Clara County Dental Society" }
                  ].map((credential, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start gap-3 rounded-2xl border border-[#E0E6EF] bg-[#F7FAFE] px-4 py-3 sm:px-5 sm:py-4"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
                    >
                      <credential.icon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-[#333333] text-sm sm:text-base leading-relaxed">{credential.text}</span>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div 
                  className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <div className="text-left bg-[#F5F9FC] border border-[#E0E6EF] rounded-2xl px-5 py-4">
                    <p className="text-[#666666] text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold">Experience</p>
                    <p className="text-lg sm:text-xl font-heading text-[#333333]">Practicing since 2018</p>
                  </div>
                  
                  <Button 
                    onClick={() => setIsVideoModalOpen(true)}
                    className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2 w-full sm:w-auto justify-center text-sm sm:text-base px-4 sm:px-6 py-3 hover:scale-105 transition-transform duration-200"
                  >
                    <Play className="h-4 w-4" />
                    Watch Interview with Dr. Wong
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Approach - Mobile First */}
      <section className="py-12 sm:py-16 bg-[#F5F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-[#333333] mb-3 sm:mb-4 leading-tight">Our Approach to Dental Care</h2>
            <p className="text-[#333333] max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">We believe in providing comprehensive, personalized dental care that puts your comfort and well-being first.</p>
            <div className="w-16 sm:w-24 h-1 bg-primary mx-auto mt-4"></div>
          </div>

          {/* Mobile-first: Stack cards vertically on mobile, then grid on larger screens */}
          <div className="space-y-6 sm:space-y-8 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-8">
            <motion.div 
              className="bg-white p-6 sm:p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <UserCheck className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-heading text-[#333333] mb-2 sm:mb-3">Patient-Centered Care</h3>
              <p className="text-[#333333] text-sm sm:text-base leading-relaxed">We take the time to listen to your concerns and goals, creating personalized treatment plans that address your specific needs.</p>
            </motion.div>

            <motion.div 
              className="bg-white p-6 sm:p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="rounded-full bg-[#00AA90] bg-opacity-10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-[#00AA90]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-heading text-[#333333] mb-2 sm:mb-3">Excellence in Quality</h3>
              <p className="text-[#333333] text-sm sm:text-base leading-relaxed">We use only the highest quality materials and latest techniques to ensure lasting results that look natural and feel comfortable.</p>
            </motion.div>

            <motion.div 
              className="bg-white p-6 sm:p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 md:col-span-2 lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="rounded-full bg-[#E63946] bg-opacity-10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-[#E63946]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-heading text-[#333333] mb-2 sm:mb-3">Comprehensive Care</h3>
              <p className="text-[#333333] text-sm sm:text-base leading-relaxed">From preventive cleanings to complex restorations, we provide a full range of services to meet your oral health needs in one location.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet Our Team - Mobile First */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-[#333333] mb-3 sm:mb-4 leading-tight">Meet Our Team</h2>
            <p className="text-[#333333] max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">Our skilled professionals work together to provide comprehensive, compassionate dental care to our community.</p>
            <div className="w-16 sm:w-24 h-1 bg-primary mx-auto mt-4"></div>
          </div>

          {/* Mobile-first: Stack cards on mobile, then responsive grid */}
          <div className="space-y-6 sm:space-y-8 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 lg:gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <OptimizedImage
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 sm:h-56 object-cover"
                />
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold font-heading text-[#333333] mb-1">{member.name}</h3>
                  <p className="text-[#00AA90] font-semibold mb-3 text-sm sm:text-base">{member.role}</p>
                  <p className="text-[#333333] text-sm sm:text-base leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
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
