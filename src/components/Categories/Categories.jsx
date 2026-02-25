import { useEffect, useState } from "react";
import { get } from "../../api/apiClient";
import { ENDPOINTS } from "../../api/endpoints";
import { useNavigate } from "react-router-dom";
import { resolveMediaUrl, withImageFallback } from "../../utils/mediaUrl";
import { Button } from "../ui/button";

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
    <section className="relative">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Browse by Category
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground md:text-base">
            Find events that match your interests
          </p>
        </div>

        <Button
          type="button"
          variant="ghost"
          onClick={() => navigate("/events")}
          className="h-auto rounded-full px-3 py-1.5 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50 hover:text-blue-800 md:text-base"
        >
          View all
          <span aria-hidden="true">-&gt;</span>
        </Button>
      </div>

      <div className="flex flex-wrap gap-3 md:gap-4">
        {loading &&
          Array.from({ length: 8 }).map((_, index) => (
            <div
              key={`category-skeleton-${index}`}
              className="w-[170px] rounded-3xl border border-border bg-card px-4 py-6"
            >
              <div className="mx-auto h-14 w-14 rounded-2xl bg-muted animate-shimmer" />
              <div className="mx-auto mt-4 h-4 w-20 rounded bg-muted animate-pulse" />
            </div>
          ))}

        {!loading &&
          categories.map((cat, index) => (
            <Button
              key={cat?._id || cat?.id || `category-${index}`}
              type="button"
              variant="ghost"
              onClick={() => navigate(`/events?category=${cat?._id || cat?.id || ""}`)}
              style={{ animationDelay: `${index * 70}ms` }}
              className="group relative h-[200px] w-[170px] animate-enter-up rounded-3xl border border-border bg-card px-4 py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-card hover:shadow-[0_12px_26px_-18px_rgba(15,23,42,0.35)]"
            >
              <div className="absolute inset-0 rounded-3xl bg-muted/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={resolveMediaUrl(cat.icon, "/images/category-placeholder.svg")}
                    alt={cat?.name || "Category"}
                    className="h-6 w-6 object-contain"
                    onError={(event) => withImageFallback(event, "/images/category-placeholder.svg")}
                    loading="lazy"
                  />
                </div>

                <p className="mt-4 text-sm font-semibold leading-tight text-foreground md:text-base">{cat?.name || "Category"}</p>
              </div>
            </Button>
          ))}

        {!loading && categories.length === 0 && (
          <div className="col-span-full rounded-3xl border border-dashed border-border bg-card/75 p-6 text-center text-sm text-muted-foreground">
            Categories are not available yet. They will appear here once published.
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;


