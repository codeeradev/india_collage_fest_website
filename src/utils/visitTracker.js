import { useEffect } from "react";

import { post } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";

const VISIT_SESSION_KEY = "if_visit_session";

const trackVisit = async () => {
  try {
    await post(ENDPOINTS.TRACK_VISIT, {});
  } catch (error) {
    // Avoid blocking UI if tracking fails
  }
};

const VisitTracker = () => {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(VISIT_SESSION_KEY)) return;
      sessionStorage.setItem(VISIT_SESSION_KEY, "1");
    } catch {
      // sessionStorage may be blocked, continue without it
    }

    trackVisit();
  }, []);

  return null;
};

export default VisitTracker;
