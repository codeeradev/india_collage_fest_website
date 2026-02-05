/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import BecomeOrganizerModal from "./BecomeOrganizerModal.jsx";

import { get } from "../api/apiClient.jsx";
import { ENDPOINTS } from "../api/endpoints.jsx";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_URL;

// ----------------------------------------------------------------------

const OrganizerCard = ({ org, onClick, index }) => {
  return (
    <div
      onClick={onClick}
      style={{ animationDelay: `${index * 80}ms` }}
      className="
        bg-white border border-gray-200 rounded-xl
        w-full sm:w-[260px]
        overflow-hidden
        cursor-pointer
        transition-all duration-300
        hover:shadow-lg hover:-translate-y-1
        animate-fade-in-up
      "
    >
      {/* TOP VISUAL AREA */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex justify-center">
        <div className="w-24 h-24 rounded-xl bg-white shadow flex items-center justify-center overflow-hidden">
          <img
            src={`${IMAGE_BASE_URL}${org.image}`}
            alt={org.name}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-5 py-5 text-center">
        <h3 className="font-semibold text-gray-900 text-base mb-2 line-clamp-2">
          {org.name}
        </h3>

        <div className="text-sm text-gray-500 mb-4">
          {org.events ?? 0} events
        </div>

        <div className="text-purple-600 font-medium text-sm">
          Explore events →
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------

const LoadingSkeleton = () => (
  <div className="flex flex-wrap justify-center gap-8">
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="w-full sm:w-[280px] bg-white border border-gray-200 rounded-2xl p-8 animate-pulse"
      >
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-2xl" />
        <div className="h-6 bg-gray-200 rounded-lg mb-4 mx-auto w-3/4" />
        <div className="h-8 bg-gray-200 rounded-full mx-auto w-24 mb-5" />
        <div className="h-4 bg-gray-200 rounded mx-auto w-32" />
      </div>
    ))}
  </div>
);

// ----------------------------------------------------------------------

const FeaturedOrganizers = () => {
  const [organizers, setOrganizers] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ===============================
  // LOAD ORGANISERS
  // ===============================
  useEffect(() => {
    const loadOrganisers = async () => {
      try {
        const res = await get(ENDPOINTS.GET_ORGANISER);
        setOrganizers(res.data.organisers || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadOrganisers();
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-100/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* HEADER */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-50 to-purple-50 border border-purple-100 mb-6">
            <svg
              className="w-5 h-5 text-purple-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span className="text-sm font-semibold text-purple-900">
              Trusted Partners
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Featured{" "}
            <span className="relative">
              Organizers
              <span className="absolute left-0 -bottom-2 w-full h-1 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 rounded-full" />
            </span>
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            Discover events from trusted organizers across cities. Each verified
            partner brings you unique experiences.
          </p>
        </div>

        {/* ORGANIZERS */}
        {loading ? (
          <LoadingSkeleton />
        ) : organizers.length > 0 ? (
          <div
            className="grid gap-6 mb-16 place-items-center"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            }}
          >
            {organizers.map((org, index) => (
              <OrganizerCard
                key={org._id}
                org={org}
                index={index}
                onClick={() => navigate(`/organiser/${org._id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No organizers yet
            </h3>
            <p className="text-gray-600">Be the first to join our platform!</p>
          </div>
        )}

        {/* CTA SECTION */}
        <div className="relative">
          {/* Decorative gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-pink-500/5 to-purple-600/5 rounded-3xl blur-2xl" />

          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-12 lg:p-16 text-center overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                  backgroundSize: "40px 40px",
                }}
              />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>

              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to Create Events?
              </h3>

              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Join our community of event organizers and start creating
                memorable experiences for your audience.
              </p>

              <button
                onClick={() => setOpen(true)}
                className="
                  group relative inline-flex items-center gap-3
                  px-8 py-4 
                  bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600
                  text-white font-semibold text-lg
                  rounded-full
                  shadow-xl shadow-purple-500/25
                  transition-all duration-300
                  hover:shadow-2xl hover:shadow-purple-500/40
                  hover:scale-105
                  active:scale-95
                  overflow-hidden
                "
              >
                <span className="relative z-10">Become an Organizer</span>
                <svg
                  className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-pink-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <div className="flex flex-wrap items-center justify-center gap-8 mt-10 pt-8 border-t border-white/10">
                <div className="flex items-center gap-2 text-gray-400">
                  <svg
                    className="w-5 h-5 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">Free to join</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                  </svg>
                  <span className="text-sm">24/7 support</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <svg
                    className="w-5 h-5 text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">Easy setup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && <BecomeOrganizerModal onClose={() => setOpen(false)} />}

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out both;
        }
      `}</style>
    </section>
  );
};

export default FeaturedOrganizers;
