import { Link } from "react-router-dom";
import { formatDate } from "../../utils/dateFormater";
import { useMemo, useState } from "react";
import {
  pickSeededFallback,
  resolveEventImageUrl,
  resolveMediaUrl,
  withImageFallback,
} from "../../utils/mediaUrl";

const EventCard = ({ event }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const eventFallback = useMemo(
    () =>
      pickSeededFallback(event?._id || event?.id || event?.title || "event", [
        "/images/event-placeholder.svg",
        "/images/event-placeholder-alt-1.svg",
        "/images/event-placeholder-alt-2.svg",
      ]),
    [event?._id, event?.id, event?.title],
  );

  const imageUrl = useMemo(() => {
    return resolveEventImageUrl(event);
  }, [event]);

  const categoryIconUrl = useMemo(
    () => resolveMediaUrl(event?.category?.icon, "/images/category-placeholder.svg"),
    [event?.category?.icon],
  );

  const locationLabel = useMemo(() => {
    return [event?.address, event?.location?.city].filter(Boolean).join(", ") || "Location details coming soon";
  }, [event?.address, event?.location?.city]);
  const title = event?.title?.toString().trim() || "Upcoming Event";
  const description =
    event?.description?.toString().trim() ||
    "Discover the details and reserve your spot.";
  const eventId = event?._id || event?.id;

  return (
    <Link to={eventId ? `/event/${eventId}` : "/events"} className="group block h-full">
      <article className="relative h-full overflow-hidden rounded-[18px] border border-slate-200/80 bg-white shadow-[0_12px_24px_-22px_rgba(15,23,42,0.45)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-blue-300 group-hover:shadow-[0_20px_38px_-28px_rgba(37,99,235,0.38)]">
        <div className="relative overflow-hidden aspect-[16/9]">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 animate-shimmer" />
          )}

          <img
            src={imageUrl}
            alt={title}
            onLoad={() => setImageLoaded(true)}
            onError={(eventTarget) => {
              withImageFallback(eventTarget, eventFallback);
              setImageLoaded(true);
            }}
            className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-110 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/15 to-transparent" />

          {event?.category && (
            <div className="absolute top-2.5 left-2.5 z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/95 px-3 py-1.5 backdrop-blur-md">
                {event.category.icon && (
                  <img
                    src={categoryIconUrl}
                    className="h-3.5 w-3.5"
                    alt=""
                    onError={(eventTarget) => withImageFallback(eventTarget, "/images/category-placeholder.svg")}
                    loading="lazy"
                  />
                )}
                <span className="text-[10px] font-semibold text-blue-700">{event.category.name}</span>
              </div>
            </div>
          )}

          <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between text-white">
            <span className="rounded-full border border-white/25 bg-slate-900/55 px-2 py-0.5 text-[10px] font-semibold backdrop-blur-md">
              {event?.start_date ? formatDate(event.start_date) : "Date soon"}
            </span>
            <span className="rounded-full border border-white/20 bg-white/15 px-2 py-0.5 text-[10px] font-medium backdrop-blur-md">
              {event?.start_time || "TBA"}
            </span>
          </div>
        </div>

        <div className="p-3 space-y-2">
          <h3 className="min-h-[2rem] text-sm font-semibold leading-snug text-slate-900 transition-colors group-hover:text-blue-700 line-clamp-2">
            {title}
          </h3>

          <p className="text-xs leading-relaxed text-slate-600 line-clamp-1">
            {description}
          </p>

          <div className="flex items-start gap-1.5 text-xs text-slate-700">
            <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="line-clamp-1">{locationLabel}</span>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-2">
            <div className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(event.start_date)}
            </div>

            <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 transition-colors group-hover:text-blue-700">
              View details
              <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 18 6-6-6-6" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default EventCard;
