/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import BecomeOrganizerModal from "./BecomeOrganizerModal.jsx";

import { get } from "../api/apiClient.jsx";
import { ENDPOINTS } from "../api/endpoints.jsx";

// ----------------------------------------------------------------------

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_URL;

// ----------------------------------------------------------------------

const OrganizerCard = ({ org }) => (
  <div
    className="
      bg-white
      border border-slate-200
      rounded-2xl
      px-6 py-7
      text-center
      w-[260px]
      hover:shadow-lg
      transition
    "
  >
    <img
      src={`${IMAGE_BASE_URL}${org.image}`}
      alt={org.name}
      className="w-20 h-20 mx-auto mb-5 rounded-xl object-contain"
    />

    <h3 className="font-semibold text-slate-900 text-base leading-tight">
      {org.name}
    </h3>

    <div className="flex justify-center mt-3">
      <span
        className="
          flex items-center gap-2
          px-4 py-1.5
          rounded-full
          bg-slate-100
          text-sm
          text-slate-700
        "
      >
        {org.totalEvents ?? 0} events
      </span>
    </div>

    <div className="mt-5 text-sm text-slate-400">
      Click to explore events →
    </div>
  </div>
);

// ----------------------------------------------------------------------

const FeaturedOrganizers = () => {
  const [organizers, setOrganizers] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <section className="py-20 text-center text-slate-500">
        Loading organizers...
      </section>
    );
  }

  return (
    <section className="py-20 bg-[#fafafe]">

      {/* HEADER */}
      <div className="text-center mb-14">
        <h2 className="text-3xl font-semibold text-slate-900">
          Featured Organizers ✨
        </h2>

        <p className="text-slate-600 mt-2">
          Discover events from trusted organizers across cities
        </p>
      </div>

      {/* ORGANIZERS */}
      <div className="flex flex-wrap justify-center gap-8 mt-4">
        {organizers.map((org) => (
          <OrganizerCard key={org._id} org={org} />
        ))}
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-14">
        <button
          onClick={() => setOpen(true)}
          className="px-8 py-3 rounded-full border bg-white hover:bg-slate-50"
        >
          Become an Organizer
        </button>

        {open && <BecomeOrganizerModal onClose={() => setOpen(false)} />}
      </div>

    </section>
  );
};

export default FeaturedOrganizers;
