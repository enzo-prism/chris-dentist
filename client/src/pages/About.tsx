import { CheckCircle, Award, UserCheck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const About = () => {
  const teamMembers = [
    {
      name: "Dr. Christopher B. Wong",
      role: "Lead Dentist",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      bio: "Dr. Wong has over 15 years of experience in comprehensive dental care, with specialized training in cosmetic dentistry, dental implants, and minimally invasive techniques."
    },
    {
      name: "Dr. Maria Rodriguez",
      role: "Orthodontist",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      bio: "Dr. Rodriguez specializes in orthodontics and has been transforming smiles for over 10 years. She is an expert in both traditional braces and clear aligner therapy."
    },
    {
      name: "Sarah Johnson",
      role: "Dental Hygienist",
      image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      bio: "Sarah has been a dental hygienist for 8 years and is passionate about preventive care and patient education. She's known for her gentle technique and thorough cleanings."
    },
    {
      name: "Michael Chen",
      role: "Office Manager",
      image: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      bio: "Michael ensures that our office runs smoothly so our clinical team can focus on providing exceptional patient care. He handles scheduling, insurance, and patient questions."
    }
  ];

  return (
    <>
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
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex items-center">
            <div className="md:w-1/3 mb-8 md:mb-0">
              <img 
                src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Dr. Christopher B. Wong" 
                className="rounded-lg shadow-xl mx-auto"
              />
            </div>
            <div className="md:w-2/3 md:pl-12">
              <h2 className="text-3xl font-bold font-heading text-[#333333] mb-4">Dr. Christopher B. Wong, DDS</h2>
              <p className="text-[#333333] mb-4">Dr. Christopher Wong has over 15 years of experience in comprehensive dental care, with specialized training in cosmetic dentistry, dental implants, and minimally invasive techniques. After graduating with honors from the University of California, San Francisco School of Dentistry, he completed advanced training at Stanford Medical Center.</p>
              <p className="text-[#333333] mb-4">His practice philosophy centers on providing personalized care using evidence-based approaches and cutting-edge technology to ensure the best outcomes for his patients. Dr. Wong regularly attends continuing education courses to stay at the forefront of dental innovations.</p>
              <p className="text-[#333333] mb-6">Outside of the office, Dr. Wong is an avid cyclist and enjoys spending time with his family in the beautiful Bay Area. He's also involved in community outreach programs that provide dental care to underserved populations.</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <Award className="h-5 w-5 text-primary mt-1 mr-2" />
                  <span>UCSF School of Dentistry Graduate</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 mr-2" />
                  <span>American Dental Association</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 mr-2" />
                  <span>California Dental Association</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 mr-2" />
                  <span>Academy of Cosmetic Dentistry</span>
                </div>
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
              <div className="rounded-full bg-primary bg-opacity-10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <UserCheck className="h-6 w-6 text-primary" />
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

      {/* Our Office */}
      <section className="py-16 bg-[#F5F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-[#333333] mb-4">Our Modern Dental Office</h2>
            <p className="text-[#333333] max-w-3xl mx-auto">Designed with your comfort in mind, our office features state-of-the-art equipment in a welcoming environment.</p>
            <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <img 
              src="https://images.unsplash.com/photo-1629909614088-d6d7a3a85395?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Reception area" 
              className="rounded-lg shadow-md w-full h-64 object-cover"
            />
            <img 
              src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Treatment room" 
              className="rounded-lg shadow-md w-full h-64 object-cover"
            />
            <img 
              src="https://images.unsplash.com/photo-1629909615780-f01004712827?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Dental equipment" 
              className="rounded-lg shadow-md w-full h-64 object-cover"
            />
          </div>

          <div className="text-center mt-12">
            <Link href="/contact#appointment">
              <Button className="bg-primary text-white font-semibold px-8 py-3 rounded-md hover:bg-blue-700">
                Schedule Your Visit
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
