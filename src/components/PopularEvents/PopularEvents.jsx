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
    <section className="py-12 lg:py-16">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
        {/* LEFT */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="font-bold text-3xl lg:text-4xl text-gray-900">
              Explore Popular Events
            </h2>
          </div>
          <p className="text-gray-600 text-base lg:text-lg max-w-2xl">
            Discover the most exciting events and experiences happening near you
          </p>
        </div>

        {/* RIGHT FILTERS */}
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

      {/* ================= EVENTS ================= */}
      <div className="mt-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        ) : events.length === 0 ? (
          <EmptyState
            icon="🎉"
            title="No events found"
            description={
              filter === "week"
                ? "No events scheduled for this week. Check back soon!"
                : filter === "month"
                  ? "No events available this month. Explore all events instead."
                  : "No events available in this city right now. Try selecting a different city."
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {events.map((event, index) => (
              <div
                key={event._id}
                style={{ animationDelay: `${index * 50}ms` }}
                className="animate-fade-in-up"
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Results count */}
      {!loading && events.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{events.length}</span>{" "}
            {events.length === 1 ? 'event' : 'events'}
            {filter !== "all" && (
              <span>
                {" "}for{" "}
                <span className="font-semibold text-purple-600">
                  {filter === "week" ? "this week" : "this month"}
                </span>
              </span>
            )}
          </p>
        </div>
      )}

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out both;
        }
      `}</style>
    </section>
  );
};

export default PopularEvents;

/* ================= FILTER BUTTON ================= */

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
      border-2
      ${
        active
          ? "border-transparent bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white shadow-lg shadow-purple-200"
          : "border-gray-200 bg-white text-gray-700 hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700"
      }
    `}
  >
    <span className={`transition-transform duration-300 ${active ? '' : 'group-hover:scale-110'}`}>
      {icon}
    </span>
    <span>{children}</span>
    
    {/* Active indicator dot */}
    {active && (
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
      </span>
    )}
  </button>
);