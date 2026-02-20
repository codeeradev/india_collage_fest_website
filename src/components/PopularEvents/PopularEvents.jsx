import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import EventCardSkeleton from "./EventCardSkeleton";
import { get } from "../../api/apiClient";
import { ENDPOINTS } from "../../api/endpoints";
import { useCity } from "../../context/CityContext";
import EmptyState from "../EmptyState";

const PopularEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const { city } = useCity();

  useEffect(() => {
    if (!city) return;
    fetchEvents();
  }, [city, filter]);

  const fetchEvents = async () => {
    try {
      setLoading(true);

      let url = ENDPOINTS.GET_EVENTS + "?";

      if (city?._id) {
        url += `cityId=${city._id}`;
      }

      if (filter === "week") {
        url += "&week=true";
      }

      if (filter === "month") {
        url += "&month=true";
      }

      const res = await get(url);
      setEvents(res.data.events || []);
    } catch (err) {
      console.error("Failed to load events", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-[30px] border border-slate-200/80 bg-white/85 p-5 md:p-8 lg:p-10 shadow-[0_24px_52px_-40px_rgba(15,23,42,0.42)]">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10">
        <div className="space-y-2">
          <p className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-700">
            Trending Now
          </p>
          <h2 className="font-semibold text-3xl lg:text-4xl text-slate-900">Explore Popular Events</h2>
          <p className="text-slate-600 text-base lg:text-lg max-w-2xl">
            Discover the most exciting experiences happening around {city?.city || "you"}.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <FilterButton
            active={filter === "all"}
            onClick={() => setFilter("all")}
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            }
          >
            All Events
          </FilterButton>

          <FilterButton
            active={filter === "month"}
            onClick={() => setFilter("month")}
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
          >
            This Month
          </FilterButton>

          <FilterButton
            active={filter === "week"}
            onClick={() => setFilter("week")}
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
          >
            This Week
          </FilterButton>
        </div>
      </div>

      <div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {[...Array(8)].map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        ) : events.length === 0 ? (
          <EmptyState
            icon={null}
            title="No events found"
            description={
              filter === "week"
                ? "No events scheduled for this week. Check back soon."
                : filter === "month"
                  ? "No events available this month. Explore all events instead."
                  : "No events available in this city right now. Try selecting a different city."
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {events.map((event, index) => (
              <div
                key={event?._id || event?.id || `popular-event-${index}`}
                style={{ animationDelay: `${index * 55}ms` }}
                className="animate-enter-up"
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        )}
      </div>

      {!loading && events.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-slate-600 text-sm md:text-base">
            Showing <span className="font-semibold text-slate-900">{events.length}</span>{" "}
            {events.length === 1 ? "event" : "events"}
            {filter !== "all" && (
              <span>
                {" "}for{" "}
                <span className="font-semibold text-blue-700">
                  {filter === "week" ? "this week" : "this month"}
                </span>
              </span>
            )}
          </p>
        </div>
      )}
    </section>
  );
};

export default PopularEvents;

const FilterButton = ({ children, active, onClick, icon }) => (
  <button
    onClick={onClick}
    className={`
      group relative
      flex items-center gap-2
      px-5 py-2.5
      rounded-full
      text-sm font-semibold
      transition-all duration-300
      border
      ${
        active
          ? "border-transparent bg-gradient-to-r from-blue-700 to-cyan-500 text-white shadow-lg shadow-blue-500/25"
          : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50/70 hover:text-blue-700"
      }
    `}
  >
    <span className={`transition-transform duration-300 ${active ? "" : "group-hover:scale-110"}`}>
      {icon}
    </span>
    <span>{children}</span>

    {active && (
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
      </span>
    )}
  </button>
);
