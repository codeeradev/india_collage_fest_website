import { useEffect, useState } from "react";
import { get } from "../../api/apiClient";
import { ENDPOINTS } from "../../api/endpoints";
import { useNavigate } from "react-router-dom";
import { resolveMediaUrl, withImageFallback } from "../../utils/mediaUrl";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await get(ENDPOINTS.GET_CATEGORIES);
        if (active) {
          setCategories(res.data.category || []);
        }
      } catch (error) {
        console.error("Failed to load categories", error);
        if (active) {
          setCategories([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchCategories();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="relative mt-6">
      <div className="section-shell rounded-[30px] p-6 md:p-8 lg:p-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-700">
              Discover Faster
            </p>
            <h2 className="mt-3 text-2xl md:text-3xl font-semibold text-slate-900">
              Browse by Category
            </h2>
            <p className="mt-2 text-sm md:text-base text-slate-600">
              Pick a vibe and jump straight into relevant events.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/events")}
            className="rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
          >
            View all categories
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-5">
          {loading &&
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`category-skeleton-${index}`}
                className="rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-[0_14px_28px_-24px_rgba(15,23,42,0.5)]"
              >
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 animate-shimmer" />
                <div className="mt-4 h-4 w-20 rounded bg-slate-200 animate-pulse" />
                <div className="mt-2 h-3 w-14 rounded bg-slate-100 animate-pulse" />
              </div>
            ))}

          {!loading &&
            categories.map((cat, index) => (
              <button
                key={cat?._id || cat?.id || `category-${index}`}
                type="button"
                onClick={() => navigate(`/events?category=${cat?._id || cat?.id || ""}`)}
                style={{ animationDelay: `${index * 70}ms` }}
                className="group relative rounded-2xl border border-slate-200/80 bg-white/95 p-4 text-left shadow-[0_14px_28px_-24px_rgba(15,23,42,0.5)] transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-[0_24px_42px_-24px_rgba(29,78,216,0.45)] animate-enter-up"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/80 to-cyan-50/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-cyan-50 to-white transition-transform duration-300 group-hover:scale-105">
                    <img
                      src={resolveMediaUrl(cat.icon, "/images/category-placeholder.svg")}
                      alt={cat?.name || "Category"}
                      className="h-8 w-8 object-contain"
                      onError={(event) => withImageFallback(event, "/images/category-placeholder.svg")}
                      loading="lazy"
                    />
                  </div>

                  <p className="mt-4 text-sm font-semibold text-slate-900">{cat?.name || "Category"}</p>
                  <p className="mt-1 text-xs text-slate-500">{cat.eventCount || 0} events</p>
                </div>
              </button>
            ))}

          {!loading && categories.length === 0 && (
            <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white/75 p-6 text-center text-sm text-slate-500">
              Categories are not available yet. They will appear here once published.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Categories;
