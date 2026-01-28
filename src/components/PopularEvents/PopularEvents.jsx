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
    <section className="py-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        {/* LEFT */}
        <div>
          <h2 className="font-semibold text-2xl md:text-3xl text-gray-900">
            Explore Popular Events 🎉
          </h2>
          <p className="text-gray-600 text-sm md:text-base mt-1">
            Dive into the most popular events and experiences nearby!
          </p>
        </div>

        {/* RIGHT FILTERS */}
        <div className="flex flex-wrap gap-3">
          <FilterButton
            active={filter === "all"}
            onClick={() => setFilter("all")}
          >
            All Events
          </FilterButton>

          <FilterButton
            active={filter === "month"}
            onClick={() => setFilter("month")}
          >
            This Month
          </FilterButton>

          <FilterButton
            active={filter === "week"}
            onClick={() => setFilter("week")}
          >
            This Week
          </FilterButton>
        </div>
      </div>

      {/* ================= EVENTS ================= */}
      <div className="mt-8">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        ) : events.length === 0 ? (
          <EmptyState
            icon="🎉"
            title="No events found"
            description={
              filter === "week"
                ? "No events scheduled for this week."
                : filter === "month"
                  ? "No events available this month."
                  : "No events available in this city right now."
            }
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularEvents;

/* ================= FILTER BUTTON ================= */

const FilterButton = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium transition
      ${
        active
          ? "border border-[#FD5B66] bg-red-50 text-[#FD5B66]"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
  >
    {children}
  </button>
);
