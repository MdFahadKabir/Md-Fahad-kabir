import React from "react";

export function H1({ children, className = "" }) {
  return (
    <h1 className={`text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 ${className}`}>
      {children}
    </h1>
  );
}

export function H2({ children, className = "" }) {
  return (
    <h2 className={`text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 ${className}`}>
      {children}
    </h2>
  );
}

export function H3({ children, className = "" }) {
  return (
    <h3 className={`text-2xl md:text-3xl font-semibold text-slate-200 mb-3 ${className}`}>
      {children}
    </h3>
  );
}

export function Paragraph({ children, className = "" }) {
  return (
    <p className={`text-base md:text-lg text-slate-400 leading-relaxed max-w-3xl ${className}`}>
      {children}
    </p>
  );
}

export function GradientText({ children, className = "" }) {
  return (
    <span className={`bg-gradient-to-r from-brand-purple to-brand-cyan bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
}
