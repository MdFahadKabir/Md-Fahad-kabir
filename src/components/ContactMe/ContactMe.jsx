import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { H2, Paragraph } from "../Common/Typography";
import Button from "../Common/Button";
import InputFeild from "../Common/FloatingLabelInput/InputFeild";
import PhoneNumInput from "../Common/FloatingLabelInput/PhoneNumInput";
import TextArea from "../Common/FloatingLabelInput/TextArea";

gsap.registerPlugin(ScrollTrigger);

export default function ContactMe() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      }
    );
  }, []);

  const onSubmit = async (data) => {
    // Simulate API Call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form Submitted:", data);
    alert("Thanks for your message! I will get back to you soon.");
    reset();
  };

  return (
    <section ref={sectionRef} id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-purple/5 blur-3xl rounded-full translate-x-1/3 z-0"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <h3 className="text-brand-purple font-semibold tracking-wider uppercase text-sm">Get In Touch</h3>
            <H2>Let's Build Something Awesome</H2>
            <Paragraph>
              Have a project in mind, a question, or just want to say hi? I'm always open to discussing web development, side projects, or exciting new opportunities.
            </Paragraph>
            
            <div className="pt-8 space-y-4">
              <div className="flex items-center space-x-4">
                 <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-brand-cyan">
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                 </div>
                 <div>
                   <p className="text-sm text-slate-400">Email</p>
                   <p className="text-white font-medium">hello@portfolio.dev</p>
                 </div>
              </div>
              <div className="flex items-center space-x-4">
                 <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-brand-purple">
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                 </div>
                 <div>
                   <p className="text-sm text-slate-400">Location</p>
                   <p className="text-white font-medium">San Francisco, CA</p>
                 </div>
              </div>
            </div>
          </div>

          <div ref={formRef} className="glass rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">Send Me a Message</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative">
              <InputFeild 
                label="Full Name" 
                {...register("fullName", { required: "Name is required" })} 
                error={errors.fullName} 
              />
              <InputFeild 
                label="Email Address" 
                type="email" 
                {...register("email", { 
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
                })} 
                error={errors.email} 
              />
              <PhoneNumInput 
                label="Phone Number (Optional)" 
                {...register("phone")} 
                error={errors.phone} 
              />
              <TextArea 
                label="Your Message" 
                {...register("message", { required: "Message is required", minLength: { value: 10, message: "Message is too short" } })} 
                error={errors.message} 
              />
              <div className="pt-4">
                <Button type="submit" variant="primary" className="w-full">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
