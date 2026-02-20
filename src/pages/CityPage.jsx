import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/Header/Header";
import CityHero from "../components/CityHero";
import EventFilters from "../components/EventFilters";
import EventGrid from "../components/EventGrid";
import Footer from "../components/Footer";

import { get } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";
import { useCity } from "../context/CityContext";
import { resolveMediaUrl } from "../utils/mediaUrl";

const CityPage = () => {
  const { citySlug } = useParams();
  const { setCity } = useCity();

  const [cityId, setCityId] = useState(null);
  const [cityName, setCityName] = useState("");
  const [cityImage, setCityImage] = useState("");
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!citySlug) return;
    setFilter("all");
    fetchCity();
  }, [citySlug]);

  useEffect(() => {
    if (!cityId) return;
    fetchEvents();
  }, [cityId, filter]);

  const fetchCity = async () => {
    try {
      setEventsLoading(true);
      const res = await get(
        `${ENDPOINTS.GET_CITIES}?slug=${citySlug}`
      );

      const rawCity = res?.data?.city || res?.data?.data;
      const normalizedSlug = (citySlug || "")
        .toString()
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");

      const slugify = (value) =>
        value
          ?.toString()
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "-") || "";

      const city = Array.isArray(rawCity)
        ? rawCity.find((item) => {
            const candidate =
              item?.slug ||
              item?.citySlug ||
              item?.slugName ||
              item?.city ||
              "";
            return slugify(candidate) === normalizedSlug;
          })
        : rawCity;
      if (!city?._id) {
        throw new Error("City not found");
      }

      setCityId(city._id);
      setCityName(city.city);
      setCityImage(
        city.image || city.banner || city.bannerImage || ""
      );
      setCity(city);
    } catch (err) {
      console.error("City not found");
      setCityId(null);
      setCityName("");
      setCityImage("");
      setEvents([]);
      setEventsLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      setEventsLoading(true);

      let url = `${ENDPOINTS.GET_EVENTS}?cityId=${cityId}`;
      if (filter === "week") url += "&week=true";
      if (filter === "month") url += "&month=true";

      const res = await get(url);
      setEvents(res?.data?.events || []);
    } catch (err) {
      console.error("Failed to load events", err);
      setEvents([]);
    } finally {
      setEventsLoading(false);
    }
  };

  const displayCityName = useMemo(
    () => cityName || citySlug?.replace(/-/g, " ") || "city",
    [cityName, citySlug],
  );

  const cityImageUrl = useMemo(() => {
    if (!cityImage) return "";
    return resolveMediaUrl(cityImage, "");
  }, [cityImage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100/70">
      <Header />

      {/* SEO SCHEMA */}
      <script
        defer
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Ticket9",
              url: `https://www.theticket9.com/city/${citySlug}`,
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://www.theticket9.com/event/{search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            },
          ]),
        }}
      />

      <div className="w-full">
        <CityHero cityName={displayCityName} imageUrl={cityImageUrl} />

        <div className="container mx-auto px-5 md:px-10 pb-16">
          {/* PAGE TITLE */}
          <div className="mb-8 lg:mb-12">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                  City Events
                </p>
                <h1 className="text-3xl md:text-4xl font-semibold capitalize text-slate-900">
                  Events in {displayCityName}
                </h1>
                <p className="text-gray-500 max-w-2xl">
                  Explore top events happening in {displayCityName}. Discover
                  concerts, workshops, and weekend highlights curated just for
                  this city.
                </p>
              </div>

              {!eventsLoading && events.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold border border-blue-100">
                    {events.length} {events.length === 1 ? "event" : "events"}
                  </span>
                  {filter !== "all" && (
                    <span className="px-3 py-1 rounded-full bg-white text-slate-500 text-xs font-semibold border border-slate-200">
                      {filter === "week" ? "This Week" : "This Month"}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* FILTERS */}
          <EventFilters filter={filter} setFilter={setFilter} />

          {/* EVENTS */}
          <div className="mt-8">
            <EventGrid
              loading={eventsLoading}
              events={events}
              emptyIcon={null}
              emptyTitle={`No events in ${displayCityName}`}
              emptyDescription={
                filter === "week"
                  ? "No events scheduled for this week. Check back soon!"
                  : filter === "month"
                    ? "No events available this month. Explore all events instead."
                    : "No events available in this city right now. Try another city."
              }
            />
          </div>

          {/* Results count */}
          {!eventsLoading && events.length > 0 && (
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-gray-900">{events.length}</span>{" "}
                {events.length === 1 ? "event" : "events"}
                {filter !== "all" && (
                  <span>
                    {" "}for{" "}
                    <span className="font-semibold text-blue-600">
                      {filter === "week" ? "this week" : "this month"}
                    </span>
                  </span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CityPage;
