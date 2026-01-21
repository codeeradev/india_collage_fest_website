import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CityHero from "../components/CityHero";
import EventFilters from "../components/EventFilters";
import EventGrid from "../components/EventGrid";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";

import { get } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";

const CityPage = () => {
  const { citySlug } = useParams();

  const [cityId, setCityId] = useState(null);
  const [cityName, setCityName] = useState("");

  // 🔥 fetch cityId from slug
  useEffect(() => {
    fetchCity();
  }, [citySlug]);

  const fetchCity = async () => {
    try {
      const res = await get(
        `${ENDPOINTS.GET_CITIES}?slug=${citySlug}`
      );

      const city = res.data.city;

      setCityId(city._id);
      setCityName(city.city);
    } catch (err) {
      console.error("City not found");
    }
  };

  return (
    <div className="min-h-screen">

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

      <div className="w-full bg-gradient-to-br from-white to-[#fef6f9]">

        <CityHero cityName={cityName} />

        <div className="container mx-auto md:px-10">

          {/* PAGE TITLE */}
          <div className="mb-12 lg:mb-16 px-5 md:px-0">
            <h1 className="text-4xl font-semibold capitalize">
              Events in {cityName}
            </h1>

            <span className="block text-gray-500 mt-3">
              Explore top events happening in {cityName}
            </span>
          </div>

          {/* FILTERS */}
          <EventFilters cityId={cityId} />

          {/* EVENTS */}
          <EventGrid cityId={cityId} />

          {/* PAGINATION */}
          <Pagination />

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CityPage;
