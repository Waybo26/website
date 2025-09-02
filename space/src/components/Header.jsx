import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header id="header">
      <h1>Wesley Nabo</h1>
      <p>Student at Stevens Institute of Technology &nbsp;&bull;&nbsp; Aspiring Software/Web Developer &nbsp;&bull;&nbsp; NBA Enthusiast</p>
      
      <nav style={{ marginBottom: '1em' }}>
        <ul>
          <li>
            <Link to="/experience" className="icon solid fa-briefcase">
              <span className="label">Experience</span>
            </Link>
          </li>
          <li>
            <Link to="/projects" className="icon solid fa-code">
              <span className="label">Projects</span>
            </Link>
          </li>
          <li>
            <Link to="/links" className="icon solid fa-link">
              <span className="label">Links</span>
            </Link>
          </li>
          <li>
            <Link to="/leadership" className="icon solid fa-users">
              <span className="label">Leadership</span>
            </Link>
          </li>
        </ul>
      </nav>

      <nav>
        <ul>
          <li>
            <a 
              href="https://drive.google.com/file/d/1W2btklx21zpJXtx0n9IjxTGe7QfrLrHk/view?usp=sharing" 
              className="icon solid fa-file" 
              target="_blank"
            >
              <span className="label">Resume</span>
            </a>
          </li>
          <li>
            <a 
              href="https://www.linkedin.com/in/wesley-nabo/" 
              className="icon brands fa-linkedin-in" 
              target="_blank"
            >
              <span className="label">Linkedin</span>
            </a>
          </li>
          <li>
            <a 
              href="https://github.com/Waybo26" 
              className="icon brands fa-github" 
              target="_blank"
            >
              <span className="label">Github</span>
            </a>
          </li>
          <li>
            <a 
              href="mailto:wnabo@stevens.edu" 
              className="icon solid fa-envelope" 
              target="_blank"
            >
              <span className="label">Email Link</span>
            </a>
          </li>
        </ul>
      </nav>
      <p>Stay Tuned For More!!</p>
    </header>
  );
};

export default Header;
