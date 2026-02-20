const toDateObject = (input) => {
  if (!input) return null;

  if (input instanceof Date) {
    return Number.isNaN(input.getTime()) ? null : input;
  }

  if (typeof input === "object") {
    if (input.$date) {
      return toDateObject(input.$date);
    }

    if (typeof input.toDate === "function") {
      const resolved = input.toDate();
      return resolved instanceof Date && !Number.isNaN(resolved.getTime())
        ? resolved
        : null;
    }

    return null;
  }

  const parsed = new Date(input);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

export const formatDate = (dateInput) => {
  const dateObject = toDateObject(dateInput);
  if (!dateObject) return "";

  return dateObject.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
