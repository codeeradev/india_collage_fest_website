import { useEffect, useState } from "react";
import { get } from "../../api/apiClient";
import { ENDPOINTS } from "../../api/endpoints";

const EventFilters = ({ filters, setFilters }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    get(ENDPOINTS.GET_CATEGORIES)
      .then((res) =>
        setCategories(res.data.category || [])
      )
      .catch(console.error);
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-5 shadow-[0_14px_36px_-30px_rgba(15,23,42,0.38)]">

      <h3 className="font-semibold text-base text-slate-900">Filters</h3>

      {/* CATEGORY */}
      <div>
        <label className="font-medium text-sm text-slate-700">Category</label>
        <select
          value={filters.category}
          onChange={(e) =>
            setFilters({
              ...filters,
              category: e.target.value,
            })
          }
          className="w-full border border-slate-200 rounded-xl px-3 py-2 mt-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
        >
          <option value="">All categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* PRICE */}
      <div>
        <label className="font-medium text-sm text-slate-700">Price</label>

        <label className="flex items-center gap-2 mt-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={filters.free}
            onChange={(e) =>
              setFilters({
                ...filters,
                free: e.target.checked,
                paid: false,
              })
            }
            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-200"
          />
          Free events
        </label>

        <label className="flex items-center gap-2 mt-1 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={filters.paid}
            onChange={(e) =>
              setFilters({
                ...filters,
                paid: e.target.checked,
                free: false,
              })
            }
            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-200"
          />
          Paid events
        </label>
      </div>

      {/* DATE */}
      <div>
        <label className="font-medium text-sm text-slate-700">When</label>

        <div className="flex gap-2 mt-2 flex-wrap">
          {["today", "tomorrow", "weekend"].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() =>
                setFilters({
                  ...filters,
                  date:
                    filters.date === d ? "" : d,
                })
              }
              className={`px-3 py-1 rounded-full border text-xs font-medium transition
                ${
                  filters.date === d
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white border-slate-200 hover:bg-slate-50"
                }
              `}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* MODE */}
      <div>
        <label className="font-medium text-sm text-slate-700">Mode</label>

        <div className="flex gap-2 mt-2 flex-wrap">
          {[
            { label: "All", value: "" },
            { label: "Online", value: "online" },
            { label: "Offline", value: "offline" },
          ].map((mode) => (
            <button
              key={mode.label}
              type="button"
              onClick={() =>
                setFilters({
                  ...filters,
                  mode: mode.value,
                })
              }
              className={`px-3 py-1 rounded-full border text-xs font-medium transition
                ${
                  filters.mode === mode.value
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white border-slate-200 hover:bg-slate-50"
                }
              `}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* RESET */}
      <button
        onClick={() =>
          setFilters({
            category: "",
            free: false,
            paid: false,
            date: "",
            mode: "",
          })
        }
        className="w-full border border-slate-200 rounded-xl py-2 text-sm font-medium hover:bg-slate-50 transition"
      >
        Reset filters
      </button>
    </div>
  );
};


export default EventFilters;
