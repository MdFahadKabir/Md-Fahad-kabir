import React from "react";

export default function Card({ children, className = "" }) {
  return (
    <div className={`glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(139,92,246,0.2)] ${className}`}>
      {children}
    </div>
  );
}
