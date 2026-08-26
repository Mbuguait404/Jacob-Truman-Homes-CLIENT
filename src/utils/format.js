export function formatPrice(amount, isRental) {
  const value = `KES ${amount.toLocaleString("en-KE")}`;
  return isRental ? `${value} / month` : value;
}

const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function formatBlogDate(value) {
  if (!value) return "";
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    const d = new Date(value);
    return `${d.getUTCDate()} ${MONTHS_SHORT[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  }
  return value;
}

