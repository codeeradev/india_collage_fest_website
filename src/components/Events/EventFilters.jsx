import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { get } from "../../api/apiClient";
import { ENDPOINTS } from "../../api/endpoints";
import { Button } from "../ui/button";

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

  const chipClass = (active, withCapitalize = false) =>
    `rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
      withCapitalize ? "capitalize" : ""
    } ${
      active
        ? "border-blue-600 bg-blue-600 text-white shadow-[0_8px_18px_-12px_rgba(37,99,235,0.8)]"
        : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50/60"
    }`;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/85 bg-gradient-to-br from-white via-white to-slate-50 p-4 shadow-[0_24px_54px_-40px_rgba(15,23,42,0.55)] md:p-5">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-r from-blue-50/80 via-cyan-50/60 to-transparent" />

      <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/75 pb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-700">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M7 12h10M10 18h4" />
            </svg>
          </span>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Event filters
            </p>
            <h3 className="mt-0.5 text-base font-semibold text-slate-900">Refine results</h3>
          </div>
        </div>

        <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          {activeFilterCount} active
        </span>
      </div>

      <div className="relative mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        <div className="h-full rounded-xl border border-slate-200/80 bg-slate-50/70 p-3">
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
            className="mt-2.5 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-700 shadow-sm transition focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="">All categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="h-full rounded-xl border border-slate-200/80 bg-slate-50/70 p-3">
          <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Price
          </label>

          <div className="mt-2.5 flex flex-wrap gap-2">
            {[
              { label: "All", value: "all" },
              { label: "Free", value: "free" },
              { label: "Paid", value: "paid" },
            ].map((price) => (
              <Button
                key={price.value}
                type="button"
                onClick={() => setPriceFilter(price.value)}
                className={chipClass(selectedPrice === price.value)}
              >
                {price.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="h-full rounded-xl border border-slate-200/80 bg-slate-50/70 p-3">
          <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            When
          </label>

          <div className="mt-2.5 flex flex-wrap gap-2">
            {DATE_FILTERS.map((dateKey) => (
              <Button
                key={dateKey}
                type="button"
                onClick={() =>
                  setFilters({
                    ...filters,
                    date: filters.date === dateKey ? "" : dateKey,
                  })
                }
                className={chipClass(filters.date === dateKey, true)}
              >
                {dateKey}
              </Button>
            ))}
          </div>
        </div>

        <div className="h-full rounded-xl border border-slate-200/80 bg-slate-50/70 p-3">
          <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Mode
          </label>

          <div className="mt-2.5 flex flex-wrap gap-2">
            {MODE_FILTERS.map((mode) => (
              <Button
                key={mode.label}
                type="button"
                onClick={() =>
                  setFilters({
                    ...filters,
                    mode: mode.value,
                  })
                }
                className={chipClass(filters.mode === mode.value)}
              >
                {mode.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mt-4 rounded-2xl border border-slate-200/80 bg-white p-2 shadow-[0_10px_24px_-24px_rgba(15,23,42,0.55)]">
        <Button
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
          className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <svg className="h-4 w-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12a9 9 0 109-9" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4v8h8" />
          </svg>
          <span>Reset filters</span>
        </Button>
      </div>
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


