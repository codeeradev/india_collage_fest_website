import { useEffect, useState } from "react";
import EventCard from "../PopularEvents/EventCard";
import EventCardSkeleton from "../PopularEvents/EventCardSkeleton";
import { get } from "../../api/apiClient";
import { ENDPOINTS } from "../../api/endpoints";

const FeaturedEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedEvents();
  }, []);

  const fetchFeaturedEvents = async () => {
    try {
      setLoading(true);
      const res = await get(`${ENDPOINTS.GET_EVENTS}?featured=true`);
      setEvents(res.data.events || []);
    } catch (err) {
      console.error("Featured events load failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-6">

      {/* ===== HEADER ===== */}
      <header className="mb-6">
        <h2 className="text-xl md:text-3xl font-semibold text-gray-900">
          Featured Events 🎉
        </h2>
        <p className="text-gray-600 text-sm md:text-base mt-1 md:mt-2">
          Explore top events and unforgettable experiences
        </p>
      </header>

      {/* ===== GRID ===== */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {loading
          ? [...Array(6)].map((_, i) => (
              <EventCardSkeleton key={i} />
            ))
          : events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
      </div>
    </section>
  );
};

export default FeaturedEvents;
