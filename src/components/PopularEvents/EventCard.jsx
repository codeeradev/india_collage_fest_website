import { Link } from "react-router-dom";
import { BASE_URL } from "../../config/constants";
import { formatDate } from "../../utils/dateFormater";

const EventCard = ({ event }) => {
  const imageUrl = event?.image
    ? `${BASE_URL}${event.image}`
    : "/event-placeholder.jpg";

  return (
    <Link
      to={`/event/${event._id}`}
      className="group block rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-md transition"
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={event.title}
          className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-2">

        {/* CATEGORY */}
        {event?.category && (
          <div className="flex items-center gap-2 text-xs text-pink-600">
            {event.category.icon && (
              <img
                src={`${BASE_URL}${event.category.icon}`}
                className="w-4 h-4"
                alt=""
              />
            )}
            <span>{event.category.name}</span>
          </div>
        )}

        {/* TITLE */}
        <h3 className="font-semibold text-base leading-snug line-clamp-1">
          {event.title}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-500 line-clamp-2">
          {event.description}
        </p>

        {/* LOCATION */}
        <p className="text-sm text-gray-600">
          {event.address}, {event.location?.city}
        </p>

        {/* DATE + TIME */}
        <div className="flex justify-between text-sm text-gray-600 pt-1">
          <span>{formatDate(event.start_date)}</span>
          <span>{event.start_time}</span>
        </div>

      </div>
    </Link>
  );
};

export default EventCard;
