import React from "react";
import Hero from "../components/Hero";
import ProjectShowcase from "../components/ProjectShowcase";
import About from "../components/About";
import SEO from "../components/SEO";
import { getProjects } from "../lib/data";

export default function HomePage() {
  const projects = getProjects();

  return (
    <>
      <SEO />
      <Hero />
      <ProjectShowcase projects={projects} />
      <About />
    </>
  );
}
