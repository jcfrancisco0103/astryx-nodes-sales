export const getSales = () => {
  try {
    const sales = localStorage.getItem('astryxSales');
    return sales ? JSON.parse(sales) : [];
  } catch (error) {
    console.error('Error loading sales:', error);
    return [];
  }
};

export const saveSale = (sale) => {
  try {
    const sales = getSales();
    sales.push(sale);
    localStorage.setItem('astryxSales', JSON.stringify(sales));
  } catch (error) {
    console.error('Error saving sale:', error);
  }
};

export const deleteSale = (id) => {
  try {
    const sales = getSales();
    const filtered = sales.filter(sale => sale.id !== id);
    localStorage.setItem('astryxSales', JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting sale:', error);
  }
};

export const getSettings = () => {
  try {
    const settings = localStorage.getItem('astryxSettings');
    if (settings) {
      const parsed = JSON.parse(settings);
      // Ensure defaults are set if not present
      return {
        vpsCost: parsed.vpsCost !== undefined ? parsed.vpsCost : 679,
        panelCost: parsed.panelCost !== undefined ? parsed.panelCost : 6778,
      };
    }
    return { vpsCost: 679, panelCost: 6778 };
  } catch (error) {
    console.error('Error loading settings:', error);
    return { vpsCost: 679, panelCost: 6778 };
  }
};
