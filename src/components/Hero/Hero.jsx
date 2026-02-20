import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoCarousel from "./VideoCarousel";
import { get } from "../../api/apiClient";
import { ENDPOINTS } from "../../api/endpoints";

const Hero = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await get(ENDPOINTS.GET_CATEGORIES);
        const list = res.data.category || [];
        setCategories(list.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="relative min-h-[78vh] md:min-h-[90vh] overflow-hidden select-none ambient-grid">
      <VideoCarousel />

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-900/72 to-cyan-950/72" />
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-blue-500/25 blur-3xl animate-float-y" />
      <div className="absolute -right-14 bottom-24 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl animate-float-x" />

      <div className="relative z-20 min-h-[78vh] md:min-h-[90vh]">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 pt-28 md:pt-36 pb-16 md:pb-20">
          <div className="max-w-4xl">
            <h1 className="mt-6 text-[2.15rem] leading-[1.02] sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white animate-enter-up">
              Events that feel worth
              <span className="block bg-gradient-to-r from-cyan-200 via-sky-100 to-amber-200 bg-clip-text text-transparent animate-gradient-flow">
                showing up for.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm sm:text-base md:text-lg text-white leading-relaxed animate-enter-up drop-shadow-[0_8px_24px_rgba(0,0,0,0.55)]">
              Discover concerts, campus fests, comedy nights, and creator-led experiences with a faster booking flow and cleaner discovery.
            </p>

            <div
              onClick={() => navigate("/events")}
              className="mt-8 cursor-text max-w-3xl rounded-3xl glass-card p-2.5 sm:p-3 animate-enter-up"
            >
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex flex-1 items-center gap-3 rounded-2xl bg-white/90 px-4 py-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-slate-500"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  <input
                    readOnly
                    type="text"
                    placeholder="Search events, artists, colleges, venues..."
                    className="w-full bg-transparent text-slate-900 placeholder:text-slate-500 focus:outline-none"
                  />
                </div>

                <button
                  type="button"
                  className="rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 px-7 py-3 text-white font-semibold shadow-lg shadow-blue-900/25 transition-all hover:shadow-blue-800/40 hover:-translate-y-0.5"
                >
                  Search Events
                </button>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2.5">
              {categories.map((cat, index) => (
                <button
                  key={cat?._id || cat?.id || `hero-category-${index}`}
                  onClick={() => navigate(`/events?category=${cat?._id || cat?.id || ""}`)}
                  style={{ animationDelay: `${index * 65}ms` }}
                  className="animate-enter-up rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[11px] font-semibold tracking-wide text-white transition-all hover:bg-white/20 hover:-translate-y-0.5"
                >
                  {cat?.name || "Category"}
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
