import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/AddSaleModal.css';
import { saveSale } from '../utils/storage';

const PLANS = {
  pig: {
    name: 'Pig Plan',
    ram: '2GB',
    cpu: '100%',
    disk: '5GB',
  },
  sheep: {
    name: 'Sheep Plan',
    ram: '4GB',
    cpu: '100%',
    disk: '10GB',
  },
  cow: {
    name: 'Cow Plan',
    ram: '6GB',
    cpu: '150%',
    disk: '20GB',
  },
  creeper: {
    name: 'Creeper Plan',
    ram: '8GB',
    cpu: '150%',
    disk: '30GB',
  },
  zombie: {
    name: 'Zombie Plan',
    ram: '10GB',
    cpu: '200%',
    disk: '35GB',
  },
  skeleton: {
    name: 'Skeleton Plan',
    ram: '12GB',
    cpu: '250%',
    disk: '40GB',
  },
  custom: {
    name: 'Custom Plan',
    ram: '',
    cpu: '',
    disk: '',
  },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

function AddSaleModal({ onClose, onSave }) {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [dateBought, setDateBought] = useState(new Date().toISOString().split('T')[0]);
  const [duration, setDuration] = useState('');
  const [dateExpiration, setDateExpiration] = useState('');
  const [amount, setAmount] = useState('');
  const [customRam, setCustomRam] = useState('');
  const [customCpu, setCustomCpu] = useState('');
  const [customDisk, setCustomDisk] = useState('');

  const handlePlanSelect = (planKey) => {
    setSelectedPlan(planKey);
    if (planKey !== 'custom') {
      setCustomRam('');
      setCustomCpu('');
      setCustomDisk('');
    }
  };

  const calculateExpiryDate = (startDate, durationMonths) => {
    if (!startDate || !durationMonths) return '';
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + durationMonths);
    return date.toISOString().split('T')[0];
  };

  const handleDurationChange = (e) => {
    const selectedDuration = e.target.value;
    setDuration(selectedDuration);
    
    if (selectedDuration && dateBought) {
      let months = 0;
      if (selectedDuration === '1 month') months = 1;
      else if (selectedDuration === '6 Months') months = 6;
      else if (selectedDuration === '12 Months') months = 12;
      
      const expiryDate = calculateExpiryDate(dateBought, months);
      setDateExpiration(expiryDate);
    } else {
      setDateExpiration('');
    }
  };

  const handleDateBoughtChange = (e) => {
    const newDate = e.target.value;
    setDateBought(newDate);
    
    if (duration && newDate) {
      let months = 0;
      if (duration === '1 month') months = 1;
      else if (duration === '6 Months') months = 6;
      else if (duration === '12 Months') months = 12;
      
      const expiryDate = calculateExpiryDate(newDate, months);
      setDateExpiration(expiryDate);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedPlan) {
      alert('Please select a plan');
      return;
    }

    if (!customerName.trim()) {
      alert('Please enter customer name');
      return;
    }

    if (!dateBought) {
      alert('Please select purchase date');
      return;
    }

    if (!duration) {
      alert('Please select a duration');
      return;
    }

    if (!dateExpiration) {
      alert('Please ensure expiration date is calculated');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (selectedPlan === 'custom') {
      if (!customRam || !customCpu || !customDisk) {
        alert('Please fill in all custom plan specifications');
        return;
      }
    }

    const planData = selectedPlan === 'custom'
      ? {
          name: 'Custom Plan',
          ram: customRam,
          cpu: customCpu,
          disk: customDisk,
        }
      : PLANS[selectedPlan];

    const sale = {
      id: Date.now().toString(),
      customerName: customerName.trim(),
      plan: planData,
      dateBought,
      dateExpiration,
      amount: parseFloat(amount),
    };

    saveSale(sale);
    onSave();
    
    // Reset form
    setSelectedPlan(null);
    setCustomerName('');
    setDateBought(new Date().toISOString().split('T')[0]);
    setDuration('');
    setDateExpiration('');
    setAmount('');
    setCustomRam('');
    setCustomCpu('');
    setCustomDisk('');
  };

  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      >
        <motion.div
          className="modal-content"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h2>Add New Sale</h2>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>

          <form onSubmit={handleSubmit} className="modal-form">
            <div className="form-group">
              <label>Customer Name *</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter customer name"
                required
              />
            </div>

            <div className="form-group">
              <label>Select Plan *</label>
              <div className="plans-grid">
                {Object.entries(PLANS).map(([key, plan]) => (
                  <motion.button
                    key={key}
                    type="button"
                    className={`plan-card ${selectedPlan === key ? 'selected' : ''}`}
                    onClick={() => handlePlanSelect(key)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <h3>{plan.name}</h3>
                    {key !== 'custom' && (
                      <div className="plan-specs">
                        <p>RAM: {plan.ram}</p>
                        <p>CPU: {plan.cpu}</p>
                        <p>Disk: {plan.disk}</p>
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {selectedPlan === 'custom' && (
              <motion.div
                className="custom-plan-inputs"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="form-group">
                  <label>RAM *</label>
                  <input
                    type="text"
                    value={customRam}
                    onChange={(e) => setCustomRam(e.target.value)}
                    placeholder="e.g., 16GB"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>CPU *</label>
                  <input
                    type="text"
                    value={customCpu}
                    onChange={(e) => setCustomCpu(e.target.value)}
                    placeholder="e.g., 300%"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Disk *</label>
                  <input
                    type="text"
                    value={customDisk}
                    onChange={(e) => setCustomDisk(e.target.value)}
                    placeholder="e.g., 50GB"
                    required
                  />
                </div>
              </motion.div>
            )}

            {selectedPlan && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="plan-display"
              >
                <h4>Selected Plan:</h4>
                <div className="selected-plan-info">
                  <p><strong>{selectedPlan === 'custom' ? 'Custom Plan' : PLANS[selectedPlan].name}</strong></p>
                  {selectedPlan === 'custom' ? (
                    <>
                      <p>RAM: {customRam || 'N/A'}</p>
                      <p>CPU: {customCpu || 'N/A'}</p>
                      <p>Disk: {customDisk || 'N/A'}</p>
                    </>
                  ) : (
                    <>
                      <p>RAM: {PLANS[selectedPlan].ram}</p>
                      <p>CPU: {PLANS[selectedPlan].cpu}</p>
                      <p>Disk: {PLANS[selectedPlan].disk}</p>
                    </>
                  )}
                </div>
              </motion.div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label>Date Bought *</label>
                <input
                  type="date"
                  value={dateBought}
                  onChange={handleDateBoughtChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Duration *</label>
                <select
                  value={duration}
                  onChange={handleDurationChange}
                  required
                >
                  <option value="">Select duration</option>
                  <option value="1 month">1 month</option>
                  <option value="6 Months">6 Months</option>
                  <option value="12 Months">12 Months</option>
                </select>
              </div>
            </div>

            {dateExpiration && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="form-group"
              >
                <label>Date Expiry</label>
                <input
                  type="text"
                  value={new Date(dateExpiration).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                  readOnly
                  className="expiry-display"
                />
              </motion.div>
            )}

            <div className="form-group">
              <label>Amount ($) *</label>
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
              <motion.button
                type="submit"
                className="submit-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Save Sale
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AddSaleModal;
