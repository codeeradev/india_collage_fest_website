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

const CONTAINER = "max-w-[1280px] mx-auto px-4 md:px-6";

const EventDetails = () => {
  const { eventId } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    loadEvent();
  }, [eventId]);

  const navigate = useNavigate();

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

    // proceed to booking page
    navigate(`/book/${eventId}`);
  };

  if (loading)
    return (
      <div className="py-40 text-center text-slate-500">Loading event...</div>
    );

  if (!event)
    return (
      <div className="py-40 text-center text-slate-500">Event not found</div>
    );

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ================= HEADER ================= */}
      <Header />

      {/* HEADER SPACE (FIXED HEADER ISSUE) */}
      <div className="h-[82px]" />

      {/* ================= HERO ================= */}
      <div className={CONTAINER}>
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          {/* IMAGE */}
          <img
            src={`${BASE_URL}${event.image}`}
            alt={event.title}
            className="w-full h-[420px] object-cover"
          />

          {/* TITLE */}
          <div className="px-6 py-5">
            <h1 className="text-3xl md:text-[34px] font-semibold text-slate-900">
              {event.title}
            </h1>

            {event.category && (
              <span className="inline-block mt-3 px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 text-sm">
                {event.category.name}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ================= BODY ================= */}
      <div
        className={`${CONTAINER} py-8 grid grid-cols-1 lg:grid-cols-3 gap-6`}
      >
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          {/* ABOUT */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              About this event
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* DETAILS */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 grid sm:grid-cols-2 gap-6 text-sm">
            <Detail label="Venue" value={event.address} />
            <Detail label="City" value={event.location?.city} />
            <Detail
              label="Date"
              value={`${formatDate(event.start_date)} – ${formatDate(
                event.end_date,
              )}`}
            />
            <Detail
              label="Time"
              value={`${event.start_time} – ${event.end_time}`}
            />
            <Detail label="Mode" value={event.eventMode} />
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 h-fit sticky top-[100px]">
          <p className="text-sm text-slate-500">Ticket Price</p>

          <h3 className="text-3xl font-semibold mt-1 text-slate-900">
            {event.ticket_price
              ? event.ticket_price === "free"
                ? "FREE"
                : `₹${event.ticket_price}`
              : "FREE"}
          </h3>

          <div className="mt-5 space-y-3 text-sm text-slate-600">
            <Row label="Date" value={formatDate(event.start_date)} />
            <Row label="Time" value={event.start_time} />
            <Row label="Location" value={event.location?.city} />
          </div>

          <button
            onClick={handleBooking}
            className="mt-7 w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-md font-medium transition"
          >
            {event.ticket_price === "free"
              ? "Register for Free"
              : "Book Tickets"}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

/* ================= HELPERS ================= */

const Detail = ({ label, value }) => (
  <div>
    <p className="text-slate-500 mb-1">{label}</p>
    <p className="font-medium text-slate-900 capitalize">{value || "-"}</p>
  </div>
);

const Row = ({ label, value }) => (
  <div className="flex justify-between">
    <span>{label}</span>
    <span className="font-medium text-slate-900">{value || "-"}</span>
  </div>
);

export default EventDetails;
