"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    industry: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Normally handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for your enquiry. We will get back to you shortly.");
    setFormData({ name: "", company: "", industry: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="bg-white py-24 md:py-32">
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
              Tell us about your floor, your workflow, and your constraints. We&apos;ll
              come back with a deployment plan — not a brochure.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <span className="text-[24px] mr-4 leading-none">📧</span>
                <div>
                  <h4 className="font-heading font-bold text-[#1A1A1A] text-[18px]">Email</h4>
                  <a href="mailto:info@transista.in" className="text-[#4A4A4A] hover:text-[#1A1A1A] transition-colors">
                    info@transista.in
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-[24px] mr-4 leading-none">📞</span>
                <div>
                  <h4 className="font-heading font-bold text-[#1A1A1A] text-[18px]">Phone</h4>
                  <a href="tel:+919367952877" className="text-[#4A4A4A] hover:text-[#1A1A1A] transition-colors">
                    +91 93679 52877
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-[24px] mr-4 leading-none">📍</span>
                <div>
                  <h4 className="font-heading font-bold text-[#1A1A1A] text-[18px]">Location</h4>
                  <p className="text-[#4A4A4A] max-w-[250px]">
                    SRM TRP Engineering College, Trichy,<br />
                    Tamil Nadu, India
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column (Form) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <form onSubmit={handleSubmit} className="bg-[#F5F5F5] p-8 md:p-10 rounded-lg">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-[#1A1A1A] font-medium mb-2 text-[16px]">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#D0D0D0] rounded focus:outline-none focus:border-[#1A1A1A] bg-white text-[#1A1A1A]"
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-[#1A1A1A] font-medium mb-2 text-[16px]">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#D0D0D0] rounded focus:outline-none focus:border-[#1A1A1A] bg-white text-[#1A1A1A]"
                  />
                </div>

                <div>
                  <label htmlFor="industry" className="block text-[#1A1A1A] font-medium mb-2 text-[16px]">
                    Industry
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    required
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#D0D0D0] rounded focus:outline-none focus:border-[#1A1A1A] bg-white text-[#1A1A1A] appearance-none"
                  >
                    <option value="" disabled>Select an industry</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Warehousing">Warehousing</option>
                    <option value="Education">Education</option>
                    <option value="Inspection">Inspection</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-[#1A1A1A] font-medium mb-2 text-[16px]">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#D0D0D0] rounded focus:outline-none focus:border-[#1A1A1A] bg-white text-[#1A1A1A] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1A1A1A] text-white py-4 rounded hover:bg-[#2B2B2B] transition-colors font-medium text-[18px] mt-4"
                >
                  Send Deployment Enquiry
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
