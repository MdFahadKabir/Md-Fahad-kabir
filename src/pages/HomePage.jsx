import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Home/Hero";
import AboutMe from "../components/Home/AboutMe";
import EmployeeExperience from "../components/Home/EmployeeExperience";
import MyGitProject from "../components/Home/MyGitProject";
import ContactMe from "../components/ContactMe/ContactMe";
import Navbar from "../components/Common/Navbar";
import Footer from "../components/Common/Footer";
import ThreeCursorRobot from "../components/threejsanimation/ThreeCursorRobot";

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <Hero />
      <ThreeCursorRobot />
      <AboutMe />
      <EmployeeExperience />
      <MyGitProject />
      <ContactMe />
      <Footer />
    </>
  );
}
