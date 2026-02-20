import { useEffect, useState } from "react";
import { get } from "../../api/apiClient";
import { ENDPOINTS } from "../../api/endpoints";
import EventCard from "../PopularEvents/EventCard";
import EventCardSkeleton from "../PopularEvents/EventCardSkeleton";
import EmptyState from "../../components/EmptyState";

const FeaturedEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedEvents();
  }, []);

  const fetchFeaturedEvents = async () => {
    try {
      setLoading(true);
      const res = await get(`${ENDPOINTS.GET_EVENTS}?isFeatured=true`);
      setEvents(res.data.events || []);
    } catch {
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const isEmpty = !loading && events.length === 0;

  return (
    <section className="py-6 relative overflow-hidden">
      {/* ===== HEADER ===== */}
      <header className="mb-6">
        <h2 className="text-xl md:text-3xl font-semibold text-gray-900">
          Featured Events
        </h2>
        <p className="text-gray-600 text-sm md:text-base mt-1 md:mt-2">
          Explore top events and unforgettable experiences
        </p>
      </header>

      {/* ===== LOADING ===== */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* ===== EVENTS ===== */}
      {!loading && events.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}

      {/* ===== EMPTY BEAUTIFUL STATE ===== */}
      {isEmpty && (
        <EmptyState
          icon=""
          title="No featured events available"
          description="Featured events are curated by organizers and will appear here once published."
        />
      )}
    </section>
  );
};

export default FeaturedEvents;
