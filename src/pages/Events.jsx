import { useCallback, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import EventFilters from "../components/Events/EventFilters";
import { get } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";
import EmptyState from "../components/EmptyState";
import { resolveEventImageUrl, withImageFallback } from "../utils/mediaUrl";
import { Button } from "../components/ui/button";

const parseBool = (value) => value === "true" || value === "1";
const parseMode = (value) =>
  value === "online" || value === "offline" ? value : "";

const buildFiltersFromParams = (searchParams) => {
  const free = parseBool(searchParams.get("free"));
  const paid = !free && parseBool(searchParams.get("paid"));

  return {
    category: searchParams.get("category") || "",
    free,
    paid,
    date: searchParams.get("date") || "",
    mode: parseMode(searchParams.get("mode")),
  };
};

const Events = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(() => buildFiltersFromParams(params));
  const [searchInput, setSearchInput] = useState(params.get("search") || "");

  const search = params.get("search");

  useEffect(() => {
    setFilters(buildFiltersFromParams(params));
    setSearchInput(params.get("search") || "");
  }, [params]);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);

      const res = await get(ENDPOINTS.GET_EVENTS, {
        params: {
          categoryId: filters.category,
          free: filters.free,
          paid: filters.paid,
          date: filters.date,
          eventMode: filters.mode,
          search,
        },
      });

      const fetched = res.data.events || [];
      const filtered =
        filters.mode && filters.mode !== ""
          ? fetched.filter((event) => event.eventMode === filters.mode)
          : fetched;

      setEvents(filtered);
    } catch (error) {
      console.error("Failed to fetch events", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [filters.category, filters.free, filters.paid, filters.date, filters.mode, search]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const applySearch = () => {
    const trimmed = searchInput.trim();
    const nextParams = new URLSearchParams(params);

    if (trimmed) {
      nextParams.set("search", trimmed);
    } else {
      nextParams.delete("search");
    }

    const query = nextParams.toString();
    navigate(query ? `/events?${query}` : "/events");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100/70">
      <Header />

      <main className="pt-24 pb-16">
        <section className="border-y border-slate-200/70 bg-white/90 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-5 flex items-center gap-3">
            <input
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  applySearch();
                }
              }}
              placeholder="Search events, concerts, workshops..."
              className="w-full border border-slate-200 rounded-full px-5 py-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
            />
            <Button
              type="button"
              onClick={applySearch}
              className="rounded-full bg-gradient-to-r from-blue-700 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Search
            </Button>
          </div>
        </section>


        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-10">
          <div className="mb-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Explore</p>
            <h1 className="mt-2 text-2xl md:text-4xl font-semibold text-slate-900">Discover Events</h1>
            <p className="mt-2 text-sm md:text-base text-slate-600">
              Find curated experiences by category, date, mode, and city.
            </p>
          </div>

          <div className="space-y-7">
            <EventFilters filters={filters} setFilters={setFilters} />

            <section>
              {loading ? (
                <p className="py-20 text-center text-slate-500">Loading events...</p>
              ) : events.length === 0 ? (
                <EmptyState
                  icon={null}
                  title="No events found"
                  description="Try changing filters or search keywords."
                />
              ) : (
                <>
                  <div className="mb-4 text-sm text-slate-600">
                    Showing <span className="font-semibold text-slate-900">{events.length}</span>{" "}
                    {events.length === 1 ? "event" : "events"}
                    {search ? (
                      <>
                        {" "}for <span className="font-semibold text-blue-700">{`"${search}"`}</span>
                      </>
                    ) : null}
                  </div>

                  <div
                    className="grid gap-4"
                    style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}
                  >
                    {events.map((event, index) => (
                      <div
                        key={event?._id || event?.id || `event-card-${index}`}
                        onClick={() =>
                          navigate(event?._id || event?.id ? `/event/${event?._id || event?.id}` : "/events")
                        }
                        style={{ animationDelay: `${index * 45}ms` }}
                        className="animate-enter-up cursor-pointer bg-white rounded-xl border border-slate-200/80 hover:shadow-[0_18px_34px_-30px_rgba(15,23,42,0.45)] transition-all overflow-hidden hover:-translate-y-0.5"
                      >
                        <img
                          src={resolveEventImageUrl(event)}
                          className="h-36 md:h-40 w-full object-cover"
                          alt={event?.title || "Event banner"}
                          loading="lazy"
                          onError={(eventTarget) => withImageFallback(eventTarget, "/images/event-placeholder.svg")}
                        />

                        <div className="p-3 space-y-1">
                          <p className="text-xs text-blue-600 font-medium">{event.category?.name || "Event"}</p>

                          <h3 className="text-[15px] leading-5 font-semibold line-clamp-2">
                            {event?.title || "Untitled event"}
                          </h3>

                          <p className="text-xs text-gray-500">{event?.location?.city || "Location soon"}</p>

                          <p className="text-xs text-gray-600">
                            {event.start_date
                              ? new Date(event.start_date).toDateString()
                              : "Date not available"}
                          </p>

                          <p className="text-sm font-semibold pt-0.5">
                            {event.ticket_price
                              ? event.ticket_price === "free"
                                ? "FREE"
                                : `Rs ${event.ticket_price}`
                              : "FREE"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Events;


