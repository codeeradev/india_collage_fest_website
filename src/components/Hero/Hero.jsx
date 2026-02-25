import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../../api/apiClient";
import { ENDPOINTS } from "../../api/endpoints";
import { fetchHeroContent } from "../../api/heroService";
import { DEFAULT_HERO_CATEGORIES } from "../../config/heroDefaults";
import VideoCarousel from "./VideoCarousel";

const PILL_COLORS = [
  { bg: "rgba(14,165,233,0.10)", border: "rgba(14,165,233,0.35)", color: "#0369a1" },
  { bg: "rgba(59,130,246,0.10)", border: "rgba(59,130,246,0.35)", color: "#1d4ed8" },
  { bg: "rgba(245,158,11,0.10)", border: "rgba(245,158,11,0.35)", color: "#b45309" },
  { bg: "rgba(16,185,129,0.10)", border: "rgba(16,185,129,0.35)", color: "#047857" },
  { bg: "rgba(239,68,68,0.10)", border: "rgba(239,68,68,0.35)", color: "#b91c1c" },
  { bg: "rgba(168,85,247,0.10)", border: "rgba(168,85,247,0.35)", color: "#7e22ce" },
];

const formatMetricValue = (value) => {
  const numberValue = Number(value);

  if (!Number.isFinite(numberValue)) {
    return value;
  }

  return Math.round(numberValue).toLocaleString("en-IN");
};

const Hero = () => {
  const navigate = useNavigate();
  const [heroContent, setHeroContent] = useState({
    videos: [],
    stats: [],
    autoRotateMs: 6500,
  });
  const [categories, setCategories] = useState(DEFAULT_HERO_CATEGORIES);

  useEffect(() => {
    let active = true;

    const loadHero = async () => {
      const [heroResult, categoryResult] = await Promise.allSettled([
        fetchHeroContent(),
        get(ENDPOINTS.GET_CATEGORIES),
      ]);

      if (!active) return;

      if (heroResult.status === "fulfilled") {
        setHeroContent(heroResult.value);
      }

      if (categoryResult.status === "fulfilled") {
        const apiCategories = categoryResult.value?.data?.category;

        if (Array.isArray(apiCategories) && apiCategories.length) {
          setCategories(
            apiCategories
              .filter((item) => item?.name)
              .slice(0, 6)
              .map((item) => ({
                _id: item._id || item.id || item.name,
                name: item.name,
              })),
          );
        }
      }
    };

    loadHero();

    return () => {
      active = false;
    };
  }, []);

  const stats = useMemo(() => {
    if (!Array.isArray(heroContent?.stats)) return [];
    return heroContent.stats.filter((item) => item?.label).slice(0, 4);
  }, [heroContent?.stats]);

  return (
    <section className="relative min-h-[700px] overflow-hidden pt-32 md:pt-36 lg:pt-40">
      <VideoCarousel slides={heroContent.videos} autoRotateMs={heroContent.autoRotateMs} />

      <div className="absolute inset-0 z-[3] bg-[linear-gradient(180deg,rgba(248,251,255,0.72)_0%,rgba(244,248,255,0.92)_35%,rgba(240,246,255,0.98)_100%)]" />
      <div className="ambient-grid absolute inset-0 z-[4] opacity-60" />
      <div className="pointer-events-none absolute -left-20 top-10 z-[4] h-56 w-56 rounded-full bg-blue-300/35 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-20 z-[4] h-52 w-52 rounded-full bg-cyan-300/35 blur-3xl" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 pb-14 text-center md:px-6 lg:px-8 lg:pb-20">
        <span className="animate-enter-up rounded-full border border-blue-200 bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-700">
          India&apos;s premier event platform
        </span>

        <h1 className="animate-enter-up mt-5 max-w-4xl text-4xl font-extrabold leading-[1.08] text-slate-900 sm:text-5xl lg:text-6xl">
          Events that feel worth
          <span className="block mt-1 text-blue-800">
            showing up for.
          </span>
        </h1>

        <p className="animate-enter-up mt-4 max-w-2xl text-sm font-medium leading-6 text-slate-600 sm:text-base">
          Discover and book amazing experiences, from concerts to conferences.
        </p>

        <div className="animate-enter-up mt-7 w-full max-w-4xl rounded-2xl border border-slate-200 bg-white/95 p-2.5 shadow-[0_16px_36px_-24px_rgba(15,23,42,0.35)]">
          <div className="grid grid-cols-1 gap-2.5 md:grid-cols-[1.45fr_0.85fr_auto]">
            <button
              type="button"
              onClick={() => navigate("/events")}
              className="flex min-h-[52px] items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 text-left text-sm font-medium text-slate-600 transition-colors hover:border-blue-200 hover:bg-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 shrink-0 text-slate-400"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <span>Search events</span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/events")}
              className="flex min-h-[52px] items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 text-left text-xs font-semibold text-slate-500 transition-colors hover:border-blue-200 hover:bg-white sm:text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 shrink-0 text-slate-400"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>Any date</span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/events")}
              className="min-h-[52px] rounded-xl bg-slate-900 px-6 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              Search
            </button>
          </div>
        </div>

        <div className="mt-5 flex w-full max-w-4xl flex-wrap items-center justify-center gap-2">
          {categories.map((cat, index) => {
            const color = PILL_COLORS[index % PILL_COLORS.length];

            return (
              <button
                key={cat._id}
                type="button"
                onClick={() => navigate(`/events?category=${cat._id}`)}
                className="rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-[0.03em]"
                style={{
                  border: `1px solid ${color.border}`,
                  background: color.bg,
                  color: color.color,
                }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {stats.length > 0 && (
          <div className="mt-8 grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((item) => (
              <div
                key={item.key || item.label}
                className="section-shell rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-left"
              >
                <p className="text-xl font-extrabold leading-none text-slate-900 md:text-2xl">
                  {formatMetricValue(item.value)}
                </p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
