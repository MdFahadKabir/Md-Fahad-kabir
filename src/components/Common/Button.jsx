import React, { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Button({ children, onClick, type = "button", className = "", variant = "primary" }) {
  const btnRef = useRef(null);
  
  useEffect(() => {
    const el = btnRef.current;
    
    const handleMouseEnter = () => {
      gsap.to(el, { scale: 1.05, duration: 0.3, ease: "power2.out" });
    };
    const handleMouseLeave = () => {
      gsap.to(el, { scale: 1, duration: 0.3, ease: "power2.out" });
    };

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const baseStyles = "relative overflow-hidden inline-flex items-center justify-center px-8 py-3 font-semibold rounded-full transition-all duration-300";
  
  const variants = {
    primary: "bg-gradient-to-r from-brand-purple to-brand-cyan text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]",
    outline: "border-2 border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white shadow-[0_0_10px_rgba(139,92,246,0.3)] hover:shadow-[0_0_20px_rgba(139,92,246,0.6)]",
    ghost: "text-slate-300 hover:text-white hover:bg-white/10"
  };

  return (
    <button
      ref={btnRef}
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
