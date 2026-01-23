/* eslint-disable react/prop-types */
import { useState } from "react";
import BecomeOrganizerModal from "./BecomeOrganizerModal.jsx";

const organizers = [
  { name: "LEA360COMMUNITY", events: 1, logo: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" },
  { name: "Medai Coimbatore", events: 6, logo: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" },
  { name: "Unherd Music Community", events: 4, logo: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" },
  { name: "Medai Bengaluru", events: 1, logo: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" },
  { name: "MEDAI THE STAGE", events: 2, logo: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" },
  { name: "VJ Eventz", events: 10, logo: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" },
];

const OrganizerCard = ({ org }) => (
  <div className="
    bg-white
    border border-slate-200
    rounded-2xl
    px-6 py-7
    text-center
    w-[260px]
    hover:shadow-lg
    transition
  ">
    <img
      src={org.logo}
      alt={org.name}
      className="w-20 h-20 mx-auto mb-5 rounded-xl object-contain"
    />

    <h3 className="font-semibold text-slate-900 text-base leading-tight">
      {org.name}
    </h3>

    <div className="flex justify-center mt-3">
      <span className="
        flex items-center gap-2
        px-4 py-1.5
        rounded-full
        bg-slate-100
        text-sm
        text-slate-700
      ">
        {org.events} events
      </span>
    </div>

    <div className="mt-5 text-sm text-slate-400">
      Click to explore events →
    </div>
  </div>
);

const FeaturedOrganizers = () => {
  const [open, setOpen] = useState(false);

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

      {/* ROW 1 */}
      <div className="flex flex-wrap justify-center gap-8 mb-10">
        {organizers.slice(0, 4).map((org, i) => (
          <OrganizerCard key={i} org={org} />
        ))}
      </div>

      {/* ROW 2 */}
      <div className="flex flex-wrap justify-center gap-8">
        {organizers.slice(4).map((org, i) => (
          <OrganizerCard key={i} org={org} />
        ))}
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-14">
<button
  onClick={() => setOpen(true)}
  className="px-8 py-3 rounded-full border bg-white"
>
  Become an Organizer
</button>

{open && <BecomeOrganizerModal onClose={() => setOpen(false)} />}
      </div>

    </section>
  );
};

export default FeaturedOrganizers;
