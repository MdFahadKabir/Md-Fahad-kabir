import React, { useEffect } from "react";
import Navbar from "../components/Common/Navbar";
import Footer from "../components/Common/Footer";
import MySingleGitProjectDescription from "../components/Home/MySingleGitProjectDescription";

export default function GitProjectDescription() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="pt-24 min-h-screen">
        <MySingleGitProjectDescription />
      </div>
      <Footer />
    </>
  );
}
