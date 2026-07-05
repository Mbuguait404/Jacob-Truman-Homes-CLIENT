export function formatPrice(amount, isRental) {
  const value = `KES ${amount.toLocaleString("en-KE")}`;
  return isRental ? `${value} / month` : value;
}
