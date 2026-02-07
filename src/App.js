import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import SalesManagement from './pages/SalesManagement';
import PageWrapper from './components/PageWrapper';
import './App.css';

function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <h1>AstryxNodes</h1>
        </div>
        <div className="nav-links">
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'active' : ''}
          >
            Home
          </Link>
          <Link 
            to="/sales" 
            className={location.pathname === '/sales' ? 'active' : ''}
          >
            Sales Management
          </Link>
        </div>
      </div>
    </nav>
  );
}

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <div className="nebula-background"></div>
      <Navigation />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          } />
          <Route path="/sales" element={
            <PageWrapper>
              <SalesManagement />
            </PageWrapper>
          } />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
