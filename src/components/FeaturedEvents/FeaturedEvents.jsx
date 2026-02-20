import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../../api/apiClient";
import { ENDPOINTS } from "../../api/endpoints";
import EventCard from "../PopularEvents/EventCard";
import EventCardSkeleton from "../PopularEvents/EventCardSkeleton";
import EmptyState from "../../components/EmptyState";

const FeaturedEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    <section className="relative overflow-hidden rounded-[30px] border border-slate-200/80 bg-white/85 p-5 md:p-8 lg:p-10 shadow-[0_24px_50px_-38px_rgba(15,23,42,0.42)]">
      <div className="pointer-events-none absolute -top-20 right-[-8rem] h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />

      <header className="relative mb-8 md:mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-700">
            Handpicked Picks
          </p>
          <h2 className="mt-3 text-2xl md:text-4xl font-semibold text-slate-900">Featured Events</h2>
          <p className="mt-2 max-w-2xl text-sm md:text-base text-slate-600">
            The top events selected for quality, experience, and demand.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/events")}
          className="rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
        >
          View all events
        </button>
      </header>

      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {[...Array(6)].map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!loading && events.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {events.map((event, index) => (
            <div
              key={event?._id || event?.id || `featured-event-${index}`}
              style={{ animationDelay: `${index * 50}ms` }}
              className="animate-enter-up"
            >
              <EventCard event={event} />
            </div>
          ))}
        </div>
      )}

      {isEmpty && (
        <EmptyState
          icon={null}
          title="No featured events available"
          description="Featured events are curated by organizers and will appear here once published."
        />
      )}
    </section>
  );
};

export default FeaturedEvents;
