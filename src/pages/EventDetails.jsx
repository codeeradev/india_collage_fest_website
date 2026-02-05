import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { get } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";
import { BASE_URL } from "../config/constants";
import { formatDate } from "../utils/dateFormater";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import { AuthContext } from "../components/Auth/AuthContext";

const CONTAINER = "max-w-7xl mx-auto px-4 md:px-6 lg:px-8";

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    loadEvent();
    window.scrollTo(0, 0);
  }, [eventId]);

  const loadEvent = async () => {
    try {
      const res = await get(`${ENDPOINTS.GET_EVENTS}?eventId=${eventId}`);
      setEvent(res.data.events?.[0] || null);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate(`/book/${eventId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="h-[82px]" />
        <div className={`${CONTAINER} py-12`}>
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Event not found</h2>
          <p className="text-gray-600">The event you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate("/events")}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all"
          >
            Browse Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="h-[82px]" />

      {/* ================= HERO IMAGE ================= */}
      <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden bg-gray-900">
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
        )}
        
        <img
          src={`${BASE_URL}${event.image}`}
          alt={event.title}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />

        {/* Breadcrumb */}
        <div className={`absolute top-8 ${CONTAINER}`}>
          <nav className="flex items-center gap-2 text-sm text-white/80">
            <button onClick={() => navigate("/")} className="hover:text-white transition-colors">
              Home
            </button>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <button onClick={() => navigate("/events")} className="hover:text-white transition-colors">
              Events
            </button>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white font-medium truncate max-w-xs">{event.title}</span>
          </nav>
        </div>

        {/* Title overlay */}
        <div className={`absolute bottom-0 left-0 right-0 pb-12 ${CONTAINER}`}>
          <div className="max-w-4xl">
            {event.category && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4">
                {event.category.icon && (
                  <img
                    src={`${BASE_URL}${event.category.icon}`}
                    className="w-5 h-5"
                    alt=""
                  />
                )}
                <span className="text-white font-semibold">{event.category.name}</span>
              </div>
            )}
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {event.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">{formatDate(event.start_date)}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-medium">{event.location?.city}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className={`${CONTAINER} py-12`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6">
            {/* ABOUT */}
<div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
  <div className="px-6 py-4 border-b border-gray-100">
    <h2 className="text-xl font-semibold text-gray-900">About this event</h2>
  </div>

  <div className="px-6 py-5">
    <p className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap">
      {event.description || "No description provided."}
    </p>
  </div>
</div>


            {/* EVENT DETAILS */}
<div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
  <div className="px-6 py-4 border-b border-gray-100">
    <h2 className="text-xl font-semibold text-gray-900">Event Details</h2>
  </div>


              <div className="p-5 grid sm:grid-cols-2 gap-4">
                <DetailItem
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  }
                  label="Venue"
                  value={event.address}
                />
                <DetailItem
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                    </svg>
                  }
                  label="City"
                  value={event.location?.city}
                />
                <DetailItem
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  }
                  label="Date"
                  value={`${formatDate(event.start_date)} – ${formatDate(event.end_date)}`}
                />
                <DetailItem
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  label="Time"
                  value={`${event.start_time} – ${event.end_time}`}
                />
                <DetailItem
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  }
                  label="Mode"
                  value={event.eventMode}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - BOOKING CARD */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              {/* Price section */}
<div className="text-center pb-6 border-b border-gray-100">
  <p className="text-sm text-gray-500 mb-2">Ticket Price</p>
  <h3 className="text-4xl font-bold text-purple-600">
    {event.ticket_price && event.ticket_price !== "free"
      ? `₹${event.ticket_price}`
      : "FREE"}
  </h3>
</div>


              {/* Quick info */}
              <div className="mt-6 space-y-4">
                <InfoRow
                  icon={
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  }
                  label="Date"
                  value={formatDate(event.start_date)}
                />
                <InfoRow
                  icon={
                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  label="Time"
                  value={event.start_time}
                />
                <InfoRow
                  icon={
                    <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  }
                  label="Location"
                  value={event.location?.city}
                />
              </div>

              {/* CTA Button */}
              <button
                onClick={handleBooking}
                className="
                  group relative mt-8 w-full
                  bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600
                  text-white py-4 rounded-xl
                  font-bold text-lg
                  shadow-lg shadow-purple-200
                  transition-all duration-300
                  hover:shadow-xl hover:shadow-purple-300
                  hover:scale-[1.02]
                  active:scale-95
                  overflow-hidden
                "
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {event.ticket_price === "free" ? "Register for Free" : "Book Tickets"}
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-pink-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              {/* Security badges */}
              <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Secure Booking</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Verified Event</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

/* ================= HELPER COMPONENTS ================= */

const DetailItem = ({ icon, label, value }) => (
  <div className="flex gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
    <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center text-purple-600 shadow-sm">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="font-semibold text-gray-900 capitalize truncate">{value || "-"}</p>
    </div>
  </div>
);

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-gray-600">{label}</span>
    </div>
    <span className="font-semibold text-gray-900">{value || "-"}</span>
  </div>
);

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div className="lg:col-span-2 space-y-6">
      <div className="bg-white rounded-2xl p-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6" />
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-4/6" />
        </div>
      </div>
      <div className="bg-white rounded-2xl p-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6" />
        <div className="grid sm:grid-cols-2 gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
    <div className="bg-white rounded-2xl p-6 h-96 animate-pulse">
      <div className="h-12 bg-gray-200 rounded mb-6" />
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-8 bg-gray-200 rounded" />
        ))}
      </div>
      <div className="h-14 bg-gray-200 rounded mt-8" />
    </div>
  </div>
);

export default EventDetails;