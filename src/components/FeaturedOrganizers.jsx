/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import BecomeOrganizerModal from "./BecomeOrganizerModal.jsx";
import { get } from "../api/apiClient.jsx";
import { ENDPOINTS } from "../api/endpoints.jsx";
import { resolveMediaUrl, withImageFallback } from "../utils/mediaUrl";

const toDisplayValue = (value) => {
  if (value === undefined || value === null) return "";
  if (typeof value === "object") {
    if (typeof value.$oid === "string") return "";
    if (typeof value.name === "string") return value.name.trim();
    if (typeof value.city === "string") return value.city.trim();
    if (typeof value.label === "string") return value.label.trim();
    return "";
  }
  return `${value}`.trim();
};

const pickFirstValue = (...values) => {
  for (const value of values) {
    const normalized = toDisplayValue(value);
    if (normalized) return normalized;
  }
  return "";
};

const toEventCount = (org) =>
  Number(
    pickFirstValue(
      org?.events,
      org?.eventsCount,
      org?.eventCount,
      org?.totalEvents,
      org?.total_events,
      0,
    ),
  ) || 0;

const OrganizerCard = ({ org, onClick, index }) => {
  const cityLabel = pickFirstValue(
    org?.location?.city,
    org?.city,
    org?.address,
    org?.location,
    "",
  );
  const roleLabel = pickFirstValue(org?.category?.name, org?.type, org?.tagline, "Organizer");
  const eventsCount = toEventCount(org);
  const isVerified = Boolean(
    pickFirstValue(org?.isVerified, org?.verified, org?.isApproved, false),
  );

  return (
    <button
      type="button"
      onClick={onClick}
      style={{ animationDelay: `${index * 80}ms` }}
      className="group animate-enter-up w-full rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
          <img
            src={resolveMediaUrl(org.image, "/images/organizer-placeholder.svg")}
            alt={org?.name || "Organizer"}
            className="h-full w-full object-contain"
            onError={(event) => withImageFallback(event, "/images/organizer-placeholder.svg")}
            loading="lazy"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-1 text-base font-semibold text-slate-900">
            {org?.name || "Organizer"}
          </h3>
          <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">
            {cityLabel || roleLabel}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
          {eventsCount} events
        </span>
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
          isVerified ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"
        }`}>
          {isVerified ? "Verified" : "Active"}
        </span>
      </div>

      <div className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue-700">
        View profile
        <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
        </svg>
      </div>
    </button>
  );
};

const LoadingSkeleton = () => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 rounded-xl bg-slate-200 animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 rounded bg-slate-200 animate-pulse" />
            <div className="h-3 w-1/2 rounded bg-slate-200 animate-pulse" />
          </div>
        </div>
        <div className="mt-3 h-6 w-24 rounded-full bg-slate-200 animate-pulse" />
        <div className="mt-3 h-4 w-24 rounded bg-slate-200 animate-pulse" />
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
        setOrganizers(res?.data?.organisers || res?.data?.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadOrganisers();
  }, []);

  const summary = useMemo(() => {
    const totalOrganizers = organizers.length;
    const totalEvents = organizers.reduce((acc, org) => acc + toEventCount(org), 0);
    const cities = new Set(
      organizers
        .map((org) =>
          pickFirstValue(org?.location?.city, org?.city, ""),
        )
        .filter(Boolean),
    ).size;

    return { totalOrganizers, totalEvents, cities };
  }, [organizers]);

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_24px_52px_-40px_rgba(15,23,42,0.4)] md:p-8 lg:p-10">
      <div className="mb-10">
        <p className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-700">
          Trusted Partners
        </p>
        <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">Featured Organizers</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
              Connect with organizers already running active events across categories and cities.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700">
              {summary.totalOrganizers} organizers
            </span>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700">
              {summary.totalEvents} events
            </span>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700">
              {summary.cities} cities
            </span>
          </div>
        </div>
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : organizers.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
        <div className="py-12 text-center">
          <h3 className="text-xl font-semibold text-slate-900">No organizers yet</h3>
          <p className="mt-2 text-sm text-slate-600">Be the first to join the platform.</p>
        </div>
      )}

      <div className="mt-10 grid gap-6 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 p-6 md:p-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-100">
            Become an Organizer
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
            Publish your events with zero setup friction
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-blue-100 md:text-base">
            Use our organizer tools to create listings, manage approvals, and reach event audiences faster.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">Free onboarding</span>
            <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">OTP verification</span>
            <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">Fast publishing</span>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-900 transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            Become an Organizer
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="rounded-2xl border border-white/20 bg-white/10 p-5 text-slate-100 backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-100">How it works</p>
          <ol className="mt-3 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-400/20 text-xs font-semibold text-cyan-100">1</span>
              Submit your basic profile and city details.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-400/20 text-xs font-semibold text-cyan-100">2</span>
              Verify with OTP and complete organizer onboarding.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-400/20 text-xs font-semibold text-cyan-100">3</span>
              Publish events and start receiving attendees.
            </li>
          </ol>
        </div>
      </div>

      {open && <BecomeOrganizerModal onClose={() => setOpen(false)} />}
    </section>
  );
};

export default FeaturedOrganizers;
