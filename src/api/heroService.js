import { get } from "./apiClient";
import { ENDPOINTS } from "./endpoints";
import { DEFAULT_HERO_CONTENT } from "../config/heroDefaults";
import { resolveMediaUrl } from "../utils/mediaUrl";

const clampAutoRotateMs = (value) => {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return DEFAULT_HERO_CONTENT.autoRotateMs;
  }

  return Math.min(Math.max(Math.round(parsed), 2000), 30000);
};

const sanitizeVideos = (videos = []) => {
  if (!Array.isArray(videos)) return [];

  return videos
    .map((item, index) => {
      const src = resolveMediaUrl(item?.src, "");
      const title = typeof item?.title === "string" ? item.title.trim() : "";

      if (!src) return null;

      return {
        title: title || `Video ${index + 1}`,
        src,
      };
    })
    .filter(Boolean);
};

const sanitizeStats = (stats = []) => {
  if (!Array.isArray(stats)) return [];

  return stats
    .map((item, index) => {
      const label = typeof item?.label === "string" ? item.label.trim() : "";
      const value = Number(item?.value);

      if (!label || !Number.isFinite(value)) return null;

      return {
        key:
          typeof item?.key === "string" && item.key.trim()
            ? item.key.trim()
            : `metric_${index + 1}`,
        label,
        value,
      };
    })
    .filter(Boolean);
};

const normalizePayload = (payload = {}) => {
  const data = payload?.data || payload;
  const videos = sanitizeVideos(data?.videos);
  const stats = sanitizeStats(data?.stats);

  return {
    videos: videos.length ? videos : DEFAULT_HERO_CONTENT.videos,
    stats: stats.length ? stats : DEFAULT_HERO_CONTENT.stats,
    autoRotateMs: clampAutoRotateMs(data?.autoRotateMs),
    useStaticStats: data?.useStaticStats === true,
    useStaticVideos: data?.useStaticVideos !== false,
  };
};

export const fetchHeroContent = async () => {
  try {
    const response = await get(ENDPOINTS.GET_HERO_CONTENT);
    return normalizePayload(response?.data);
  } catch (error) {
    return { ...DEFAULT_HERO_CONTENT };
  }
};
