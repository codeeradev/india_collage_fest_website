import { Link } from "react-router-dom";
import { BASE_URL } from "../../config/constants";
import { formatDate } from "../../utils/dateFormater";
import { useState } from "react";

const EventCard = ({ event }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageUrl = event?.image
    ? `${BASE_URL}${event.image}`
    : "/event-placeholder.jpg";

  return (
    <Link
      to={`/event/${event._id}`}
      className="group block h-full"
    >
      <div className="relative h-full rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {/* IMAGE CONTAINER */}
        <div className="relative overflow-hidden aspect-[4/3]">
          {/* Loading placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
          )}
          
          <img
            src={imageUrl}
            alt={event.title}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Floating Category Badge */}
          {event?.category && (
            <div className="absolute top-3 left-3 z-10">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm shadow-lg border border-white/20">
                {event.category.icon && (
                  <img
                    src={`${BASE_URL}${event.category.icon}`}
                    className="w-4 h-4"
                    alt=""
                  />
                )}
                <span className="text-xs font-semibold text-purple-600">
                  {event.category.name}
                </span>
              </div>
            </div>
          )}

          {/* Quick Action Button */}
          <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <button className="p-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-4 space-y-3">
          {/* TITLE */}
          <h3 className="font-bold text-base leading-snug line-clamp-2 text-gray-900 group-hover:text-purple-600 transition-colors min-h-[2.5rem]">
            {event.title}
          </h3>

          {/* DESCRIPTION */}
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed min-h-[2.5rem]">
            {event.description}
          </p>

          {/* LOCATION */}
          <div className="flex items-start gap-2 text-sm text-gray-700">
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="line-clamp-1">
              {event.address}, {event.location?.city}
            </span>
          </div>

          {/* DATE + TIME */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center gap-1.5 text-sm text-gray-700">
              <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">{formatDate(event.start_date)}</span>
            </div>
            
            <div className="flex items-center gap-1.5 text-sm text-gray-700">
              <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">{event.start_time}</span>
            </div>
          </div>
        </div>

        {/* Hover indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </div>
    </Link>
  );
};

export default EventCard;