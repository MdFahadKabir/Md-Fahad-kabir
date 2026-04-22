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
                  <Card className={`relative !p-6 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} border border-white/5 bg-white/5 transition-[max-height,opacity,margin] duration-500 ease-in-out`}>
                    <h4 className="text-xl font-bold text-white mb-1 group-hover:text-brand-cyan transition-colors">{exp.role}</h4>
                    <span className="text-brand-purple font-medium text-sm block mb-3">{exp.company} • {exp.period}</span>
                    <p className="text-slate-400 text-sm leading-relaxed">{exp.description}</p>
                    
                    {exp.projects && exp.projects.length > 0 && (
                      <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-700 ease-in-out group-hover:max-h-[1000px] group-hover:opacity-100 group-hover:mt-4">
                        <div className="pt-4 border-t border-white/10 space-y-4">
                          <p className={`text-brand-cyan text-sm font-semibold mb-2 ${index % 2 === 0 ? 'md:text-right text-left' : 'text-left'}`}>Projects</p>
                          {exp.projects.map((project, pIndex) => (
                            <div key={pIndex} className={`flex items-start gap-3 group/project cursor-pointer ${index % 2 === 0 ? 'md:flex-row-reverse text-left md:text-right' : 'flex-row text-left'}`}>
                              
                              {/* Desktop Arrow (Left for even) */}
                              <svg 
                                className={`hidden md:block w-4 h-4 mt-1 text-brand-purple transform transition-transform duration-300 flex-shrink-0 ${index % 2 === 0 ? 'group-hover/project:-translate-x-2' : 'group-hover/project:translate-x-2'}`} 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={index % 2 === 0 ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
                              </svg>

                              {/* Mobile Arrow (Right always) */}
                              <svg 
                                className={`block md:hidden w-4 h-4 mt-1 text-brand-purple transform transition-transform duration-300 flex-shrink-0 group-hover/project:translate-x-2`} 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>

                              <div>
                                <h5 className="text-white text-sm font-medium leading-snug group-hover/project:text-brand-cyan transition-colors">{project.name}</h5>
                                <p className="text-slate-500 text-xs mt-1">{project.technologies}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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
