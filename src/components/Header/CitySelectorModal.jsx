import { useCallback, useEffect, useRef, useState } from "react";
import { get } from "../../api/apiClient";
import { ENDPOINTS } from "../../api/endpoints";
import { useCity } from "../../context/CityContext";
import { Button } from "../ui/button";

const CITY_PAGE_SIZE = 60;
const SEARCH_DEBOUNCE_MS = 300;
const PRELOAD_OFFSET_PX = 260;

const getCitiesFromResponse = (payload) => {
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  if (Array.isArray(payload?.data?.cities)) return payload.data.cities;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.cities)) return payload.cities;
  return [];
};

const getPaginationFromResponse = (payload, fallbackPage) => {
  const pagination = payload?.pagination || payload?.data?.pagination || {};
  const pageValue =
    Number(pagination?.page ?? payload?.page ?? payload?.data?.page) ||
    fallbackPage;
  const totalValue =
    Number(
      pagination?.totalRecords ??
        pagination?.total ??
        payload?.total ??
        payload?.data?.total,
    ) || 0;
  const totalPagesValue =
    Number(
      pagination?.totalPages ??
        payload?.totalPages ??
        payload?.data?.totalPages,
    ) || (totalValue > 0 ? Math.ceil(totalValue / CITY_PAGE_SIZE) : 0);

  return {
    page: pageValue > 0 ? pageValue : fallbackPage,
    total: totalValue > 0 ? totalValue : 0,
    totalPages: totalPagesValue > 0 ? totalPagesValue : 0,
  };
};

const hasExplicitPagination = (payload) =>
  Boolean(
    payload?.pagination ||
      payload?.data?.pagination ||
      payload?.totalPages ||
      payload?.data?.totalPages ||
      payload?.total ||
      payload?.data?.total,
  );

const getCityKey = (city) => city?._id || city?.city || JSON.stringify(city);

const mergeCities = (existingCities, incomingCities) => {
  if (!Array.isArray(existingCities) || existingCities.length === 0) {
    return [...incomingCities];
  }

  const merged = [...existingCities];
  const seenKeys = new Set(existingCities.map(getCityKey));

  incomingCities.forEach((city) => {
    const cityKey = getCityKey(city);
    if (!seenKeys.has(cityKey)) {
      seenKeys.add(cityKey);
      merged.push(city);
    }
  });

  return merged;
};

const CitySelectorModal = ({ open, onClose, onSelect }) => {
  const [cities, setCities] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [warning, setWarning] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCities, setTotalCities] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const scrollContainerRef = useRef(null);
  const requestIdRef = useRef(0);
  const isFetchingRef = useRef(false);
  const pageRef = useRef(0);
  const hasMoreRef = useRef(true);
  const citiesRef = useRef([]);

  const { city: selectedCity, setCity } = useCity();

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);

  useEffect(() => {
    citiesRef.current = cities;
  }, [cities]);

  useEffect(() => {
    if (open) return;

    requestIdRef.current += 1;
    isFetchingRef.current = false;

    setCities([]);
    setSearchInput("");
    setSearchQuery("");
    setPage(0);
    setTotalPages(0);
    setTotalCities(0);
    setHasMore(true);
    setInitialLoading(false);
    setLoadingMore(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      setSearchQuery(searchInput.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [open, searchInput]);

  const fetchCitiesPage = useCallback(
    async (nextPage, { reset = false } = {}) => {
      if (!open) return;
      if (isFetchingRef.current) return;
      if (!reset && !hasMoreRef.current) return;

      isFetchingRef.current = true;

      if (reset) {
        setInitialLoading(true);
      } else {
        setLoadingMore(true);
      }

      const currentRequestId = ++requestIdRef.current;

      try {
        const params = {
          page: nextPage,
          limit: CITY_PAGE_SIZE,
        };

        if (searchQuery) {
          params.search = searchQuery;
        }

        const res = await get(ENDPOINTS.GET_CITIES, { params });

        if (currentRequestId !== requestIdRef.current) return;

        const payload = res?.data || {};
        const pageCities = getCitiesFromResponse(payload);
        const pagination = getPaginationFromResponse(payload, nextPage);

        const mergedCities = reset
          ? pageCities
          : mergeCities(citiesRef.current, pageCities);

        setCities(mergedCities);
        setPage(nextPage);
        setTotalPages(pagination.totalPages);
        setTotalCities(
          pagination.total > 0 ? pagination.total : mergedCities.length,
        );

        let canLoadMore = false;

        if (hasExplicitPagination(payload) && pagination.totalPages > 0) {
          canLoadMore = nextPage < pagination.totalPages;
        } else {
          canLoadMore = pageCities.length >= CITY_PAGE_SIZE;
        }

        if (pageCities.length === 0) {
          canLoadMore = false;
        }

        setHasMore(canLoadMore);
      } catch (error) {
        if (currentRequestId !== requestIdRef.current) return;

        console.error("City fetch failed:", error);
        if (reset) {
          setCities([]);
          setPage(0);
          setTotalPages(0);
          setTotalCities(0);
        }
        setHasMore(false);
      } finally {
        if (currentRequestId === requestIdRef.current) {
          setInitialLoading(false);
          setLoadingMore(false);
        }
        isFetchingRef.current = false;
      }
    },
    [open, searchQuery],
  );

  useEffect(() => {
    if (!open) return;

    requestIdRef.current += 1;
    isFetchingRef.current = false;

    setCities([]);
    setPage(0);
    setTotalPages(0);
    setTotalCities(0);
    setHasMore(true);

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }

    fetchCitiesPage(1, { reset: true });
  }, [open, searchQuery, fetchCitiesPage]);

  useEffect(() => {
    if (!open) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    const maybeLoadMore = () => {
      if (isFetchingRef.current || !hasMoreRef.current) return;

      const distanceToBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight;

      if (distanceToBottom <= PRELOAD_OFFSET_PX) {
        fetchCitiesPage(pageRef.current + 1);
      }
    };

    const handleScroll = () => {
      maybeLoadMore();
    };

    container.addEventListener("scroll", handleScroll, { passive: true });

    // When content is still short, keep preloading until scroll area is filled.
    maybeLoadMore();

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [open, fetchCitiesPage, cities.length, searchQuery]);

  const handleClose = () => {
    if (!selectedCity) {
      setWarning(true);
      setTimeout(() => setWarning(false), 2500);
      return;
    }

    onClose();
  };

  const handleSelect = (city) => {
    setCity(city);
    onSelect?.(city);
    onClose();
  };

  const isSearchActive = searchInput.trim().length > 0;
  const popularCities = isSearchActive
    ? []
    : cities.filter((city) => city?.popular === true);

  if (!open) return null;

  const selectedCityId = selectedCity?._id;
  const popularAccentGradients = [
    "from-sky-500 to-cyan-600",
    "from-blue-600 to-indigo-600",
    "from-cyan-600 to-blue-700",
    "from-indigo-500 to-sky-600",
  ];

  const cityCountLabel = totalCities || cities.length;

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
      <div
        className="fixed inset-0 z-[100] bg-gradient-to-br from-slate-900/60 via-slate-800/50 to-slate-900/60 backdrop-blur-md flex justify-center items-center p-4"
        onMouseDown={handleClose}
      >
        <div
          className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden animate-modal-in"
          style={{ maxHeight: "92vh" }}
          onMouseDown={(event) => event.stopPropagation()}
        >
          {/* HEADER */}
          <div className="relative bg-gradient-to-r from-slate-50 to-white px-8 py-6 border-b border-slate-200">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Select Your City
              </h2>
              <p className="text-slate-600 text-sm">
                Choose your location to discover local events and experiences
              </p>
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-8 overflow-y-auto" style={{ maxHeight: "calc(92vh - 140px)" }}>
            {/* POPULAR CITIES */}
            {!isSearchActive && popularCities.length > 0 && (
              <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-600">
                      Popular Cities
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900">Quick Picks</h3>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {popularCities.length}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {popularCities.map((city, index) => (
                    <Button
                      key={city._id}
                      type="button"
                      variant="ghost"
                      onClick={() => handleSelect(city)}
                      className={`group flex h-16 w-full items-center gap-3 rounded-xl border px-3.5 text-left transition-all duration-200 ${
                        selectedCityId === city._id
                          ? "border-blue-500 bg-blue-50 ring-1 ring-blue-100"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-sm font-semibold text-white ${
                          popularAccentGradients[index % popularAccentGradients.length]
                        }`}
                      >
                        {(city.city || "C").charAt(0).toUpperCase()}
                      </div>
                      <span className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-900">
                        {city.city}
                      </span>
                      {selectedCityId === city._id ? (
                        <svg className="h-4 w-4 flex-shrink-0 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="h-4 w-4 flex-shrink-0 text-slate-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* SEARCH SECTION */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-gradient-to-b from-slate-500 to-slate-600 rounded-full"></div>
                <h3 className="text-lg font-bold text-slate-800">
                  {isSearchActive ? "Search Results" : "All Cities"}
                </h3>
                {cityCountLabel > 0 && (
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full">
                    {cityCountLabel}
                  </span>
                )}
                {totalPages > 0 && (
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                    Page {page || 1}
                    {totalPages > 1 ? ` / ${totalPages}` : ""}
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
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white outline-none transition-all text-sm placeholder:text-slate-400"
                />
              </div>

              {/* CITIES LIST */}
              <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                <div ref={scrollContainerRef} className="max-h-[380px] overflow-y-auto custom-scrollbar">
                  {initialLoading && cities.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16">
                      <div className="relative">
                        <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin"></div>
                      </div>
                      <p className="text-sm text-slate-500 mt-4">Loading cities...</p>
                    </div>
                  ) : cities.length === 0 ? (
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
                    <>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 p-2">
                        {cities.map((city) => (
                          <Button
                            key={city._id}
                            type="button"
                            variant="ghost"
                            onClick={() => handleSelect(city)}
                            className={`group relative h-auto w-full rounded-lg border px-3 py-2.5 text-left transition-all duration-200 ${
                              selectedCityId === city._id
                                ? "border-blue-300 bg-blue-50"
                                : "border-slate-200 bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 hover:shadow-md"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className={`flex-shrink-0 w-1.5 h-1.5 rounded-full transition-colors ${
                                  selectedCityId === city._id
                                    ? "bg-blue-500"
                                    : "bg-slate-300 group-hover:bg-blue-500"
                                }`}
                              />
                              <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 truncate flex-1">
                                {city.city}
                              </span>
                              {city.popular && (
                                <svg className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              )}
                            </div>
                          </Button>
                        ))}
                      </div>

                      {loadingMore && (
                        <div className="flex items-center justify-center gap-2 py-4">
                          <div className="h-4 w-4 rounded-full border-2 border-slate-300 border-t-blue-500 animate-spin"></div>
                          <p className="text-xs text-slate-500">Loading more cities...</p>
                        </div>
                      )}

                      {!hasMore && cities.length > 0 && (
                        <p className="py-4 text-center text-xs text-slate-500">
                          You&rsquo;ve reached the end of the city list
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
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
