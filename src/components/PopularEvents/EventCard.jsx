import { Link } from "react-router-dom";
import { formatDate } from "../../utils/dateFormater";
import { useState } from "react";
import PropTypes from "prop-types";
import {
  resolveEventImageUrl,
  resolveMediaUrl,
  withImageFallback,
} from "../../utils/mediaUrl";

const toScalar = (value) => {
  if (value === undefined || value === null) return "";

  if (typeof value === "object") {
    if (typeof value.$oid === "string") return value.$oid.trim();
    if (typeof value.$date === "string" || typeof value.$date === "number") {
      return `${value.$date}`.trim();
    }
    if (typeof value.name === "string") return value.name.trim();
    if (typeof value.label === "string") return value.label.trim();
    return "";
  }

  return `${value}`.trim();
};

const pickFirstValue = (...values) => {
  for (const value of values) {
    const normalized = toScalar(value);
    if (normalized) return normalized;
  }
  return "";
};

const toTitleCase = (value = "") =>
  value
    .toString()
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");

const toPriceLabel = (ticketPrice) => {
  if (ticketPrice === null || ticketPrice === undefined || ticketPrice === "") {
    return "";
  }

  if (`${ticketPrice}`.toLowerCase() === "free" || Number(ticketPrice) === 0) {
    return "Free";
  }

  return `Rs ${ticketPrice}`;
};

const EventCard = ({ event }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageUrl = resolveEventImageUrl(event);
  const categoryIconUrl = resolveMediaUrl(
    event?.category?.icon,
    "/images/category-placeholder.svg",
  );
  const eventId = pickFirstValue(event?._id, event?.id);
  const title = pickFirstValue(event?.title, event?.name, "Upcoming event");
  const address = pickFirstValue(event?.address, event?.venue, event?.venueName);
  const city = pickFirstValue(event?.location?.city, event?.city);
  const categoryName = pickFirstValue(
    event?.category?.name,
    event?.categoryName,
    event?.sub_category?.name,
    event?.subCategoryName,
    "Event",
  );
  const modeLabel = pickFirstValue(event?.eventMode, event?.mode, "");
  const priceLabel = toPriceLabel(pickFirstValue(event?.ticket_price, event?.ticketPrice, ""));
  const organiserName = pickFirstValue(
    event?.organiser?.name,
    event?.organizer?.name,
    event?.organiserName,
    event?.organizerName,
    event?.hostName,
    "",
  );
  const engagementCount = pickFirstValue(
    event?.bookingCount,
    event?.bookingsCount,
    event?.totalBookings,
    event?.attendees,
    event?.attendeeCount,
    event?.interestedCount,
    event?.likes,
    "",
  );

  const description = pickFirstValue(
    event?.description,
    [categoryName, modeLabel ? `${toTitleCase(modeLabel)} event` : "", priceLabel].filter(Boolean).join(" | "),
    "Event details coming soon",
  );
  const startDate = formatDate(pickFirstValue(event?.start_date, event?.createdAt)) || "Date soon";
  const endDate = formatDate(event?.end_date);
  const dateLabel = endDate && endDate !== startDate ? `${startDate} - ${endDate}` : startDate;
  const startTime = pickFirstValue(event?.start_time, "TBA");
  const approvalStatus = pickFirstValue(event?.approvalStatus, "");
  const visibilityLabel =
    event?.visibility === false || event?.visibility === "private"
      ? "Private"
      : "Public";

  return (
    <Link
      to={eventId ? `/event/${eventId}` : "/events"}
      className="group block h-full"
    >
      <div className="relative h-full overflow-hidden rounded-[16px] border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        {/* IMAGE CONTAINER */}
        <div className="relative h-44 overflow-hidden">
          {/* Loading placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
          )}
          
          <img
            src={imageUrl}
            alt={title}
            onLoad={() => setImageLoaded(true)}
            onError={(eventTarget) =>
              withImageFallback(eventTarget, "/images/event-placeholder.svg")
            }
            className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Floating Category Badge */}
          {event?.category && (
            <div className="absolute left-2.5 top-2.5 z-10">
              <div className="flex items-center gap-1.5 rounded-full border border-white/25 bg-white/95 px-2.5 py-1 shadow-md backdrop-blur-sm">
                {event.category.icon && (
                  <img
                    src={categoryIconUrl}
                    className="h-3.5 w-3.5"
                    alt=""
                    onError={(eventTarget) =>
                      withImageFallback(eventTarget, "/images/category-placeholder.svg")
                    }
                  />
                )}
                <span className="text-[10px] font-semibold text-purple-600">
                  {categoryName || "Event"}
                </span>
              </div>
            </div>
          )}

          <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between text-white">
            <span className="rounded-full border border-white/25 bg-black/45 px-2 py-0.5 text-[10px] font-semibold backdrop-blur-sm">
              {dateLabel}
            </span>
            <span className="rounded-full border border-white/20 bg-black/35 px-2 py-0.5 text-[10px] font-medium backdrop-blur-sm">
              {startTime}
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="space-y-2 p-3">
          {/* TITLE */}
          <h3 className="line-clamp-2 min-h-[2.2rem] text-sm font-semibold leading-snug text-gray-900 transition-colors group-hover:text-purple-600">
            {title}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <svg className="h-3.5 w-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="line-clamp-1">{dateLabel}</span>
          </div>

          {/* DESCRIPTION */}
          <p className="line-clamp-1 text-xs leading-relaxed text-gray-600">
            {description}
          </p>

          {/* LOCATION */}
          <div className="flex items-start gap-1.5 text-xs text-gray-700">
            <svg className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="line-clamp-1">
              {address}{address && city ? ", " : ""}{city}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 border-t border-gray-100 pt-1.5">
            {priceLabel && (
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                {priceLabel}
              </span>
            )}
            {modeLabel && (
              <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-700">
                {toTitleCase(modeLabel)}
              </span>
            )}
            {engagementCount !== "" && (
              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                {engagementCount} joined
              </span>
            )}
            {approvalStatus && (
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                {toTitleCase(approvalStatus)}
              </span>
            )}
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
              {visibilityLabel}
            </span>
            {organiserName && (
              <span className="line-clamp-1 text-[10px] font-medium text-slate-500">
                by {organiserName}
              </span>
            )}
          </div>
        </div>

        {/* Hover indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </div>
    </Link>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    start_date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    end_date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    start_time: PropTypes.string,
    createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    address: PropTypes.string,
    venue: PropTypes.string,
    venueName: PropTypes.string,
    city: PropTypes.string,
    mode: PropTypes.string,
    eventMode: PropTypes.string,
    ticket_price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ticketPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    categoryName: PropTypes.string,
    subCategoryName: PropTypes.string,
    approvalStatus: PropTypes.string,
    visibility: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    bookingCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    bookingsCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    totalBookings: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    attendees: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    attendeeCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    interestedCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    likes: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    organiserName: PropTypes.string,
    organizerName: PropTypes.string,
    hostName: PropTypes.string,
    organiser: PropTypes.shape({
      name: PropTypes.string,
    }),
    organizer: PropTypes.shape({
      name: PropTypes.string,
    }),
    location: PropTypes.shape({
      city: PropTypes.string,
    }),
    category: PropTypes.shape({
      name: PropTypes.string,
      icon: PropTypes.string,
    }),
    sub_category: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
};

export default EventCard;
