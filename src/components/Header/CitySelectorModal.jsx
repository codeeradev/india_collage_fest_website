import { useEffect, useState } from "react";
import { get } from "../../api/apiClient";
import { ENDPOINTS } from "../../api/endpoints";
import { BASE_URL } from "../../config/constants";
import { useCity } from "../../context/CityContext";


const CitySelectorModal = ({ open, onClose, onSelect }) => {
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState("");
  const [warning, setWarning] = useState(false);
  const [loading, setLoading] = useState(false);
const { city: selectedCity, setCity } = useCity();

  useEffect(() => {
    if (!open) return;

    const fetchCities = async () => {
      setLoading(true);
      try {
        const res = await get(ENDPOINTS.GET_CITIES);
        setCities(res?.data?.data || []);
      } catch (error) {
        console.error("City fetch failed:", error);
        setCities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [open]);

  if (!open) return null;

  const popularCities = cities.filter((c) => c.popular === true);
  const filteredCities = cities.filter((c) => 
    c.city.toLowerCase().includes(search.toLowerCase())
  );

  const handleClose = () => {
  if (!selectedCity) {
    setWarning(true);
    setTimeout(() => setWarning(false), 2500);
    return;
  }

  onClose(); // allow close if city already chosen
};


  const handleSelect = (city) => {
  setCity(city);       // saves globally + localStorage
  onSelect?.(city);   // optional if parent uses it
  onClose();
};

const selectedCityId = selectedCity?._id;

  return (
    <>
      {/* WARNING TOAST */}
      {warning && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[9999] animate-bounce-in">
          <div className="bg-white shadow-2xl border-l-4 border-amber-500 px-6 py-4 rounded-lg flex items-center gap-4 min-w-[320px]">
            <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">City selection required</p>
              <p className="text-xs text-gray-500 mt-0.5">Please choose a city to continue</p>
            </div>
          </div>
        </div>
      )}

      {/* BACKDROP */}
      <div className="fixed inset-0 z-[100] bg-gradient-to-br from-slate-900/60 via-slate-800/50 to-slate-900/60 backdrop-blur-md flex justify-center items-center p-4">
        <div 
          className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden animate-modal-in"
          style={{ maxHeight: '92vh' }}
        >
          {/* HEADER - Cleaner Design */}
          <div className="relative bg-gradient-to-r from-slate-50 to-white px-8 py-6 border-b border-slate-200">
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all group"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5 text-slate-600 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Select Your City
              </h2>
              <p className="text-slate-600 text-sm">
                Choose your location to discover local services and offerings
              </p>
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-8 overflow-y-auto" style={{ maxHeight: 'calc(92vh - 140px)' }}>
            
            {/* POPULAR CITIES - Featured Grid */}
            {search === "" && popularCities.length > 0 && (
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
                  <h3 className="text-lg font-bold text-slate-800">Popular Locations</h3>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {popularCities.map((city) => (
                    <button
                      key={city._id}
                      onClick={() => handleSelect(city)}
className={`group relative bg-white border-2 rounded-2xl p-5 transition-all duration-300 overflow-hidden
  ${
    selectedCityId === city._id
      ? "border-blue-500 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 scale-[1.02]"
      : "border-slate-200 hover:border-blue-400 hover:shadow-xl"
  }
`}
                    >
                      {/* Hover Effect Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="relative flex flex-col items-center gap-3">
                        {/* City Image/Icon */}
                        <div className="relative">
                          {city.image ? (
                            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 shadow-md group-hover:shadow-xl transition-shadow">
                              <img
                                src={`${BASE_URL}${city.image}`}
                                alt={city.city}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                              <div className="hidden w-full h-full items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">
                                <span className="text-3xl font-bold text-white">
                                  {city.city.charAt(0)}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md group-hover:shadow-xl flex items-center justify-center transition-shadow">
                              <span className="text-3xl font-bold text-white">
                                {city.city.charAt(0)}
                              </span>
                            </div>
                          )}
                          
                          {/* Verified Badge */}
                          {/* <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                            <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div> */}
                        </div>
                        
                        {/* City Name */}
                        <div className="text-center">
                          <span className="text-sm font-semibold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                            {city.city}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SEARCH SECTION */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-gradient-to-b from-slate-500 to-slate-600 rounded-full"></div>
                <h3 className="text-lg font-bold text-slate-800">
                  {search ? 'Search Results' : 'All Cities'}
                </h3>
                {filteredCities.length > 0 && (
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full">
                    {filteredCities.length}
                  </span>
                )}
              </div>

              {/* SEARCH BAR */}
              <div className="relative mb-5">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Type to search cities..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white outline-none transition-all text-sm placeholder:text-slate-400"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* CITIES LIST - Compact Modern Design */}
              <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                <div className="max-h-[380px] overflow-y-auto custom-scrollbar">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-16">
                      <div className="relative">
                        <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin"></div>
                      </div>
                      <p className="text-sm text-slate-500 mt-4">Loading cities...</p>
                    </div>
                  ) : filteredCities.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="w-16 h-16 mx-auto mb-4 bg-slate-200 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-slate-700">No cities found</p>
                      <p className="text-xs text-slate-500 mt-1">Try adjusting your search</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 p-2">
                      {filteredCities.map((city) => (
                        <button
                          key={city._id}
                          onClick={() => handleSelect(city)}
                          className="group relative bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 border border-slate-200 hover:border-blue-300 rounded-lg px-3 py-2.5 transition-all duration-200 text-left hover:shadow-md"
                        >
                          <div className="flex items-center gap-2">
                            <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-500 transition-colors" />
                            <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 truncate flex-1">
                              {city.city}
                            </span>
                            {city.popular && (
                              <svg className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-in {
          0% {
            transform: translate(-50%, -100%);
            opacity: 0;
          }
          50% {
            transform: translate(-50%, 10px);
          }
          100% {
            transform: translate(-50%, 0);
            opacity: 1;
          }
        }

        @keyframes modal-in {
          from {
            transform: scale(0.9) translateY(20px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        .animate-bounce-in {
          animation: bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .animate-modal-in {
          animation: modal-in 0.3s ease-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </>
  );
};

export default CitySelectorModal;