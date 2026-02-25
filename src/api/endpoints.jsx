const DEFAULT_API_BASE_URL = "http://172.93.223.239:3001";
// const DEFAULT_API_BASE_URL = "http://localhost:3001";
const envApiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";

const isLocalApiUrl = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i.test(envApiBaseUrl);
const isRunningLocally =
  typeof window !== "undefined" && /^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname);

const resolvedApiBaseUrl =
  envApiBaseUrl && (!isLocalApiUrl || isRunningLocally)
    ? envApiBaseUrl
    : DEFAULT_API_BASE_URL;

export const API_BASE_URL = (
  resolvedApiBaseUrl
).replace(/\/+$/, "");

// All API endpoints in one place
export const ENDPOINTS = {
  // ========================
  // EVENTS
  // ========================
  ADD_EVENT: "/add-event",
  GET_EVENTS: "/get-event",
  // ========================
  // CITIES
  // ========================
  GET_CITIES: "/get-city-website",

  // ========================
  // CATEGORIES
  // ========================
  GET_CATEGORIES: "/get-category",
  GET_SUB_CATEGORIES: "/get-sub-category",

  LOGIN: "/login",
  VERIFY_OTP: "/verify-otp",
  BECOME_A_ORGANISER: "/become-a-organiser",
  GET_ORGANISER: "/get-organiser",
  GET_ORGANISER_EVENT: "/get-organiser-event",
  REGISTER: "/register",

  GET_PROFILE: "/get-user-profile",
  UPDATE_PROFILE: "/update-user-profile",
  GET_USER_EVENTS: "/user/events",
  EDIT_USER_EVENT: "/user/edit-event",
  TRACK_VISIT: "/track-visit",

  GET_BLOGS: "/blogs",
  GET_BLOG_BY_SLUG: "/blogs",
  GET_HERO_CONTENT: "/get-hero-content",
  GET_HERO_VIDEOS: "/get-hero-videos",
  GET_HERO_METRICS: "/get-hero-metrics",
  ADMIN_GET_HERO_CONTENT: "/admin/get-hero-content",
  ADMIN_UPSERT_HERO_CONTENT: "/admin/upsert-hero-content",

};
