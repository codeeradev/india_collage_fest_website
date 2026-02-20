import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { get } from "../../api/apiClient";
import { ENDPOINTS } from "../../api/endpoints";

const DATE_FILTERS = ["today", "tomorrow", "weekend"];

const MODE_FILTERS = [
  { label: "All", value: "" },
  { label: "Online", value: "online" },
  { label: "Offline", value: "offline" },
];

const EventFilters = ({ filters, setFilters }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    get(ENDPOINTS.GET_CATEGORIES)
      .then((res) => setCategories(res.data.category || []))
      .catch(console.error);
  }, []);

  const activeFilterCount =
    (filters.category ? 1 : 0) +
    (filters.free || filters.paid ? 1 : 0) +
    (filters.date ? 1 : 0) +
    (filters.mode ? 1 : 0);

  const selectedPrice = filters.free ? "free" : filters.paid ? "paid" : "all";

  const setPriceFilter = (priceType) => {
    if (priceType === "free") {
      setFilters({ ...filters, free: true, paid: false });
      return;
    }

    if (priceType === "paid") {
      setFilters({ ...filters, free: false, paid: true });
      return;
    }

    setFilters({ ...filters, free: false, paid: false });
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.38)] md:p-5">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-r from-blue-50/80 via-cyan-50/60 to-transparent" />

      <div className="relative flex items-start justify-between gap-3 pb-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Event filters
          </p>
          <h3 className="mt-1 text-base font-semibold text-slate-900">Refine results</h3>
        </div>

        <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
          {activeFilterCount} active
        </span>
      </div>

      <div className="relative grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(210px,1fr))]">
        <div className="h-full rounded-xl border border-slate-200 bg-slate-50/70 p-3">
          <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Category
          </label>

          <select
            value={filters.category}
            onChange={(event) =>
              setFilters({
                ...filters,
                category: event.target.value,
              })
            }
            className="mt-2 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="">All categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="h-full rounded-xl border border-slate-200 bg-slate-50/70 p-3">
          <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Price
          </label>

          <div className="mt-2 flex flex-wrap gap-2">
            {[
              { label: "All", value: "all" },
              { label: "Free", value: "free" },
              { label: "Paid", value: "paid" },
            ].map((price) => (
              <button
                key={price.value}
                type="button"
                onClick={() => setPriceFilter(price.value)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  selectedPrice === price.value
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {price.label}
              </button>
            ))}
          </div>
        </div>

        <div className="h-full rounded-xl border border-slate-200 bg-slate-50/70 p-3">
          <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            When
          </label>

          <div className="mt-2 flex flex-wrap gap-2">
            {DATE_FILTERS.map((dateKey) => (
              <button
                key={dateKey}
                type="button"
                onClick={() =>
                  setFilters({
                    ...filters,
                    date: filters.date === dateKey ? "" : dateKey,
                  })
                }
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold capitalize transition ${
                  filters.date === dateKey
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {dateKey}
              </button>
            ))}
          </div>
        </div>

        <div className="h-full rounded-xl border border-slate-200 bg-slate-50/70 p-3">
          <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Mode
          </label>

          <div className="mt-2 flex flex-wrap gap-2">
            {MODE_FILTERS.map((mode) => (
              <button
                key={mode.label}
                type="button"
                onClick={() =>
                  setFilters({
                    ...filters,
                    mode: mode.value,
                  })
                }
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  filters.mode === mode.value
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() =>
          setFilters({
            category: "",
            free: false,
            paid: false,
            date: "",
            mode: "",
          })
        }
        className="relative mt-3 w-full rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
      >
        Reset filters
      </button>
    </div>
  );
};

EventFilters.propTypes = {
  filters: PropTypes.shape({
    category: PropTypes.string,
    free: PropTypes.bool,
    paid: PropTypes.bool,
    date: PropTypes.string,
    mode: PropTypes.string,
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default EventFilters;
