export const formatPrice = (amount) =>
  `PKR ${Number(amount).toLocaleString('en-PK')}`;

export const parsePrice = (priceString) =>
  parseInt(String(priceString).replace(/[^0-9]/g, ''), 10) || 0;
