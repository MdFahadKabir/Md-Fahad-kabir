import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { H2, Paragraph } from "../Common/Typography";
import Card from "../Common/Card";
import { coreSkills } from "../data/coreSkill";

gsap.registerPlugin(ScrollTrigger);

export default function AboutMe() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    
    gsap.fromTo(el.children, 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h3 className="text-brand-purple font-semibold tracking-wider uppercase text-sm">About Me</h3>
            <H2>Passionate about crafting pixel-perfect experiences</H2>
            <Paragraph>
              I am a frontend developer dedicated to building responsive, accessible, and highly interactive user interfaces. My journey began with a curiosity for how things work on the web, which evolved into a career of solving complex problems through elegant code.
            </Paragraph>
            <Paragraph>
              When I'm not coding, you can find me exploring new design trends, contributing to open-source projects, or learning the latest web technologies to stay ahead of the curve.
            </Paragraph>
          </div>
          <div>
            <Card className="p-8 border border-white/10 bg-white/5 backdrop-blur-xl">
              <h3 className="text-xl font-bold text-white mb-6">Core Skills</h3>
              <div className="flex flex-wrap gap-3">
                {coreSkills.map((skill) => (
                  <span key={skill} className="px-4 py-2 rounded-full glass text-slate-300 text-sm font-medium hover:text-white hover:bg-brand-purple/20 transition-colors cursor-pointer">
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
