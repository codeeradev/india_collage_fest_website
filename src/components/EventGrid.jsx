import EventCard from "./PopularEvents/EventCard";
import EventCardSkeleton from "./PopularEvents/EventCardSkeleton";
import EmptyState from "./EmptyState";

const EventGrid = ({
  events = [],
  loading = false,
  emptyIcon,
  emptyTitle = "No events found",
  emptyDescription = "Try a different time filter or check back soon.",
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {[...Array(8)].map((_, i) => (
          <EventCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!events.length) {
    return (
      <EmptyState
        icon={emptyIcon}
        title={emptyTitle}
        description={emptyDescription}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {events.map((event, index) => (
        <div
          key={event?._id || event?.id || `event-grid-${index}`}
          style={{ animationDelay: `${index * 50}ms` }}
          className="animate-enter-up"
        >
          <EventCard event={event} />
        </div>
      ))}
    </div>
  );
};

export default EventGrid;
