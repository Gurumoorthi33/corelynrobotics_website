"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    industry: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", company: "", phone: "", industry: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const inputClass =
    "w-full px-4 py-3 border border-[#D0D0D0] rounded-lg focus:outline-none focus:border-[#2DBD6E] bg-white text-[#1A1A1A] text-[16px] transition-colors";

  return (
    <section id="contact" className="bg-[#F5F5F5] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2 className="font-heading font-bold text-[36px] md:text-[48px] leading-[1.1] text-[#1A1A1A] mb-6">
              Have an Automation Challenge?
            </h2>
            <p className="text-[18px] text-[#4A4A4A] leading-[1.7] mb-12 max-w-lg">
              Tell us about your floor, your workflow, and your constraints. We&apos;ll come back with a deployment plan — not a brochure.
            </p>

            <div className="space-y-8">
              <ContactDetail
                icon={<Mail className="w-5 h-5" />}
                label="Email"
                value="info@transista.in"
                href="mailto:info@transista.in"
              />
              <ContactDetail
                icon={<Phone className="w-5 h-5" />}
                label="Phone"
                value="+91 93679 52877"
                href="tel:+919367952877"
              />
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white border border-[#EEEEEE] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-[#1A1A1A]" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-[#1A1A1A] text-[17px] mb-1">Location</h4>
                  <p className="text-[#4A4A4A] text-[16px] leading-[1.6]">
                    SRM TRP Engineering College<br />
                    Trichy, Tamil Nadu, India
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-white border border-[#EEEEEE] rounded-xl">
              <p className="text-[15px] text-[#4A4A4A] leading-[1.6]">
                <strong className="text-[#1A1A1A]">Typical response time: 24 hours.</strong><br />
                For urgent deployment enquiries, call directly. We cover Coimbatore, Trichy, Chennai, and surrounding industrial corridors.
              </p>
            </div>
          </motion.div>

          {/* Right Column (Form) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            {submitted ? (
              <div className="bg-white p-10 rounded-xl border border-[#EEEEEE] flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                <div className="w-16 h-16 bg-[#2DBD6E] rounded-full flex items-center justify-center mb-6">
                  <span className="text-white text-2xl">✓</span>
                </div>
                <h3 className="font-heading font-bold text-[28px] text-[#1A1A1A] mb-4">Enquiry Received</h3>
                <p className="text-[18px] text-[#4A4A4A] leading-[1.7] max-w-sm">
                  We&apos;ll review your requirements and get back to you within 24 hours with a deployment plan.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-[#4A4A4A] underline text-[15px] hover:text-[#1A1A1A] transition-colors"
                >
                  Submit another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-xl border border-[#EEEEEE]">
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-[#1A1A1A] font-medium mb-2 text-[15px]">
                        Full Name *
                      </label>
                      <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className={inputClass} placeholder="Your name" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-[#1A1A1A] font-medium mb-2 text-[15px]">
                        Email *
                      </label>
                      <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className={inputClass} placeholder="you@company.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="company" className="block text-[#1A1A1A] font-medium mb-2 text-[15px]">
                        Company *
                      </label>
                      <input type="text" id="company" name="company" required value={formData.company} onChange={handleChange} className={inputClass} placeholder="Company name" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-[#1A1A1A] font-medium mb-2 text-[15px]">
                        Phone
                      </label>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="+91 XXXXX XXXXX" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="industry" className="block text-[#1A1A1A] font-medium mb-2 text-[15px]">
                      Industry *
                    </label>
                    <select id="industry" name="industry" required value={formData.industry} onChange={handleChange} className={inputClass}>
                      <option value="" disabled>Select your industry</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Warehousing & Logistics">Warehousing &amp; Logistics</option>
                      <option value="Education & Research">Education &amp; Research</option>
                      <option value="Inspection & Surveillance">Inspection &amp; Surveillance</option>
                      <option value="Defence & Tactical">Defence &amp; Tactical</option>
                      <option value="Mining & Heavy Industry">Mining &amp; Heavy Industry</option>
                      <option value="Agriculture & Outdoor">Agriculture &amp; Outdoor</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-[#1A1A1A] font-medium mb-2 text-[15px]">
                      Describe your automation challenge *
                    </label>
                    <textarea
                      id="message" name="message" required rows={4}
                      value={formData.message} onChange={handleChange}
                      className={`${inputClass} resize-none`}
                      placeholder="Tell us about your floor layout, shift hours, material movement needs, and any constraints..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#2DBD6E] text-white py-4 rounded-lg hover:bg-[#22A05C] transition-colors font-bold text-[17px] mt-2"
                  >
                    Send Deployment Enquiry →
                  </button>

                  <p className="text-[13px] text-[#4A4A4A] text-center">
                    No sales calls. No spam. Just a deployment plan.
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactDetail({ icon, label, value, href }: {
  icon: React.ReactNode; label: string; value: string; href: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 bg-white border border-[#EEEEEE] rounded-full flex items-center justify-center shrink-0 mt-0.5">
        <span className="text-[#1A1A1A]">{icon}</span>
      </div>
      <div>
        <h4 className="font-heading font-bold text-[#1A1A1A] text-[17px] mb-1">{label}</h4>
        <a href={href} className="text-[#4A4A4A] hover:text-[#1A1A1A] transition-colors text-[16px]">
          {value}
        </a>
      </div>
    </div>
  );
}




