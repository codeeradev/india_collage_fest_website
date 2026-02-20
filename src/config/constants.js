import { API_BASE_URL } from "../api/endpoints";

const envImageBaseUrl = import.meta.env.VITE_IMAGE_URL || "";
const isLocalImageUrl = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i.test(envImageBaseUrl);
const isRunningLocally =
  typeof window !== "undefined" && /^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname);

const resolvedImageBaseUrl =
  envImageBaseUrl && (!isLocalImageUrl || isRunningLocally)
    ? envImageBaseUrl
    : API_BASE_URL;

export const BASE_URL = (
  resolvedImageBaseUrl
).replace(/\/+$/, "");
export const AUTH_EXPIRY_TIME = 24 * 60 * 60 * 1000; // 1 day
