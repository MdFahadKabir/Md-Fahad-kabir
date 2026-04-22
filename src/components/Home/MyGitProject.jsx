import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { H2 } from "../Common/Typography";
import Card from "../Common/Card";
import { gitProjects } from "../data/GitProject";

gsap.registerPlugin(ScrollTrigger);

export default function MyGitProject() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} id="projects" className="py-24 relative">
      <div className="absolute inset-0 bg-brand-cyan/5 -skew-y-3 z-0 transform origin-top-left"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          {/* <h3 className="text-brand-purple font-semibold tracking-wider uppercase text-sm mb-2">Portfolio</h3> */}
          <H2>Fun Projects</H2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gitProjects.map((project, index) => (
            <div key={index} ref={addToRefs}>
              <Card className="h-full flex flex-col group overflow-hidden relative !p-0 border border-white/10 bg-slate-900/50">
                <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden relative">
                   <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-purple via-slate-900 to-slate-900 duration-500"></div>
                   <div className="absolute inset-0 flex items-center justify-center p-4">
                      {/* Placeholder for project image */}
                      <span className="text-slate-500 font-mono text-sm uppercase tracking-[0.2em]">{project.title.substring(0, 4)}...</span>
                   </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h4 className="text-xl font-bold text-white mb-2">{project.title}</h4>
                  <p className="text-slate-400 text-sm mb-6 flex-grow">{project.shortDescription}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map(t => (
                      <span key={t} className="text-xs py-1 px-2 rounded bg-white/5 text-brand-cyan border border-brand-cyan/20">{t}</span>
                    ))}
                  </div>
                  <Link to={`/project/${project.id}`} className="inline-flex items-center text-sm font-medium text-brand-purple hover:text-white transition-colors">
                    View Project 
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
