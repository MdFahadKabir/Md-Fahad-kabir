import React from "react";
import Hero from "../components/Home/Hero";
import AboutMe from "../components/Home/AboutMe";
import EmployeeExperience from "../components/Home/EmployeeExperience";
import MyGitProject from "../components/Home/MyGitProject";
import ContactMe from "../components/ContactMe/ContactMe";
import Navbar from "../components/Common/Navbar";
import Footer from "../components/Common/Footer";
import ThreeCursorRobot from "../components/threejsanimation/ThreeCursorRobot";

export default function HomePage() {
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
