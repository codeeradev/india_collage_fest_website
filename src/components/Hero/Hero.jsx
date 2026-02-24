import { useEffect, useState, useMemo } from "react";

/* ─── Inline VideoCarousel ─────────────────────────────────────────────── */
const VideoCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loaded, setLoaded] = useState({});

  const slides = useMemo(() => [
    { src: "https://storage.googleapis.com/ticket9-prod.appspot.com/videos/1765955266059_sport.mp4", title: "Sports" },
    { src: "https://storage.googleapis.com/ticket9-prod.appspot.com/videos/1765955219308_concert.mp4", title: "Concerts" },
    { src: "https://storage.googleapis.com/ticket9-prod.appspot.com/videos/1765955295343_music.mp4", title: "Music" },
  ], []);

  useEffect(() => {
    const timer = setInterval(() => setActiveIndex(p => (p + 1) % slides.length), 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          style={{
            position: "absolute", inset: 0,
            transition: "opacity 1400ms ease",
            opacity: activeIndex === index ? 1 : 0,
            zIndex: activeIndex === index ? 2 : 1,
          }}
        >
          <video
            src={slide.src}
            autoPlay loop muted playsInline preload="metadata"
            onLoadedData={() => setLoaded(p => ({ ...p, [index]: true }))}
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%", objectFit: "cover",
              transform: activeIndex === index ? "scale(1.05)" : "scale(1)",
              transition: "transform 7000ms ease",
            }}
          />
        </div>
      ))}

      {/* Dot indicators */}
      <div style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
        zIndex: 30, display: "flex", alignItems: "center", gap: 8,
        borderRadius: 999, background: "rgba(2,6,23,0.5)",
        border: "1px solid rgba(255,255,255,0.15)",
        padding: "8px 14px", backdropFilter: "blur(12px)",
      }}>
        {slides.map((slide, index) => (
          <button
            key={slide.title} type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${slide.title}`}
            style={{
              height: 10, borderRadius: 999, border: "none", cursor: "pointer",
              transition: "all 300ms ease",
              width: activeIndex === index ? 32 : 10,
              background: activeIndex === index ? "#fff" : "rgba(255,255,255,0.35)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

/* ─── Category pill colours ─────────────────────────────────────────────── */
const PILL_COLORS = [
  { bg: "rgba(56,189,248,0.12)", border: "rgba(56,189,248,0.4)", color: "#7dd3fc" },
  { bg: "rgba(168,85,247,0.12)", border: "rgba(168,85,247,0.4)", color: "#c4b5fd" },
  { bg: "rgba(249,115,22,0.12)", border: "rgba(249,115,22,0.4)", color: "#fdba74" },
  { bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.4)", color: "#6ee7b7" },
  { bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.4)", color: "#fca5a5" },
];

/* ─── Main Hero ─────────────────────────────────────────────────────────── */
const Hero = () => {
  // mock navigate / categories for demo
  const navigate = (path) => console.log("Navigate to:", path);
  const [categories] = useState([
    { _id: "1", name: "Concerts" },
    { _id: "2", name: "College Fests" },
    { _id: "3", name: "Comedy" },
    { _id: "4", name: "Sports" },
    { _id: "5", name: "Creator Events" },
  ]);

  const [hoverSearch, setHoverSearch] = useState(false);
  const [hoverBtn, setHoverBtn] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes floatOrb1 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50%       { transform: translate(20px, -30px) scale(1.08); }
        }
        @keyframes floatOrb2 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50%       { transform: translate(-24px, 20px) scale(1.06); }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }

        .hero-title-gradient {
          background: linear-gradient(120deg, #bae6fd 0%, #e0f2fe 30%, #fde68a 65%, #fed7aa 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 5s ease infinite;
        }

        .hero-fade-up-1 { animation: heroFadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.15s both; }
        .hero-fade-up-2 { animation: heroFadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.3s both; }
        .hero-fade-up-3 { animation: heroFadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.45s both; }
        .hero-fade-up-4 { animation: heroFadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.6s both; }

        .search-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(20px) saturate(180%);
          border-radius: 20px;
          padding: 6px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .search-card:hover {
          border-color: rgba(125,211,252,0.3);
          box-shadow: 0 0 0 1px rgba(125,211,252,0.15), 0 20px 60px rgba(0,0,0,0.4);
        }

        .search-input-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
          background: rgba(255,255,255,0.92);
          border-radius: 14px;
          padding: 13px 18px;
        }

        .search-btn {
          border: none;
          outline: none;
          cursor: pointer;
          border-radius: 14px;
          padding: 13px 28px;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 15px;
          color: #fff;
          letter-spacing: 0.02em;
          background: linear-gradient(135deg, #1d4ed8 0%, #0ea5e9 100%);
          box-shadow: 0 4px 20px rgba(14,165,233,0.35), 0 1px 0 rgba(255,255,255,0.1) inset;
          transition: transform 0.18s, box-shadow 0.18s;
          white-space: nowrap;
        }
        .search-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(14,165,233,0.5);
        }

        .category-pill {
          border-radius: 999px;
          padding: 7px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.04em;
          cursor: pointer;
          border: 1px solid;
          transition: transform 0.15s, opacity 0.15s, box-shadow 0.15s;
        }
        .category-pill:hover {
          transform: translateY(-2px);
          opacity: 0.9;
          box-shadow: 0 4px 16px rgba(0,0,0,0.3);
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .stat-num {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: #fff;
          line-height: 1;
        }
        .stat-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .stat-divider {
          width: 1px;
          height: 36px;
          background: rgba(255,255,255,0.12);
        }
      `}</style>

      <section style={{
        position: "relative",
        minHeight: "92vh",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
        userSelect: "none",
      }}>
        {/* Video layer */}
        <VideoCarousel />

        {/* Gradient overlays — richer than before */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 3,
          background: "linear-gradient(105deg, rgba(2,6,23,0.95) 0%, rgba(7,15,40,0.82) 40%, rgba(7,25,40,0.6) 70%, rgba(2,6,23,0.3) 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0, zIndex: 4,
          background: "linear-gradient(to top, rgba(2,6,23,0.7) 0%, transparent 50%)",
        }} />

        {/* Ambient orbs */}
        <div style={{
          position: "absolute", left: -80, top: 60, width: 320, height: 320, zIndex: 4,
          borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 70%)",
          filter: "blur(40px)", animation: "floatOrb1 8s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", right: -60, bottom: 100, width: 280, height: 280, zIndex: 4,
          borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          filter: "blur(40px)", animation: "floatOrb2 10s ease-in-out infinite",
        }} />

        {/* Subtle noise/grain overlay */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 5, opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 10, minHeight: "92vh", display: "flex", flexDirection: "column" }}>
          <div style={{
            maxWidth: 1200, margin: "0 auto",
            padding: "0 32px",
            paddingTop: "clamp(100px, 14vw, 160px)",
            paddingBottom: 80,
            flex: 1,
          }}>
            {/* Eyebrow tag */}
            <div className="hero-fade-up-1" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.25)",
              borderRadius: 999, padding: "6px 14px", marginBottom: 20,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#38bdf8", boxShadow: "0 0 8px #38bdf8" }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#7dd3fc", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                India's Premier Event Platform
              </span>
            </div>

            {/* Headline */}
            <div style={{ maxWidth: 760 }}>
              <h1 className="hero-fade-up-2" style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2.4rem, 6vw, 5.2rem)",
                lineHeight: 1.0,
                color: "#fff",
                margin: 0,
                letterSpacing: "-0.02em",
              }}>
                Events that feel worth
                <span className="hero-title-gradient" style={{ display: "block", marginTop: 6 }}>
                  showing up for.
                </span>
              </h1>

              <p className="hero-fade-up-3" style={{
                marginTop: 24,
                fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.7,
                maxWidth: 520,
                fontWeight: 300,
              }}>
                Discover concerts, campus fests, comedy nights, and creator-led experiences — with a faster booking flow and cleaner discovery.
              </p>
            </div>

            {/* Search card */}
            <div className="hero-fade-up-3 search-card" style={{ marginTop: 36, maxWidth: 640 }}>
              <div style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center" }}>
                <div className="search-input-wrap" style={{ cursor: "text" }} onClick={() => navigate("/events")}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                  </svg>
                  <input
                    readOnly
                    placeholder="Search events, artists, venues..."
                    style={{
                      border: "none", outline: "none", background: "transparent",
                      fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#1e293b",
                      width: "100%", cursor: "text",
                    }}
                  />
                </div>
                <button className="search-btn" onClick={() => navigate("/events")}>
                  Search Events
                </button>
              </div>
            </div>

            {/* Category pills */}
            <div className="hero-fade-up-4" style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 10 }}>
              {categories.map((cat, index) => {
                const c = PILL_COLORS[index % PILL_COLORS.length];
                return (
                  <button
                    key={cat._id}
                    className="category-pill"
                    onClick={() => navigate(`/events?category=${cat._id}`)}
                    style={{
                      background: c.bg, borderColor: c.border, color: c.color,
                      animationDelay: `${0.6 + index * 0.07}s`,
                    }}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* Stats row */}
            <div className="hero-fade-up-4" style={{
              marginTop: 56,
              display: "flex", alignItems: "center", gap: 28,
              flexWrap: "wrap",
            }}>
              {[
                { num: "12K+", label: "Events Listed" },
                { num: "800+", label: "Colleges" },
                { num: "2M+", label: "Tickets Sold" },
              ].map((s, i) => (
                <>
                  <div key={s.label} className="stat-item">
                    <span className="stat-num">{s.num}</span>
                    <span className="stat-label">{s.label}</span>
                  </div>
                  {i < 2 && <div key={`div-${i}`} className="stat-divider" />}
                </>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;