import React, { useState, useCallback } from 'react';
import AnimeBackground from './components/AnimeBackground';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ProjectModal from './components/ProjectModal';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './style.css';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenModal = useCallback((project) => {
    setSelectedProject(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <div className="portfolio-app">
      {/* Cyber Initializer Loader */}
      <Loader />

      {/* Navigation */}
      <Navbar />

      {/* 2D Anime Canvas Background */}
      <AnimeBackground />

      {/* Content Layout */}
      <div className="portfolio-split">
        <main className="content-column">
          <Hero />
          <About />
          <Skills />
          <Projects onOpenModal={handleOpenModal} />
          <Experience />
          <Contact />
        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={handleCloseModal}
      />
    </div>
  );
}
