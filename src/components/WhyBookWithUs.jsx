import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { get } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";
import { formatDate } from "../utils/dateFormater";
import { resolveEventImageUrl, withImageFallback } from "../utils/mediaUrl";

const featureItems = [
  {
    title: "Curated Events for You",
    description: "Discover handpicked experiences tailored to your interests and city.",
    color: "from-blue-600 to-cyan-500",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Safe and Secure Checkout",
    description: "Fast encrypted payments with trusted protection and clean checkout UX.",
    color: "from-emerald-600 to-teal-500",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Instant Confirmation",
    description: "Tickets are delivered instantly via email and app after every booking.",
    color: "from-violet-600 to-fuchsia-500",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 2v4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 2v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m9 16 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "24/7 Customer Support",
    description: "Helpful support is available whenever you need assistance or issue resolution.",
    color: "from-amber-500 to-orange-500",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 21a8 8 0 0 1 13.292-6" />
        <circle cx="10" cy="8" r="5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m16 19 2 2 4-4" />
      </svg>
    ),
  },
];

const WhyBookWithUs = () => {
  const [spotlightEvent, setSpotlightEvent] = useState(null);
  const [spotlightLoading, setSpotlightLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchSpotlightEvent = async () => {
      try {
        setSpotlightLoading(true);

        const featuredRes = await get(`${ENDPOINTS.GET_EVENTS}?isFeatured=true`);
        const featuredEvents = featuredRes?.data?.events || [];

        if (featuredEvents.length > 0) {
          if (active) {
            setSpotlightEvent(featuredEvents[0]);
          }
          return;
        }

        const fallbackRes = await get(ENDPOINTS.GET_EVENTS);
        const fallbackEvents = fallbackRes?.data?.events || [];

        if (active) {
          setSpotlightEvent(fallbackEvents[0] || null);
        }
      } catch (error) {
        console.error("Failed to load spotlight event", error);
        if (active) {
          setSpotlightEvent(null);
        }
      } finally {
        if (active) {
          setSpotlightLoading(false);
        }
      }
    };

    fetchSpotlightEvent();

    return () => {
      active = false;
    };
  }, []);

  const spotlightLocation = useMemo(() => {
    return [spotlightEvent?.location?.city, spotlightEvent?.address]
      .filter(Boolean)
      .join(", ");
  }, [spotlightEvent?.location?.city, spotlightEvent?.address]);

  return (
    <section aria-label="Why Book With Us" className="relative overflow-hidden rounded-[30px] border border-slate-200/80 bg-gradient-to-b from-white via-white to-slate-50/70 p-5 md:p-8 lg:p-10 shadow-[0_24px_52px_-40px_rgba(15,23,42,0.42)]">
      <div className="pointer-events-none absolute -top-24 right-[-7rem] h-72 w-72 rounded-full bg-cyan-200/35 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-[-9rem] h-72 w-72 rounded-full bg-blue-200/35 blur-3xl" />

      <div className="relative z-10">
        <header className="text-center mb-10">
          <p className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-700">
            Why People Choose Us
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-slate-900">Why Book with Us?</h2>
          <p className="mt-3 text-slate-600 text-sm md:text-base max-w-2xl mx-auto">
            A cleaner booking flow, stronger security, and reliable support in one platform.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="grid gap-4">
            {featureItems.map((item, index) => (
              <article
                key={item.title}
                style={{ animationDelay: `${index * 80}ms` }}
                className="group animate-enter-up rounded-2xl border border-slate-200/80 bg-white/95 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_22px_40px_-26px_rgba(37,99,235,0.35)]"
              >
                <div className="flex items-start gap-4">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-white shadow-md`}>
                    {item.icon}
                  </div>

                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[30px] bg-gradient-to-br from-blue-200/35 via-cyan-200/20 to-amber-200/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[28px] border border-slate-200/90 bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 p-5 md:p-6 animate-enter-fade">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/90">Live Spotlight</p>

              {spotlightLoading && (
                <div className="mt-4 space-y-4">
                  <div className="h-48 w-full rounded-2xl bg-gradient-to-r from-slate-700/70 via-slate-600/70 to-slate-700/70 animate-shimmer" />
                  <div className="h-6 w-2/3 rounded bg-slate-600/70 animate-pulse" />
                  <div className="h-4 w-1/2 rounded bg-slate-700/70 animate-pulse" />
                </div>
              )}

              {!spotlightLoading && spotlightEvent && (
                <article className="mt-4 space-y-4">
                  <div className="overflow-hidden rounded-2xl border border-white/10">
                    <img
                      src={resolveEventImageUrl(spotlightEvent)}
                      alt={spotlightEvent.title}
                      className="h-52 w-full object-cover"
                      onError={(eventTarget) => withImageFallback(eventTarget, "/images/event-placeholder.svg")}
                      loading="lazy"
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white line-clamp-2">{spotlightEvent.title}</h3>
                    <p className="mt-2 text-sm text-slate-200">
                      {spotlightLocation || "Location to be announced"}
                    </p>
                    <p className="mt-1 text-sm text-slate-300">
                      {spotlightEvent.start_date
                        ? formatDate(spotlightEvent.start_date)
                        : "Date will be updated soon"}
                    </p>
                  </div>

                  <Link
                    to={`/event/${spotlightEvent._id}`}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-blue-900 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    View Event
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
                    </svg>
                  </Link>
                </article>
              )}

              {!spotlightLoading && !spotlightEvent && (
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-5">
                  <p className="text-base font-semibold text-white">No spotlight event yet</p>
                  <p className="mt-2 text-sm text-slate-200">
                    This block only shows real events. Publish featured events to display them here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyBookWithUs;
