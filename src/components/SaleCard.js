import React from 'react';
import { motion } from 'framer-motion';
import '../styles/SaleCard.css';

function SaleCard({ sale, onDelete, index }) {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: index * 0.1,
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isExpired = new Date(sale.dateExpiration) < new Date();

  return (
    <motion.div
      className={`sale-card ${isExpired ? 'expired' : ''}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02, y: -5 }}
      layout
    >
      <div className="sale-card-header">
        <h3>{sale.customerName}</h3>
        <button
          className="delete-btn"
          onClick={() => onDelete(sale.id)}
          title="Delete sale"
        >
          🗑️
        </button>
      </div>

      <div className="sale-card-body">
        <div className="plan-info">
          <h4>{sale.plan.name}</h4>
          <div className="plan-specs">
            <span>RAM: {sale.plan.ram}</span>
            <span>CPU: {sale.plan.cpu}</span>
            <span>Disk: {sale.plan.disk}</span>
          </div>
        </div>

        <div className="sale-dates">
          <div className="date-item">
            <span className="date-label">Bought:</span>
            <span className="date-value">{formatDate(sale.dateBought)}</span>
          </div>
          <div className="date-item">
            <span className="date-label">Expires:</span>
            <span className={`date-value ${isExpired ? 'expired-date' : ''}`}>
              {formatDate(sale.dateExpiration)}
            </span>
          </div>
        </div>

        <div className="sale-amount">
          <span className="amount-label">Amount:</span>
          <span className="amount-value">${sale.amount.toFixed(2)}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default SaleCard;
