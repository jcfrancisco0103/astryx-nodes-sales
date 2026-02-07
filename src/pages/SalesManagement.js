import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AddSaleModal from '../components/AddSaleModal';
import SaleCard from '../components/SaleCard';
import '../styles/SalesManagement.css';
import { getSales, deleteSale } from '../utils/storage';

function SalesManagement() {
  const [sales, setSales] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadSales();
    
    // Listen for storage changes
    const interval = setInterval(loadSales, 1000);
    return () => clearInterval(interval);
  }, []);

  const loadSales = () => {
    const salesData = getSales();
    // Sort by date bought (newest first)
    salesData.sort((a, b) => new Date(b.dateBought) - new Date(a.dateBought));
    setSales(salesData);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this sale?')) {
      deleteSale(id);
      loadSales();
    }
  };

  return (
    <div className="page-container">
      <div className="sales-container">
        <div className="sales-header">
          <motion.h1
            className="page-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Sales Management
          </motion.h1>
          <motion.button
            className="add-sale-btn"
            onClick={() => setShowModal(true)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            + Add New Sale
          </motion.button>
        </div>

        <AnimatePresence>
          {sales.length === 0 ? (
            <motion.div
              className="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p>No sales recorded yet. Click "Add New Sale" to get started!</p>
            </motion.div>
          ) : (
            <div className="sales-grid">
              {sales.map((sale, index) => (
                <SaleCard
                  key={sale.id}
                  sale={sale}
                  onDelete={handleDelete}
                  index={index}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showModal && (
          <AddSaleModal
            onClose={() => setShowModal(false)}
            onSave={() => {
              setShowModal(false);
              loadSales();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default SalesManagement;
