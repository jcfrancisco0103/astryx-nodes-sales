import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/Home.css';
import { getSales, getSettings } from '../utils/storage';

function Home() {
  const [totalSales, setTotalSales] = useState(0);
  const [vpsCost, setVpsCost] = useState(0);
  const [panelCost, setPanelCost] = useState(0);
  const [netProfit, setNetProfit] = useState(0);
  const [ownerSalary, setOwnerSalary] = useState(0);
  const [developerSalary, setDeveloperSalary] = useState(0);
  const [advertiserSalary, setAdvertiserSalary] = useState(0);

  useEffect(() => {
    const sales = getSales();
    const settings = getSettings();
    
    const total = sales.reduce((sum, sale) => sum + (parseFloat(sale.amount) || 0), 0);
    setTotalSales(total);
    
    const vps = parseFloat(settings.vpsCost) || 679;
    const panel = parseFloat(settings.panelCost) || 6778;
    
    setVpsCost(vps);
    setPanelCost(panel);
    const profit = total - vps - panel;
    setNetProfit(profit);
    
    // Calculate salaries (30%, 30%, 20%)
    setOwnerSalary(profit * 0.30);
    setDeveloperSalary(profit * 0.30);
    setAdvertiserSalary(profit * 0.20);
    
    // Initialize settings if not set
    if (!localStorage.getItem('astryxSettings')) {
      const defaultSettings = { vpsCost: 679, panelCost: 6778 };
      localStorage.setItem('astryxSettings', JSON.stringify(defaultSettings));
    }
  }, []);

  // Listen for storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const sales = getSales();
      const settings = getSettings();
      
      const total = sales.reduce((sum, sale) => sum + (parseFloat(sale.amount) || 0), 0);
      setTotalSales(total);
      
      const vps = parseFloat(settings.vpsCost) || 679;
      const panel = parseFloat(settings.panelCost) || 6778;
      
      setVpsCost(vps);
      setPanelCost(panel);
      const profit = total - vps - panel;
      setNetProfit(profit);
      
      // Calculate salaries (30%, 30%, 20%)
      setOwnerSalary(profit * 0.30);
      setDeveloperSalary(profit * 0.30);
      setAdvertiserSalary(profit * 0.20);
    };

    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(handleStorageChange, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="page-container">
      <div className="home-container">
        <motion.h1
          className="page-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Dashboard
        </motion.h1>

        <div className="stats-grid">
          <motion.div
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <h3>Total Sales</h3>
              <p className="stat-value">${totalSales.toFixed(2)}</p>
            </div>
          </motion.div>

          <motion.div
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="stat-icon">🖥️</div>
            <div className="stat-content">
              <h3>VPS Cost</h3>
              <p className="stat-value">${vpsCost.toFixed(2)}</p>
            </div>
          </motion.div>

          <motion.div
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="stat-icon">⚙️</div>
            <div className="stat-content">
              <h3>Panel Cost</h3>
              <p className="stat-value">${panelCost.toFixed(2)}</p>
            </div>
          </motion.div>

          <motion.div
            className="stat-card profit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="stat-icon">📈</div>
            <div className="stat-content">
              <h3>Net Profit</h3>
              <p className={`stat-value ${netProfit >= 0 ? 'positive' : 'negative'}`}>
                ${netProfit.toFixed(2)}
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="settings-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2>Salary Distribution</h2>
          <div className="salary-grid">
            <motion.div
              className="salary-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="salary-icon">👑</div>
              <div className="salary-content">
                <h3>Owner</h3>
                <p className="salary-percentage">30%</p>
                <p className="salary-amount">${ownerSalary.toFixed(2)}</p>
              </div>
            </motion.div>

            <motion.div
              className="salary-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="salary-icon">💻</div>
              <div className="salary-content">
                <h3>Developer</h3>
                <p className="salary-percentage">30%</p>
                <p className="salary-amount">${developerSalary.toFixed(2)}</p>
              </div>
            </motion.div>

            <motion.div
              className="salary-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
            >
              <div className="salary-icon">📢</div>
              <div className="salary-content">
                <h3>Advertiser</h3>
                <p className="salary-percentage">20%</p>
                <p className="salary-amount">${advertiserSalary.toFixed(2)}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
