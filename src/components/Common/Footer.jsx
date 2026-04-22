import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 border-t border-white/10 pt-16 pb-8 px-6 text-slate-400 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start group">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-brand-purple to-brand-cyan bg-clip-text text-transparent mb-4 transition-transform group-hover:scale-105">
            Portfolio
          </h3>
          <p className="text-sm max-w-sm">
            Building digital experiences that combine stunning design with robust, scalable engineering.
          </p>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-white font-semibold mb-4 text-lg">Links</h4>
          <div className="space-y-2 flex flex-col items-center md:items-start">
            <a href="#about" className="hover:text-brand-cyan transition-colors hover:translate-x-1 duration-200 inline-block">About Me</a>
            <a href="#experience" className="hover:text-brand-cyan transition-colors hover:translate-x-1 duration-200 inline-block">Experience</a>
            <a href="#projects" className="hover:text-brand-cyan transition-colors hover:translate-x-1 duration-200 inline-block">Projects</a>
          </div>
        </div>
        {/* <div className="flex flex-col items-center md:items-start">
          <h4 className="text-white font-semibold mb-4 text-lg">Social</h4>
          <div className="flex space-x-4">
            <a href="#" className="p-2 glass rounded-full hover:bg-brand-purple/20 hover:text-white transition-all hover:-translate-y-1">
             
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
            <a href="#" className="p-2 glass rounded-full hover:bg-brand-cyan/20 hover:text-white transition-all hover:-translate-y-1">
             
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="#" className="p-2 glass rounded-full hover:bg-brand-purple/20 hover:text-white transition-all hover:-translate-y-1">
         
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
          </div>
        </div> */}
      </div>
      <div className="max-w-7xl mx-auto mt-12 text-center text-xs opacity-60 border-t border-white/5 pt-6">
        &copy; {new Date().getFullYear()} Md Fahad Kabir . All rights reserved.
      </div>
    </footer>
  );
}
