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
    <div className="bg-white rounded-xl border p-5 space-y-6 sticky top-24">

      <h3 className="font-semibold text-lg">Filters</h3>

      {/* CATEGORY */}
      <div>
        <label className="font-medium">Category</label>
        <select
          value={filters.category}
          onChange={(e) =>
            setFilters({
              ...filters,
              category: e.target.value,
            })
          }
          className="w-full border rounded-lg px-3 py-2 mt-1"
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
        <label className="font-medium">Price</label>

        <label className="flex gap-2 mt-2">
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
          />
          Free events
        </label>

        <label className="flex gap-2 mt-1">
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
          />
          Paid events
        </label>
      </div>

      {/* DATE */}
      <div>
        <label className="font-medium">When</label>

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
              className={`px-3 py-1 rounded-full border text-sm transition
                ${
                  filters.date === d
                    ? "bg-black text-white"
                    : "bg-white hover:bg-gray-100"
                }
              `}
            >
              {d}
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
          })
        }
        className="w-full border rounded-lg py-2 text-sm hover:bg-gray-50"
      >
        Reset filters
      </button>
    </div>
  );
};


export default EventFilters;
