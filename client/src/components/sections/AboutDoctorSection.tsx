import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { drWongImages } from '@/lib/imageUrls';

const AboutDoctorSection: React.FC = () => {
  return (
    <section id="about-doctor" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">About Dr. Christopher B. Wong</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>
        
        <div className="md:flex items-center">
          <div className="md:w-1/3 mb-8 md:mb-0">
            <img 
              src={drWongImages.drWongWaiting}
              alt="Dr. Wong's dental office waiting area" 
              className="rounded-lg shadow-xl mx-auto"
            />
          </div>
          <div className="md:w-2/3 md:pl-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Experienced Dental Care You Can Trust</h3>
            <p className="text-gray-700 mb-4">
              Dr. Christopher Wong has over 15 years of experience in comprehensive dental care, with specialized
              training in cosmetic dentistry, dental implants, and minimally invasive techniques. After graduating with
              honors from the University of California, San Francisco School of Dentistry, he completed advanced
              training at Stanford Medical Center.
            </p>
            <p className="text-gray-700 mb-6">
              His practice philosophy centers on providing personalized care using evidence-based approaches and
              cutting-edge technology to ensure the best outcomes for his patients.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mt-1 mr-2" />
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
            
            <div className="mt-8">
              <Link href="/about">
                <Button className="bg-primary text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700">
                  Meet Our Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutDoctorSection;