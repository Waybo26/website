import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: 'fa-home' },
    { path: '/experience', label: 'Experience', icon: 'fa-briefcase' },
    { path: '/projects', label: 'Projects', icon: 'fa-code' },
    { path: '/links', label: 'Links', icon: 'fa-link' },
    { path: '/leadership', label: 'Leadership', icon: 'fa-users' }
  ];

  return (
    <nav className="planet-navigation">
      <ul>
        {navItems.map((item) => (
          <li key={item.path}>
            <Link 
              to={item.path} 
              className={`icon solid ${item.icon} ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="label">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
