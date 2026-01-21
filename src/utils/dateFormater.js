export const formatDate = (dateStr) => {
  if (!dateStr) return "";

  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
