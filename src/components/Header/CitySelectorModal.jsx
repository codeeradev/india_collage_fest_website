import { useEffect, useState } from "react";
import { get } from "../../api/apiClient";
import { ENDPOINTS } from "../../api/endpoints";

const CitySelectorModal = ({ open, onClose, onSelect }) => {
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState("");
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    if (!open) return;

    const fetchCities = async () => {
      try {
        const res = await get(ENDPOINTS.GET_CITIES);
        setCities(res?.data?.data || []);
      } catch (error) {
        console.error("City fetch failed:", error);
        setCities([]);
      }
    };

    fetchCities();
  }, [open]);

  if (!open) return null;

  const filteredCities = cities.filter((c) =>
    c.city.toLowerCase().includes(search.toLowerCase())
  );

  const popularCities = cities.slice(0, 6);

  const handleClose = () => {
    // 🔥 show warning instead of closing
    setWarning(true);

    setTimeout(() => {
      setWarning(false);
    }, 2000);
  };

  return (
    <>
      {/* 🔔 WARNING POPUP */}
      {warning && (
        <div className="fixed top-6 right-6 z-[999] bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg text-sm animate-bounce">
          ⚠️ Please select a city to continue
        </div>
      )}

      {/* BACKDROP */}
      <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-start pt-20">
        <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-6 relative">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Select your city to continue
            </h2>

            {/* ❌ BLOCK CLOSE */}
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-red-500 text-xl font-semibold"
            >
              ×
            </button>
          </div>

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl px-4 py-2 mb-5 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          {/* POPULAR */}
          {search === "" && (
            <>
              <p className="text-sm text-slate-500 mb-2">
                Popular cities
              </p>

              <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-5">
                {popularCities.map((city) => (
                  <button
                    key={city._id}
                    onClick={() => onSelect(city)}
                    className="border rounded-xl p-3 text-sm hover:border-indigo-600 hover:bg-indigo-50 transition"
                  >
                    {city.city}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* ALL CITIES */}
          <div className="max-h-72 overflow-y-auto border rounded-xl divide-y">
            {filteredCities.map((city) => (
              <div
                key={city._id}
                onClick={() => onSelect(city)}
                className="px-4 py-3 cursor-pointer hover:bg-slate-100 text-sm transition"
              >
                {city.city}
              </div>
            ))}

            {filteredCities.length === 0 && (
              <p className="text-center text-sm text-gray-500 py-6">
                No cities found
              </p>
            )}
          </div>

          {/* FOOTER NOTE */}
          <p className="text-xs text-center text-gray-400 mt-4">
            You must select a city before continuing
          </p>
        </div>
      </div>
    </>
  );
};

export default CitySelectorModal;
