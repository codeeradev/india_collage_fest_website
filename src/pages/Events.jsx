import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import EventFilters from "../components/Events/EventFilters";
import { get } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";
import { BASE_URL } from "../config/constants";
import EmptyState from "../components/EmptyState";

const Events = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    category: params.get("category") || "",
    free: false,
    paid: false,
    date: "",
  });

  const search = params.get("search");

  useEffect(() => {
    fetchEvents();
  }, [filters, search]);

  const fetchEvents = async () => {
    setLoading(true);

    const res = await get(ENDPOINTS.GET_EVENTS, {
      params: {
        categoryId: filters.category,
        free: filters.free,
        paid: filters.paid,
        date: filters.date,
        search,
      },
    });

    setEvents(res.data.events || []);
    setLoading(false);
  };

  return (
    <>
      <Header />

      {/* SEARCH BAR */}
      <section className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <input
            defaultValue={search || ""}
            placeholder="Search events, concerts, shows..."
            className="w-full border rounded-full px-6 py-3"
          />
        </div>
      </section>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-10 flex gap-10">
        {/* FILTER */}
        <aside className="w-[280px] shrink-0">
          <div className="sticky top-[110px]">
            <EventFilters filters={filters} setFilters={setFilters} />
          </div>
        </aside>

        {/* EVENTS */}
        <main className="flex-1">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900">Events</h2>
            <p className="text-slate-500 text-sm">
              Discover events happening near you
            </p>
          </div>

          {loading ? (
            <p className="py-20 text-center text-slate-500">
              Loading events...
            </p>
          ) : events.length === 0 ? (
            <EmptyState
              icon="🎫"
              title="No events found"
              description="Try changing filters or search keywords."
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div
                  key={event._id}
                  onClick={() => navigate(`/event/${event._id}`)}
                  className="cursor-pointer bg-white rounded-xl border hover:shadow-lg transition overflow-hidden"
                >
                  <img
                    src={`${BASE_URL}${event.image}`}
                    className="h-48 w-full object-cover"
                  />

                  <div className="p-4 space-y-1">
                    <p className="text-sm text-pink-600 font-medium">
                      {event.category?.name}
                    </p>

                    <h3 className="font-semibold line-clamp-2">
                      {event.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {event.location?.city}
                    </p>

                    <p className="text-sm text-gray-600">
                      {event.start_date
                        ? new Date(event.start_date).toDateString()
                        : "Date not available"}
                    </p>

                    {/* ✅ PRICE FIX */}
                    <p className="text-sm font-semibold pt-1">
                      {event.ticket_price
                        ? event.ticket_price === "free"
                          ? "FREE"
                          : `₹${event.ticket_price}`
                        : "FREE"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </>
  );
};

export default Events;
