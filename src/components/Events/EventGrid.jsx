import { resolveEventImageUrl, withImageFallback } from "../../utils/mediaUrl";

const EventGrid = ({ events }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {events.map((event, index) => (
        <div
          key={event?._id || event?.id || `event-grid-${index}`}
          className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition"
        >

          <img
            src={resolveEventImageUrl(event)}
            className="h-48 w-full object-cover"
            alt={event?.title || "Event banner"}
            loading="lazy"
            onError={(eventTarget) => withImageFallback(eventTarget, "/images/event-placeholder.svg")}
          />

          <div className="p-4 space-y-1">
            <p className="text-sm text-blue-600">{event?.category?.name || "Event"}</p>
            <h3 className="font-semibold line-clamp-2">{event?.title || "Untitled event"}</h3>
            <p className="text-sm text-gray-500">
              {event?.location?.city || "Location soon"}
            </p>
          </div>

        </div>
      ))}
    </div>
  );
};

export default EventGrid;
