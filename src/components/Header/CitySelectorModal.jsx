import { useEffect, useState } from "react";
import { get } from "../../api/apiClient";
import { ENDPOINTS } from "../../api/endpoints";

const CitySelectorModal = ({ open, onClose, onSelect }) => {
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState("");

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

  const filteredCities = cities.filter(c =>
    c.city.toLowerCase().includes(search.toLowerCase())
  );

  const popularCities = cities.slice(0, 6);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-start pt-20">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Select Your Location to Continue
          </h2>
          <button onClick={onClose}>✕</button>
        </div>

        <input
          type="text"
          placeholder="Search city"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 mb-4"
        />

        {search === "" && (
          <>
            <p className="text-sm text-slate-500 mb-2">Popular Cities</p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
              {popularCities.map(city => (
                <button
                  key={city._id}
                  onClick={() => onSelect(city)}
                  className="border rounded-lg p-3 text-sm hover:border-indigo-500"
                >
                  {city.city}
                </button>
              ))}
            </div>
          </>
        )}

        <div className="max-h-64 overflow-y-auto border rounded-lg">
          {filteredCities.map(city => (
            <div
              key={city._id}
              onClick={() => onSelect(city)}
              className="px-4 py-2 cursor-pointer hover:bg-slate-100 text-sm"
            >
              {city.city}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CitySelectorModal;
