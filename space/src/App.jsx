import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Background from './components/Background';
import Header from './components/Header';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Links from './components/Links';
import Leadership from './components/Leadership';
import './App.css';

function App() {
  useEffect(() => {
    document.body.classList.remove('is-preload');
    
    const handleTouchMove = () => false;
    window.ontouchmove = handleTouchMove;    
    const handleOrientationChange = () => {
      document.body.scrollTop = 0;
    };
    window.onorientationchange = handleOrientationChange;

    // Cleanup
    return () => {
      window.ontouchmove = null;
      window.onorientationchange = null;
    };
  }, []);

  return (
    <Router>
      <div id="wrapper">
        <Background />
        <div id="overlay"></div>
        <div id="main">
          <Header />
          <Navigation />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/links" element={<Links />} />
            <Route path="/leadership" element={<Leadership />} />
          </Routes>
          
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
