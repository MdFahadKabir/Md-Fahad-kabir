import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { H1, Paragraph } from "../Common/Typography";
import Button from "../Common/Button";



export default function Hero() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      textRef.current.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power3.out", delay: 0.5 }
    );

    gsap.fromTo(imageRef.current,
      { scale: 0.8, opacity: 0, rotation: -5 },
      { scale: 1, opacity: 1, rotation: 0, duration: 1.5, ease: "elastic.out(1, 0.5)", delay: 1 }
    );
  }, []);

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl z-0 pointer-events-none"></div>
      <div className="absolute bottom-1/4 -left-20 w-72 h-72 bg-brand-cyan/20 rounded-full blur-3xl z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div ref={textRef} className="flex flex-col items-start space-y-6">
          <span className="inline-block py-1 px-3 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-sm font-semibold tracking-wide">
            WELCOME TO MY WORLD
          </span>
          <H1>
            Hi, I'm a <span className="bg-gradient-to-r from-brand-cyan to-brand-purple bg-clip-text text-transparent">Creative Developer</span>
          </H1>
          <Paragraph>
            I craft modern, highly animated web experiences that merge stunning visual design with seamless performance. Let's build something extraordinary together.
          </Paragraph>
          <div className="flex space-x-4 pt-4">
            <a href="#experience">
               <Button variant="primary">View My Work</Button>
            </a>
            <a href="/Md_Fahad_Kabir.pdf" download="Md_Fahad_Kabir_CV.pdf">
               <Button variant="outline">Download CV</Button>
            </a>
          </div>
        </div>
        <div className="relative hidden lg:flex justify-center items-center">
          <div ref={imageRef} className="relative w-80 h-80 md:w-96 md:h-96 rounded-3xl bg-gradient-to-br from-brand-purple to-brand-cyan p-1 shadow-[0_0_50px_rgba(139,92,246,0.3)]">
             <div className="w-full h-full rounded-[23px] overflow-hidden bg-slate-900 absolute inset-0 m-auto flex justify-center items-center">
               <img 
                 src="/Md_Fahad_Kabir.png" 
                 alt="Md Fahad Kabir" 
                 className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
                 onError={(e) => {
                   e.target.style.display = 'none';
                   e.target.nextSibling.style.display = 'flex';
                 }}
               />
               <div className="hidden w-full h-full glass flex items-center justify-center">
                 <span className="text-white/50 font-bold text-xl tracking-widest text-center px-4">MD FAHAD KABIR</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
