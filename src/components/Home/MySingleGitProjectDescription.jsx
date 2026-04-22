import React, { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import gsap from "gsap";
import { H1, H2, Paragraph } from "../Common/Typography";
import Button from "../Common/Button";
import { gitProjects } from "../data/GitProject";
import { FaGithub } from "react-icons/fa6";

export default function MySingleGitProjectDescription() {
  const { id } = useParams();
  const project = gitProjects.find(p => p.id === id) || gitProjects[0]; // Fallback to first if not found

  const headerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(headerRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    tl.fromTo(contentRef.current.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" },
      "-=0.5"
    );
  }, [id]);

  return (
    <div className="w-full text-slate-200">
      
      {/* Dynamic Header Section */}
      <section 
        className="relative w-full py-24 px-6 border-b border-white/5"
        style={{ background: project.heroImage }}
      >
        <div ref={headerRef} className="max-w-5xl mx-auto flex flex-col items-start relative z-10">
          <Link to="/" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors mb-8 group">
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Projects
          </Link>
          
          <h4 className="text-brand-purple font-semibold tracking-wider uppercase text-sm mb-4">Project Case Study</h4>
          <H1 className="!mb-6">{project.title}</H1>
          
          <div className="flex space-x-6">
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              <Button variant="primary" className="!px-6 !py-2">View Live Project</Button>
            </a>
            <a href={project.repoUrl} target="_blank" rel="noreferrer">
              <Button variant="outline" className="!px-6 !py-2 flex justify-between items-center space-x-">
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg> */}
                <FaGithub />
                <span>GitHub Repo</span>
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div ref={contentRef} className="space-y-16">
          
          {/* Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="col-span-1">
              <h3 className="text-xl font-bold text-white mb-4">Overview</h3>
              <div className="h-1 w-12 bg-gradient-to-r from-brand-purple to-brand-cyan rounded-full"></div>
            </div>
            <div className="col-span-1 md:col-span-2">
              <Paragraph className="!text-lg">{project.overview}</Paragraph>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="col-span-1">
              <h3 className="text-xl font-bold text-white mb-4">Technologies</h3>
              <div className="h-1 w-12 bg-gradient-to-r from-brand-cyan to-brand-purple rounded-full"></div>
            </div>
            <div className="col-span-1 md:col-span-2">
              <div className="flex flex-wrap gap-3">
                {project.techStack.map(tech => (
                  <span key={tech} className="px-5 py-2 rounded-lg glass text-white font-medium shadow-sm hover:scale-105 transition-transform cursor-pointer border border-white/10">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Features Layer */}
          {/* <div className="glass p-10 rounded-3xl border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <H2 className="!mb-8">Key Features & Architecture</H2>
            <ul className="space-y-4">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                  </div>
                  <p className="ml-4 text-slate-300 text-lg leading-relaxed">{feature}</p>
                </li>
              ))}
            </ul>
          </div> */}
          
        </div>
      </section>
      
    </div>
  );
}
