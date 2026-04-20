import { CheckCircle, Phone, ShieldCheck, Sparkles } from "lucide-react";
import TypeFormEmbed from "@/components/forms/TypeFormEmbed";
import { officeInfo } from "@/lib/data";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const AppointmentSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-12 sm:py-20 bg-[#F5F9FC]" id="appointments">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeIn}
        >
          <div className="inline-block px-6 py-2 bg-primary text-white rounded-full mb-4">
            <p className="text-sm font-medium">Easy online scheduling</p>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-3">
            Book your dental visit without the runaround
          </h2>
          <p className="text-[#333333] max-w-3xl mx-auto text-sm sm:text-base md:text-lg">
            Use the secure form if you prefer, or skip it and call us now for the fastest help finding an opening.
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-2/5 bg-primary p-6 sm:p-8 lg:p-12 text-white">
              <h2 className="text-xl sm:text-2xl font-bold font-heading mb-4">
                Two easy ways to schedule
              </h2>
              <p className="text-sm sm:text-base text-blue-100 mb-6 leading-relaxed">
                Start online if that’s easiest, or call the office if you want a human to help with timing,
                urgency, insurance questions, or coordinating family visits.
              </p>

              <div className="grid gap-3 mb-8">
                <a href={`tel:${officeInfo.phoneE164}`}>
                  <Button className="w-full justify-center bg-white text-primary hover:bg-blue-50 font-semibold py-6 text-base">
                    <Phone className="h-4 w-4 mr-2" />
                    Call {officeInfo.phone}
                  </Button>
                </a>
                <div className="rounded-2xl border border-white/15 bg-blue-950/25 p-4 text-sm text-blue-100">
                  Prefer the form? It takes a couple of minutes and we’ll follow up to confirm the best time.
                </div>
              </div>

              <div className="mb-8 space-y-5">
                <div className="flex items-start">
                  <div className="bg-white p-2 rounded-full mr-4">
                    <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg">Conservative, comfort-first care</h4>
                    <p className="text-sm text-blue-100">
                      We explain options clearly and avoid pushing treatment you don’t need.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white p-2 rounded-full mr-4">
                    <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg">New patients welcome</h4>
                    <p className="text-sm text-blue-100">
                      Cleanings, emergencies, Invisalign consults, cosmetic care, and second opinions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white p-2 rounded-full mr-4">
                    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg">Same-day help when possible</h4>
                    <p className="text-sm text-blue-100">
                      Especially for urgent pain, broken teeth, and other time-sensitive problems.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-blue-900 bg-opacity-50 rounded-lg mb-6">
                <h3 className="font-bold mb-3 text-sm sm:text-base">Office hours</h3>
                <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                  <div className="font-medium">Monday - Thursday</div>
                  <div>{officeInfo.hours.monday}</div>
                  <div className="font-medium">Friday</div>
                  <div>{officeInfo.hours.friday}</div>
                  <div className="font-medium">Saturday - Sunday</div>
                  <div>Closed</div>
                </div>
              </div>

              <div className="flex items-center">
                <a
                  href={`tel:${officeInfo.phoneE164}`}
                  className="flex items-center text-base sm:text-lg font-bold hover:text-blue-200 transition-colors"
                >
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <span>{officeInfo.phone}</span>
                </a>
              </div>
            </div>

            <div className="lg:w-3/5 p-6 sm:p-8 lg:p-12">
              <div className="max-w-lg mx-auto">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 mb-5 text-sm text-slate-700">
                  Want the fastest answer? <a href={`tel:${officeInfo.phoneE164}`} className="font-semibold text-primary hover:underline">Call the office now</a>. If you’d rather request online, the secure form below works well too.
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-heading text-[#333333] mb-2 sm:mb-4">
                  Request your visit now
                </h3>
                <p className="text-[#333333] mb-6 text-sm sm:text-base">
                  Share a few details and our team will confirm the best appointment time.
                </p>

                <TypeFormEmbed
                  formId="01JPZ57W1F3352Q1X0XK6P9SNV"
                  analyticsLocation="appointment_section"
                  className="min-h-[320px] sm:min-h-[400px] md:min-h-[450px] w-full shadow-md rounded-lg"
                />

                <p className="text-xs text-gray-500 mt-4 text-center">
                  Need help right away? Call us directly at {officeInfo.phone}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AppointmentSection;
