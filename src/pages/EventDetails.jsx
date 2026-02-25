import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";

import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import { AuthContext } from "../components/Auth/AuthContext";
import { get } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";
import { formatDate } from "../utils/dateFormater";
import { resolveEventImageUrl, resolveMediaUrl, withImageFallback } from "../utils/mediaUrl";

const CONTAINER = "max-w-7xl mx-auto px-4 md:px-6 lg:px-8";

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadEvent = async () => {
      try {
        setLoading(true);
        const res = await get(`${ENDPOINTS.GET_EVENTS}?eventId=${eventId}`);
        setEvent(res?.data?.events?.[0] || null);
      } catch (error) {
        console.error("Failed to load event", error);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [eventId]);

  const heroImageUrl = useMemo(() => resolveEventImageUrl(event), [event]);
  const categoryIconUrl = useMemo(
    () => resolveMediaUrl(event?.category?.icon, "/images/category-placeholder.svg"),
    [event?.category?.icon],
  );

  const ticketLabel =
    event?.ticket_price && event.ticket_price !== "free"
      ? `Rs ${event.ticket_price}`
      : "FREE";

  const locationLabel =
    event?.location?.city || event?.address || "Location to be announced";

  const handleBooking = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    navigate(`/book/${eventId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100/70">
        <Header />
        <div className="pt-28">
          <div className={`${CONTAINER} pb-16`}>
            <LoadingSkeleton />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100/70">
        <Header />
        <div className="pt-28 pb-20">
          <div className={`${CONTAINER} flex items-center justify-center`}>
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Event not found</h2>
              <p className="mt-2 text-slate-600">This event does not exist or is no longer available.</p>
              <Button
                type="button"
                onClick={() => navigate("/events")}
                className="mt-6 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  background: "linear-gradient(90deg, #1d4ed8 0%, #06b6d4 100%)",
                  color: "#ffffff",
                  WebkitTextFillColor: "#ffffff",
                }}
              >
                Browse Events
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100/70">
      <Header />

      <div className="pt-20">
        <section className="relative h-[52vh] min-h-[360px] overflow-hidden bg-slate-950">
          <img
            src={heroImageUrl}
            alt={event?.title || "Event banner"}
            className="h-full w-full object-cover"
            loading="eager"
            fetchPriority="high"
            onError={(eventTarget) => {
              withImageFallback(eventTarget, "/images/event-placeholder.svg");
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent" />

          <div className={`absolute inset-x-0 bottom-0 pb-10 ${CONTAINER}`}>
            <div className="max-w-4xl">
              <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-white/85">
                <Button type="button" onClick={() => navigate("/")} className="transition hover:text-white">
                  Home
                </Button>
                <span>/</span>
                <Button type="button" onClick={() => navigate("/events")} className="transition hover:text-white">
                  Events
                </Button>
              </div>

              {event?.category ? (
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">
                  {event?.category?.icon ? (
                    <img
                      src={categoryIconUrl}
                      alt=""
                      className="h-5 w-5"
                      onError={(eventTarget) =>
                        withImageFallback(eventTarget, "/images/category-placeholder.svg")
                      }
                    />
                  ) : null}
                  <span className="font-semibold">{event.category.name}</span>
                </div>
              ) : null}

              <h1 className="text-3xl font-semibold leading-tight text-white md:text-5xl">{event.title}</h1>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/90 md:text-base">
                <span className="rounded-full border border-white/25 bg-black/25 px-3 py-1.5">
                  {event?.start_date ? formatDate(event.start_date) : "Date soon"}
                </span>
                <span className="rounded-full border border-white/25 bg-black/25 px-3 py-1.5">
                  {event?.start_time || "TBA"}
                </span>
                <span className="rounded-full border border-white/25 bg-black/25 px-3 py-1.5">
                  {locationLabel}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-16 pt-10">
          <div className={`${CONTAINER}`}>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                  <h2 className="text-xl font-semibold text-slate-900">About this event</h2>
                  <p className="mt-4 whitespace-pre-wrap text-[15px] leading-relaxed text-slate-700">
                    {event?.description || "No description provided yet."}
                  </p>
                </article>

                <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                  <h2 className="text-xl font-semibold text-slate-900">Event details</h2>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <DetailItem label="Venue" value={event?.address || "TBA"} />
                    <DetailItem label="City" value={event?.location?.city || "TBA"} />
                    <DetailItem
                      label="Date"
                      value={`${formatDate(event?.start_date)} - ${formatDate(event?.end_date)}`}
                    />
                    <DetailItem
                      label="Time"
                      value={`${event?.start_time || "TBA"} - ${event?.end_time || "TBA"}`}
                    />
                    <DetailItem label="Mode" value={event?.eventMode || "TBA"} />
                    <DetailItem label="Visibility" value={event?.visibility ? "Public" : "Private"} />
                  </div>
                </article>
              </div>

              <aside className="lg:sticky lg:top-24 h-fit">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
                  <p className="text-sm font-medium text-slate-500">Ticket price</p>
                  <p className="mt-2 text-4xl font-semibold text-slate-900">{ticketLabel}</p>

                  <div className="mt-6 space-y-1 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <InfoRow label="Date" value={event?.start_date ? formatDate(event.start_date) : "TBA"} />
                    <InfoRow label="Time" value={event?.start_time || "TBA"} />
                    <InfoRow label="Location" value={locationLabel} />
                  </div>

                  <Button
                    type="button"
                    onClick={handleBooking}
                    className="mt-6 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
                    style={{
                      background: "linear-gradient(90deg, #1d4ed8 0%, #06b6d4 100%)",
                      color: "#ffffff",
                      WebkitTextFillColor: "#ffffff",
                    }}
                  >
                    {event?.ticket_price === "free" ? "Register for free" : "Book tickets"}
                  </Button>

                  <p className="mt-4 text-xs text-slate-500">
                    Secure booking and confirmation are provided instantly after checkout.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{label}</p>
    <p className="mt-2 text-sm font-medium text-slate-900">{value || "-"}</p>
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex items-center justify-between border-b border-slate-200 py-2.5 last:border-0">
    <span className="text-sm text-slate-600">{label}</span>
    <span className="text-sm font-semibold text-slate-900">{value || "-"}</span>
  </div>
);

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
    <div className="space-y-6">
      <div className="h-56 rounded-3xl border border-slate-200 bg-white p-8 animate-pulse" />
      <div className="h-80 rounded-3xl border border-slate-200 bg-white p-8 animate-pulse" />
    </div>
    <div className="h-72 rounded-3xl border border-slate-200 bg-white p-8 animate-pulse" />
  </div>
);

export default EventDetails;


