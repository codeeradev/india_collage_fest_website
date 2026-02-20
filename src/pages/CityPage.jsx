import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/Header/Header";
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

  const fetchCity = useCallback(async () => {
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
  }, [citySlug, setCity]);

  const fetchEvents = useCallback(async () => {
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
  }, [cityId, filter]);

  useEffect(() => {
    if (!citySlug) return;
    setFilter("all");
    fetchCity();
  }, [citySlug, fetchCity]);

  useEffect(() => {
    if (!cityId) return;
    fetchEvents();
  }, [cityId, fetchEvents]);

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
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-24 md:px-6 md:pt-28 lg:px-8">
          <div className="mb-6 rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-[0_24px_60px_-46px_rgba(15,23,42,0.55)] md:p-7">
            <div className="grid gap-5 lg:grid-cols-2 lg:items-center">
              <div className="space-y-3 text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                  City Events
                </p>
                <h1 className="text-3xl font-semibold capitalize text-slate-900 md:text-4xl">
                  Events in {displayCityName}
                </h1>
                <p className="max-w-2xl text-gray-500">
                  Explore top events happening in {displayCityName}. Discover
                  concerts, workshops, and weekend highlights curated just for
                  this city.
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {!eventsLoading && events.length > 0 && (
                    <span className="rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700">
                      {events.length} {events.length === 1 ? "event" : "events"}
                    </span>
                  )}
                  {filter !== "all" && (
                    <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-500">
                      {filter === "week" ? "This Week" : "This Month"}
                    </span>
                  )}
                </div>
              </div>

              <div className="hidden lg:flex lg:justify-end">
                <div className="h-40 w-full max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                  {cityImageUrl ? (
                    <img
                      src={cityImageUrl}
                      alt={displayCityName}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-2xl font-semibold text-white shadow-md">
                        {(displayCityName || "C").charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* FILTERS */}
          <EventFilters filter={filter} setFilter={setFilter} />

          {/* EVENTS */}
          <div className="mt-6 md:mt-7">
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
