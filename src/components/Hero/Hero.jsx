import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../../api/apiClient";
import { ENDPOINTS } from "../../api/endpoints";
import { fetchHeroContent } from "../../api/heroService";
import { DEFAULT_HERO_CATEGORIES } from "../../config/heroDefaults";
import VideoCarousel from "./VideoCarousel";

const PILL_COLORS = [
  { bg: "rgba(56,189,248,0.12)", border: "rgba(56,189,248,0.45)", color: "#7dd3fc" },
  { bg: "rgba(168,85,247,0.12)", border: "rgba(168,85,247,0.45)", color: "#c4b5fd" },
  { bg: "rgba(249,115,22,0.12)", border: "rgba(249,115,22,0.45)", color: "#fdba74" },
  { bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.45)", color: "#6ee7b7" },
  { bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.45)", color: "#fca5a5" },
  { bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.45)", color: "#fcd34d" },
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes heroShimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes heroFloatOrbA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(18px, -24px) scale(1.08); }
        }

        @keyframes heroFloatOrbB {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, 22px) scale(1.06); }
        }

        .hero-fade-up-1 { animation: heroFadeUp 0.62s cubic-bezier(.22,1,.36,1) 0.1s both; }
        .hero-fade-up-2 { animation: heroFadeUp 0.62s cubic-bezier(.22,1,.36,1) 0.2s both; }
        .hero-fade-up-3 { animation: heroFadeUp 0.62s cubic-bezier(.22,1,.36,1) 0.3s both; }
        .hero-fade-up-4 { animation: heroFadeUp 0.62s cubic-bezier(.22,1,.36,1) 0.4s both; }

        .hero-title-gradient {
          background: linear-gradient(120deg, #bae6fd 0%, #e0f2fe 35%, #fde68a 68%, #fed7aa 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: heroShimmer 6s ease infinite;
        }

        .hero-orb-a { animation: heroFloatOrbA 9s ease-in-out infinite; }
        .hero-orb-b { animation: heroFloatOrbB 11s ease-in-out infinite; }
      `}</style>

      <section
        style={{
          position: "relative",
          minHeight: "min(920px, 100vh)",
          overflow: "hidden",
          userSelect: "none",
        }}
      >
        <VideoCarousel
          slides={heroContent.videos}
          autoRotateMs={heroContent.autoRotateMs}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 3,
            background:
              "linear-gradient(105deg, rgba(2,6,23,0.95) 0%, rgba(7,15,40,0.84) 42%, rgba(7,25,40,0.62) 72%, rgba(2,6,23,0.3) 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 4,
            background:
              "linear-gradient(to top, rgba(2,6,23,0.7) 0%, rgba(2,6,23,0.06) 48%, transparent 100%)",
          }}
        />

        <div
          className="hero-orb-a"
          style={{
            position: "absolute",
            left: -70,
            top: 50,
            width: 290,
            height: 290,
            zIndex: 4,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(56,189,248,0.2) 0%, transparent 70%)",
            filter: "blur(42px)",
          }}
        />

        <div
          className="hero-orb-b"
          style={{
            position: "absolute",
            right: -60,
            bottom: 90,
            width: 260,
            height: 260,
            zIndex: 4,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.17) 0%, transparent 70%)",
            filter: "blur(44px)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 5,
            opacity: 0.03,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "180px",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 10,
            minHeight: "min(920px, 100vh)",
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 1240,
              margin: "0 auto",
              paddingLeft: "clamp(1rem, 4vw, 2.2rem)",
              paddingRight: "clamp(1rem, 4vw, 2.2rem)",
              paddingTop: "clamp(108px, 14vw, 160px)",
              paddingBottom: "clamp(82px, 10vw, 120px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              className="hero-fade-up-1"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                width: "fit-content",
                background: "rgba(56,189,248,0.1)",
                border: "1px solid rgba(56,189,248,0.25)",
                borderRadius: 999,
                padding: "6px 14px",
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#38bdf8",
                  boxShadow: "0 0 8px #38bdf8",
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#7dd3fc",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                India&apos;s Premier Event Platform
              </span>
            </div>

            <div style={{ maxWidth: 780 }}>
              <h1
                className="hero-fade-up-2"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(2.1rem, 6.2vw, 5.1rem)",
                  lineHeight: 1,
                  color: "#fff",
                  margin: 0,
                  letterSpacing: "-0.02em",
                }}
              >
                Events that feel worth
                <span className="hero-title-gradient" style={{ display: "block", marginTop: 6 }}>
                  showing up for.
                </span>
              </h1>

              <p
                className="hero-fade-up-3"
                style={{
                  marginTop: 20,
                  fontSize: "clamp(0.96rem, 1.6vw, 1.08rem)",
                  color: "rgba(255,255,255,0.73)",
                  lineHeight: 1.7,
                  maxWidth: 580,
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 400,
                }}
              >
                Discover concerts, campus fests, comedy nights, and creator-led
                experiences with a faster booking flow and cleaner discovery.
              </p>
            </div>

            <div
              className="hero-fade-up-3"
              style={{
                marginTop: 32,
                width: "min(720px, 100%)",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 20,
                padding: 6,
                backdropFilter: "blur(18px) saturate(170%)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <button
                  type="button"
                  onClick={() => navigate("/events")}
                  style={{
                    flex: "1 1 320px",
                    minHeight: 52,
                    border: "none",
                    textAlign: "left",
                    borderRadius: 14,
                    background: "rgba(255,255,255,0.94)",
                    color: "#64748b",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 15,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "0 18px",
                    cursor: "pointer",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  <span>Search events, artists, venues...</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/events")}
                  style={{
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    borderRadius: 14,
                    minHeight: 52,
                    padding: "0 26px",
                    flex: "1 0 180px",
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: 15,
                    color: "#fff",
                    letterSpacing: "0.02em",
                    background: "linear-gradient(135deg, #1d4ed8 0%, #0ea5e9 100%)",
                    boxShadow:
                      "0 4px 20px rgba(14,165,233,0.35), 0 1px 0 rgba(255,255,255,0.1) inset",
                  }}
                >
                  Search Events
                </button>
              </div>
            </div>

            <div
              className="hero-fade-up-4"
              style={{
                marginTop: 18,
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                width: "min(760px, 100%)",
              }}
            >
              {categories.map((cat, index) => {
                const color = PILL_COLORS[index % PILL_COLORS.length];

                return (
                  <button
                    key={cat._id}
                    type="button"
                    onClick={() => navigate(`/events?category=${cat._id}`)}
                    style={{
                      borderRadius: 999,
                      padding: "7px 16px",
                      border: `1px solid ${color.border}`,
                      background: color.bg,
                      color: color.color,
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      cursor: "pointer",
                    }}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {stats.length > 0 && (
              <div
                className="hero-fade-up-4"
                style={{
                  marginTop: 44,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  flexWrap: "wrap",
                  width: "min(880px, 100%)",
                }}
              >
                {stats.map((item, index) => (
                  <div
                    key={item.key || item.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <span
                        style={{
                          fontFamily: "'Syne', sans-serif",
                          fontSize: "clamp(1.2rem, 2.4vw, 1.7rem)",
                          fontWeight: 800,
                          color: "#fff",
                          lineHeight: 1,
                        }}
                      >
                        {formatMetricValue(item.value)}
                      </span>
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 11,
                          fontWeight: 600,
                          color: "rgba(255,255,255,0.56)",
                          letterSpacing: "0.05em",
                          textTransform: "uppercase",
                        }}
                      >
                        {item.label}
                      </span>
                    </div>

                    {index < stats.length - 1 && (
                      <div
                        style={{
                          width: 1,
                          height: 34,
                          background: "rgba(255,255,255,0.14)",
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
