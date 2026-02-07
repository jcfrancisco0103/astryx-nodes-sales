import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/Home.css';
import { getSales, getSettings } from '../utils/storage';

function Home() {
  const [totalSales, setTotalSales] = useState(0);
  const [vpsCost, setVpsCost] = useState(0);
  const [panelCost, setPanelCost] = useState(0);
  const [netProfit, setNetProfit] = useState(0);

  useEffect(() => {
    const sales = getSales();
    const settings = getSettings();
    
    const total = sales.reduce((sum, sale) => sum + (parseFloat(sale.amount) || 0), 0);
    setTotalSales(total);
    
    const vps = parseFloat(settings.vpsCost) || 0;
    const panel = parseFloat(settings.panelCost) || 0;
    
    setVpsCost(vps);
    setPanelCost(panel);
    setNetProfit(total - vps - panel);
  }, []);

  // Listen for storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const sales = getSales();
      const settings = getSettings();
      
      const total = sales.reduce((sum, sale) => sum + (parseFloat(sale.amount) || 0), 0);
      setTotalSales(total);
      
      const vps = parseFloat(settings.vpsCost) || 0;
      const panel = parseFloat(settings.panelCost) || 0;
      
      setVpsCost(vps);
      setPanelCost(panel);
      setNetProfit(total - vps - panel);
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
          <h2>Cost Settings</h2>
          <div className="settings-form">
            <div className="input-group">
              <label>VPS Cost ($)</label>
              <input
                type="number"
                value={vpsCost}
                onChange={(e) => {
                  const value = parseFloat(e.target.value) || 0;
                  setVpsCost(value);
                  const settings = getSettings();
                  settings.vpsCost = value;
                  localStorage.setItem('astryxSettings', JSON.stringify(settings));
                  setNetProfit(totalSales - value - panelCost);
                }}
                placeholder="0.00"
              />
            </div>
            <div className="input-group">
              <label>Panel Cost ($)</label>
              <input
                type="number"
                value={panelCost}
                onChange={(e) => {
                  const value = parseFloat(e.target.value) || 0;
                  setPanelCost(value);
                  const settings = getSettings();
                  settings.panelCost = value;
                  localStorage.setItem('astryxSettings', JSON.stringify(settings));
                  setNetProfit(totalSales - vpsCost - value);
                }}
                placeholder="0.00"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
