import EventCard from "./PopularEvents/EventCard";
import EventCardSkeleton from "./PopularEvents/EventCardSkeleton";
import EmptyState from "./EmptyState";
import PropTypes from "prop-types";

const GRID_STYLE = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
};

const EventGrid = ({
  events = [],
  loading = false,
  emptyIcon,
  emptyTitle = "No events found",
  emptyDescription = "Try a different time filter or check back soon.",
}) => {
  if (loading) {
    return (
      <div className="gap-4" style={GRID_STYLE}>
        {[...Array(8)].map((_, i) => (
          <div key={`event-grid-skeleton-${i}`} className="w-full">
            <EventCardSkeleton />
          </div>
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
    <div className="gap-4" style={GRID_STYLE}>
      {events.map((event, index) => (
        <div
          key={event?._id || event?.id || `event-grid-${index}`}
          style={{ animationDelay: `${index * 50}ms` }}
          className="animate-enter-up w-full"
        >
          <EventCard event={event} />
        </div>
      ))}
    </div>
  );
};

EventGrid.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  emptyIcon: PropTypes.node,
  emptyTitle: PropTypes.string,
  emptyDescription: PropTypes.string,
};

export default EventGrid;
