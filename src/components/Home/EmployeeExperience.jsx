import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { H2 } from "../Common/Typography";
import Card from "../Common/Card";
import { experiences } from "../data/Experience";

gsap.registerPlugin(ScrollTrigger);

export default function EmployeeExperience() {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    itemsRef.current.forEach((item, index) => {
      gsap.fromTo(item,
        { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          }
        }
      );
    });
  }, []);

  const addToRefs = (el) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-brand-purple font-semibold tracking-wider uppercase text-sm mb-2">My Journey</h3>
          <H2 className="text-center">Experience</H2>
        </div>

        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-purple/50 via-brand-cyan/50 to-transparent"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                ref={addToRefs}
                className={`relative flex flex-col md:flex-row items-center justify-between group ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-brand-cyan border-4 border-slate-900 transform -translate-x-1/2 mt-6 md:mt-0 shadow-[0_0_10px_rgba(6,182,212,1)] z-10"></div>
                
                <div className="w-full md:w-5/12 pl-12 md:pl-0">
                  <Card className={`relative !p-6 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} border border-white/5 bg-white/5`}>
                    <h4 className="text-xl font-bold text-white mb-1 group-hover:text-brand-cyan transition-colors">{exp.role}</h4>
                    <span className="text-brand-purple font-medium text-sm block mb-3">{exp.company} • {exp.period}</span>
                    <p className="text-slate-400 text-sm leading-relaxed">{exp.description}</p>
                  </Card>
                </div>
                
                <div className="hidden md:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
