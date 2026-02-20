import { API_BASE_URL } from "../api/endpoints";
import { BASE_URL } from "../config/constants";

const ABSOLUTE_URL_REGEX = /^(https?:)?\/\//i;
const INLINE_URL_REGEX = /^(data:|blob:)/i;
const INVALID_MEDIA_VALUE_REGEX = /^(null|undefined|n\/a|na|false|0)$/i;

const trimTrailingSlash = (value) => value?.toString().trim().replace(/\/+$/, "") || "";
const withLeadingSlash = (value) => (value.startsWith("/") ? value : `/${value}`);

const MEDIA_BASE_CANDIDATES = [...new Set([
  trimTrailingSlash(import.meta.env.VITE_IMAGE_URL),
  trimTrailingSlash(BASE_URL),
  trimTrailingSlash(API_BASE_URL),
])].filter(Boolean);

const pickFirstFilled = (values = []) => {
  for (const value of values) {
    const normalized = normalizeMediaValue(value);
    if (normalized) {
      return normalized;
    }
  }

  return "";
};

const normalizeMediaValue = (rawValue) => {
  if (rawValue == null) {
    return "";
  }

  if (typeof rawValue === "object") {
    return pickFirstFilled([
      rawValue.url,
      rawValue.src,
      rawValue.path,
      rawValue.image,
      rawValue.banner,
      rawValue.bannerImage,
      rawValue.thumbnail,
      rawValue.coverImage,
      rawValue.poster,
      rawValue.secure_url,
    ]);
  }

  const value = rawValue.toString().trim();
  if (!value || INVALID_MEDIA_VALUE_REGEX.test(value)) {
    return "";
  }

  return value.replace(/\\/g, "/");
};

const toAbsoluteMediaPath = (value) => {
  if (!value) {
    return "";
  }

  if (ABSOLUTE_URL_REGEX.test(value) || INLINE_URL_REGEX.test(value)) {
    return value;
  }

  const cleanedValue = value.replace(/^\.\//, "");
  const normalizedPath = cleanedValue.startsWith("_next/")
    ? `/${cleanedValue}`
    : withLeadingSlash(cleanedValue);

  const base = MEDIA_BASE_CANDIDATES[0];
  return base ? `${base}${normalizedPath}` : normalizedPath;
};

const hashFromSeed = (seedValue = "") => {
  const seed = seedValue.toString();
  let hash = 0;

  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash);
};

export const pickSeededFallback = (
  seedValue,
  fallbacks = ["/images/event-placeholder.svg"],
) => {
  if (!Array.isArray(fallbacks) || !fallbacks.length) {
    return "/images/event-placeholder.svg";
  }

  return fallbacks[hashFromSeed(seedValue) % fallbacks.length];
};

export const resolveMediaUrl = (rawPath, fallback = "/images/event-placeholder.svg") => {
  const normalizedValue = normalizeMediaValue(rawPath);
  if (!normalizedValue) {
    return fallback;
  }

  return toAbsoluteMediaPath(normalizedValue) || fallback;
};

export const resolveFirstMediaUrl = (
  candidates = [],
  fallback = "/images/event-placeholder.svg",
) => {
  const firstMatch = pickFirstFilled(
    Array.isArray(candidates) ? candidates : [candidates],
  );

  return resolveMediaUrl(firstMatch, fallback);
};

export const resolveEventImageUrl = (
  event,
  fallbacks = [
    "/images/event-placeholder.svg",
    "/images/event-placeholder-alt-1.svg",
    "/images/event-placeholder-alt-2.svg",
  ],
) => {
  const seededFallback = Array.isArray(fallbacks)
    ? pickSeededFallback(
        event?._id || event?.id || event?.slug || event?.title || "event",
        fallbacks,
      )
    : fallbacks;

  return resolveFirstMediaUrl(
    [
      event?.image,
      event?.banner,
      event?.bannerimg,
      event?.bannerImage,
      event?.thumbnail,
      event?.coverImage,
      event?.poster,
    ],
    seededFallback,
  );
};

export const withImageFallback = (event, fallback = "/images/event-placeholder.svg") => {
  const imageElement = event?.currentTarget || event?.target;
  if (!imageElement || imageElement.dataset.fallbackApplied === "true") {
    return;
  }

  imageElement.dataset.fallbackApplied = "true";
  imageElement.src = fallback;
};
