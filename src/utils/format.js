export function formatPrice(amount, isRental) {
  const value = `KES ${amount.toLocaleString("en-KE")}`;
  return isRental ? `${value} / month` : value;
}

// Land-aware noun for listing counts and headings. Pass a property type
// (or "All"/empty for a mixed result) and whether the plural is wanted.
export function listingNoun(propertyType, plural = false) {
  if (propertyType === "Land") return plural ? "plots" : "plot";
  if (!propertyType || propertyType === "All") return plural ? "properties" : "property";
  return plural ? "homes" : "home";
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

