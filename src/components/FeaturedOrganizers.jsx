/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BecomeOrganizerModal from "./BecomeOrganizerModal.jsx";
import { get } from "../api/apiClient.jsx";
import { ENDPOINTS } from "../api/endpoints.jsx";
import { resolveMediaUrl, withImageFallback } from "../utils/mediaUrl";

const OrganizerCard = ({ org, onClick, index }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ animationDelay: `${index * 80}ms` }}
      className="group animate-enter-up w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white text-left shadow-[0_14px_34px_-26px_rgba(15,23,42,0.45)] transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-[0_24px_45px_-24px_rgba(37,99,235,0.35)]"
    >
      <div className="bg-gradient-to-br from-blue-50 via-cyan-50/70 to-white p-6 flex justify-center">
        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <img
            src={resolveMediaUrl(org.image, "/images/organizer-placeholder.svg")}
            alt={org?.name || "Organizer"}
            className="h-full w-full object-contain"
            onError={(event) => withImageFallback(event, "/images/organizer-placeholder.svg")}
            loading="lazy"
          />
        </div>
      </div>

      <div className="px-5 py-5 text-center">
        <h3 className="mb-2 line-clamp-2 text-base font-semibold text-slate-900">{org?.name || "Organizer"}</h3>

        <div className="mb-4 text-sm text-slate-500">{org.events ?? 0} events</div>

        <div className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700">
          Explore events
          <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
          </svg>
        </div>
      </div>
    </button>
  );
};

const LoadingSkeleton = () => (
  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="h-36 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 animate-shimmer" />
        <div className="space-y-3 p-5">
          <div className="h-5 w-4/5 mx-auto rounded bg-slate-200 animate-pulse" />
          <div className="h-4 w-20 mx-auto rounded bg-slate-200 animate-pulse" />
          <div className="h-4 w-28 mx-auto rounded bg-slate-200 animate-pulse" />
        </div>
      </div>
    ))}
  </div>
);

const FeaturedOrganizers = () => {
  const [organizers, setOrganizers] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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
    <section
      className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-[linear-gradient(170deg,#ffffff_0%,#f7faff_45%,#f4f8ff_100%)] p-5 md:p-8 lg:p-10 shadow-[0_28px_60px_-44px_rgba(15,23,42,0.48)]"
      style={{ isolation: "isolate" }}
    >
      <div className="pointer-events-none absolute -top-24 left-[-6rem] h-72 w-72 rounded-full bg-cyan-200/35 blur-3xl animate-float-y" />
      <div className="pointer-events-none absolute -bottom-24 right-[-7rem] h-72 w-72 rounded-full bg-blue-200/35 blur-3xl animate-float-x" />

      <div className="relative z-10">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <p className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-700 shadow-sm">
            Trusted Partners
          </p>

          <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-slate-900">Featured Organizers</h2>

          <p className="mt-3 text-base md:text-lg text-slate-600 leading-relaxed">
            Discover events from verified organizers across cities and communities.
          </p>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : organizers.length > 0 ? (
          <div className="grid gap-5 mb-14 sm:grid-cols-2 lg:grid-cols-4">
            {organizers.map((org, index) => (
              <OrganizerCard
                key={org?._id || org?.id || `organizer-${index}`}
                org={org}
                index={index}
                onClick={() =>
                  navigate(org?._id || org?.id ? `/organiser/${org?._id || org?.id}` : "/")
                }
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
              <svg className="h-10 w-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No organizers yet</h3>
            <p className="text-slate-600">Be the first to join the platform.</p>
          </div>
        )}

        <div
          className="relative overflow-hidden rounded-[28px] border border-blue-200/60 p-7 md:p-10"
          style={{
            background:
              "radial-gradient(circle at 8% 18%, rgba(255,255,255,0.18), transparent 28%), radial-gradient(circle at 86% 18%, rgba(103,232,249,0.22), transparent 34%), linear-gradient(135deg, #0b2448 0%, #0f3c78 44%, #0b8cb5 100%)",
          }}
        >
          <div className="pointer-events-none absolute -top-24 right-[-3rem] h-64 w-64 rounded-full bg-cyan-200/25 blur-3xl animate-float-y" />
          <div className="pointer-events-none absolute -bottom-24 left-[-4rem] h-72 w-72 rounded-full bg-blue-300/25 blur-3xl animate-float-x" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.2]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.58) 1px, transparent 0)",
                backgroundSize: "34px 34px",
              }}
            />
          </div>

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="text-center lg:text-left">
              <p className="inline-flex items-center rounded-full border border-cyan-200/40 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-100 backdrop-blur-sm">
                Organizer Program
              </p>

              <h3 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
                Ready to Create Events?
              </h3>

              <p className="mt-3 max-w-xl text-base leading-relaxed text-blue-100 md:text-lg lg:mx-0">
                Launch events faster with creator tools, verified payments, and a clean audience growth dashboard.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-blue-50 lg:justify-start">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-300" />
                  Free to join
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5">
                  <span className="h-2 w-2 rounded-full bg-cyan-200" />
                  Instant event publishing
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-300" />
                  Dedicated support
                </span>
              </div>
            </div>

            <div className="mx-auto w-full max-w-sm rounded-2xl border border-white/20 bg-white/10 p-5 text-center backdrop-blur-md shadow-2xl shadow-slate-950/30">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">Quick onboarding</p>
              <p className="mt-2 text-3xl font-semibold text-white">~10 min</p>
              <p className="mt-1 text-sm text-blue-100">Start publishing events with verified organizer identity.</p>

              <button
                type="button"
                onClick={() => setOpen(true)}
                className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-900 transition-all hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-2xl"
              >
                Become an Organizer
                <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
                </svg>
              </button>

              <p className="mt-3 text-xs text-blue-100">No setup charges. Works for clubs, artists, and college teams.</p>
            </div>
          </div>
        </div>
      </div>

      {open && <BecomeOrganizerModal onClose={() => setOpen(false)} />}
    </section>
  );
};

export default FeaturedOrganizers;
