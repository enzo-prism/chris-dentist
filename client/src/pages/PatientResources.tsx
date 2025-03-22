import { useState } from "react";
import { ArrowRight, FileText, Download, Calendar, CreditCard, Shield, CheckCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import PatientForm from "@/components/forms/PatientForm";

const PatientResources = () => {
  const [activeTab, setActiveTab] = useState("forms");

  const faqs = [
    {
      question: "What should I expect during my first visit?",
      answer: "During your first visit, Dr. Wong will perform a comprehensive examination including digital X-rays, oral cancer screening, and gum disease evaluation. You'll discuss your dental history, concerns, and goals. We'll create a personalized treatment plan and schedule any necessary follow-up appointments."
    },
    {
      question: "How often should I have a dental checkup?",
      answer: "Most patients benefit from professional cleanings and checkups every six months. However, Dr. Wong may recommend more frequent visits if you have specific oral health concerns like gum disease, a history of cavities, or certain medical conditions."
    },
    {
      question: "What payment options do you offer?",
      answer: "We accept most major insurance plans and offer various payment options including credit cards, flexible spending accounts, and CareCredit financing. Our team will help you understand your coverage and maximize your benefits. Please contact our office for specific details about your insurance plan."
    },
    {
      question: "Do you offer emergency dental services?",
      answer: "Yes, we provide emergency dental care. If you're experiencing severe pain, swelling, bleeding, or have a knocked-out tooth, please call our office immediately. We reserve time in our schedule for emergency appointments and will do our best to see you the same day."
    },
    {
      question: "What COVID-19 safety measures are in place?",
      answer: "We follow all CDC, ADA, and local health department guidelines to ensure your safety. Our measures include enhanced sterilization procedures, personal protective equipment for staff, pre-screening questions, temperature checks, and social distancing in waiting areas. We've also installed medical-grade air purifiers throughout the office."
    },
    {
      question: "Do you offer virtual consultations?",
      answer: "Yes, we offer virtual consultations for certain types of appointments. This service allows you to discuss your concerns with Dr. Wong from the comfort of your home before coming into the office for treatment."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#F5F9FC] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-[#333333] mb-6">Patient Resources</h1>
            <p className="text-xl text-[#333333] max-w-3xl mx-auto">Everything you need to make your dental visit smooth and convenient, from patient forms to insurance information.</p>
          </div>
        </div>
      </section>

      {/* Resource Tabs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="forms" onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <TabsTrigger value="forms" className="px-4 py-3">
                  <FileText className="h-5 w-5 mr-2" />
                  Forms
                </TabsTrigger>
                <TabsTrigger value="insurance" className="px-4 py-3">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Insurance
                </TabsTrigger>
                <TabsTrigger value="faq" className="px-4 py-3">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  FAQs
                </TabsTrigger>
                <TabsTrigger value="first-visit" className="px-4 py-3">
                  <Calendar className="h-5 w-5 mr-2" />
                  First Visit
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Forms Tab */}
            <TabsContent value="forms" className="mt-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold font-heading text-[#333333] mb-4">Patient Forms</h2>
                <p className="text-[#333333] max-w-3xl mx-auto">Save time during your visit by completing these forms ahead of time. All forms are HIPAA-compliant and securely processed.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold font-heading text-[#333333] mb-4">Download Forms</h3>
                  <p className="text-[#333333] mb-6">Print and complete these forms at home before your appointment.</p>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 border rounded-md hover:bg-[#F5F9FC] transition-colors">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-primary mr-3" />
                        <span>New Patient Registration</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-blue-50">
                        <Download className="h-4 w-4 mr-1" />
                        PDF
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 border rounded-md hover:bg-[#F5F9FC] transition-colors">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-primary mr-3" />
                        <span>Medical History Form</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-blue-50">
                        <Download className="h-4 w-4 mr-1" />
                        PDF
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 border rounded-md hover:bg-[#F5F9FC] transition-colors">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-primary mr-3" />
                        <span>HIPAA Consent Form</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-blue-50">
                        <Download className="h-4 w-4 mr-1" />
                        PDF
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 border rounded-md hover:bg-[#F5F9FC] transition-colors">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-primary mr-3" />
                        <span>Insurance Information Form</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-blue-50">
                        <Download className="h-4 w-4 mr-1" />
                        PDF
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold font-heading text-[#333333] mb-4">Online Form Submission</h3>
                  <p className="text-[#333333] mb-6">Complete your forms securely online and submit directly to our office.</p>
                  
                  <PatientForm />
                </div>
              </div>
            </TabsContent>

            {/* Insurance Tab */}
            <TabsContent value="insurance" className="mt-6" id="insurance">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold font-heading text-[#333333] mb-4">Insurance & Financial Information</h2>
                <p className="text-[#333333] max-w-3xl mx-auto">We work with most major insurance providers and offer flexible payment options to make dental care accessible.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold font-heading text-[#333333] mb-4">Accepted Insurance Plans</h3>
                  <p className="text-[#333333] mb-6">We accept most major dental insurance plans, including:</p>
                  
                  <div className="grid grid-cols-2 gap-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span>Delta Dental</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span>Cigna</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span>Aetna</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span>MetLife</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span>Guardian</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span>United Healthcare</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span>Blue Cross Blue Shield</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span>Humana</span>
                    </div>
                  </div>

                  <p className="mt-6 text-[#333333]">Not sure if we accept your insurance? Contact our office and our friendly staff will help you determine your coverage.</p>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold font-heading text-[#333333] mb-4">Payment Options</h3>
                  <p className="text-[#333333] mb-6">We offer several payment options to help you receive the dental care you need:</p>
                  
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md hover:bg-[#F5F9FC] transition-colors">
                      <h4 className="font-semibold text-[#333333] mb-1">Credit Cards</h4>
                      <p className="text-sm text-[#333333]">We accept all major credit cards including Visa, MasterCard, American Express, and Discover.</p>
                    </div>
                    
                    <div className="p-4 border rounded-md hover:bg-[#F5F9FC] transition-colors">
                      <h4 className="font-semibold text-[#333333] mb-1">Flexible Spending Accounts (FSA)</h4>
                      <p className="text-sm text-[#333333]">We accept FSA cards for qualified dental procedures and treatments.</p>
                    </div>
                    
                    <div className="p-4 border rounded-md hover:bg-[#F5F9FC] transition-colors">
                      <h4 className="font-semibold text-[#333333] mb-1">CareCredit</h4>
                      <p className="text-sm text-[#333333]">We offer financing through CareCredit, which provides convenient payment plans and promotional financing options.</p>
                    </div>
                    
                    <div className="p-4 border rounded-md hover:bg-[#F5F9FC] transition-colors">
                      <h4 className="font-semibold text-[#333333] mb-1">In-Office Dental Plan</h4>
                      <p className="text-sm text-[#333333]">For patients without insurance, we offer an in-house dental plan with significant savings on preventive care and treatments.</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* FAQ Tab */}
            <TabsContent value="faq" className="mt-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold font-heading text-[#333333] mb-4">Frequently Asked Questions</h2>
                <p className="text-[#333333] max-w-3xl mx-auto">Find answers to common questions about our dental services and procedures.</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left font-semibold text-[#333333]">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-[#333333]">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              <div className="mt-8 text-center">
                <p className="text-[#333333] mb-4">Don't see your question here? Feel free to contact us!</p>
                <Link href="/contact">
                  <Button className="bg-primary text-white font-semibold hover:bg-blue-700">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </TabsContent>

            {/* First Visit Tab */}
            <TabsContent value="first-visit" className="mt-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold font-heading text-[#333333] mb-4">What to Expect on Your First Visit</h2>
                <p className="text-[#333333] max-w-3xl mx-auto">We want your first visit to be comfortable and informative. Here's what you can expect when you visit our office.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Dental consultation" 
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold font-heading text-[#333333] mb-4">During Your First Visit</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3" />
                        <span>Comprehensive dental examination</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3" />
                        <span>Digital X-rays for accurate diagnostics</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3" />
                        <span>Oral cancer screening</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3" />
                        <span>Gum disease evaluation</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3" />
                        <span>Review of dental and medical history</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3" />
                        <span>Discussion of your dental concerns and goals</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3" />
                        <span>Development of a personalized treatment plan</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold font-heading text-[#333333] mb-4">How to Prepare</h3>
                  <p className="text-[#333333] mb-6">To make your first visit as smooth as possible, please:</p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start">
                      <div className="bg-primary bg-opacity-10 rounded-full p-2 mr-4">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#333333] mb-1">Complete Your Forms</h4>
                        <p className="text-sm text-[#333333]">Save time by completing your new patient forms before your appointment, either online or by downloading and bringing them with you.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-primary bg-opacity-10 rounded-full p-2 mr-4">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#333333] mb-1">Bring Your Insurance Information</h4>
                        <p className="text-sm text-[#333333]">Have your dental insurance card and identification ready so we can help maximize your benefits.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-primary bg-opacity-10 rounded-full p-2 mr-4">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#333333] mb-1">Arrive 15 Minutes Early</h4>
                        <p className="text-sm text-[#333333]">This gives you time to check in, complete any remaining paperwork, and get comfortable before your appointment.</p>
                      </div>
                    </div>
                  </div>
                  
                  <Link href="/contact#appointment">
                    <Button className="w-full bg-primary text-white font-semibold hover:bg-blue-700">
                      Schedule Your First Visit
                    </Button>
                  </Link>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#F5F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 md:p-12 bg-primary text-white">
                <div className="flex items-center mb-6">
                  <Shield className="h-8 w-8 mr-4" />
                  <h3 className="text-2xl font-bold font-heading">Patient Privacy</h3>
                </div>
                <p className="mb-6">At Dr. Wong's practice, we take your privacy seriously. All of our forms and communications are HIPAA-compliant, ensuring your personal and medical information remains secure and confidential.</p>
                <p>If you have any questions about our privacy practices or how we handle your information, please don't hesitate to contact our office.</p>
              </div>
              
              <div className="md:w-1/2 p-8 md:p-12">
                <h3 className="text-2xl font-bold font-heading text-[#333333] mb-4">Need Assistance?</h3>
                <p className="text-[#333333] mb-6">Our friendly team is here to help you with any questions about forms, insurance, or preparing for your appointment.</p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-primary mt-1 mr-3" />
                    <span>Call us at (650) 555-1234</span>
                  </div>
                  <div className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-primary mt-1 mr-3" />
                    <span>Email us at info@drwongdental.com</span>
                  </div>
                  <div className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-primary mt-1 mr-3" />
                    <span>Visit our office at 123 University Avenue, Palo Alto, CA 94301</span>
                  </div>
                </div>
                <div className="mt-8">
                  <Link href="/contact">
                    <Button className="bg-primary text-white font-semibold hover:bg-blue-700">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PatientResources;
