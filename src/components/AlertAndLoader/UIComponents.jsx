// UIComponents.jsx
// This file ONLY exposes global functions (no UI here)

let setGlobalNotify = null;

/**
 * 🔔 Trigger global alert / loader from anywhere
 * @param {"success"|"error"|"warning"|"info"|"loading"} type
 * @param {string} message
 * @param {number} duration
 */
export const showAlert = (
  type = "info",
  message = "",
  duration = 3000
) => {
  if (!setGlobalNotify) {
    console.warn("⚠️ showAlert() called before AlertProvider mounted");
    return;
  }

  setGlobalNotify({
    open: true,
    type,
    message,
    duration,
  });

  // ⛔ Loading should NOT auto close
  if (type !== "loading") {
    setTimeout(() => {
      setGlobalNotify((prev) => ({ ...prev, open: false }));
    }, duration);
  }
};

/**
 * 🔗 Used internally by AlertProvider
 */
export const registerGlobalAlert = (setter) => {
  setGlobalNotify = setter;
};
