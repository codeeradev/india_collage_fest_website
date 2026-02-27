import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import EventCard from "../components/PopularEvents/EventCard";
import PageLayout from "../components/layout/PageLayout";
import SectionWrapper from "../components/layout/SectionWrapper";

import { get } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";
import EmptyState from "../components/EmptyState";
import { resolveMediaUrl, withImageFallback } from "../utils/mediaUrl";

const OrganiserProfile = () => {
  const { id } = useParams();

  const [org, setOrg] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await get(`${ENDPOINTS.GET_ORGANISER_EVENT}?organiser=${id}`);

        setOrg(res.data.organiser);
        setEvents(res.data.events || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) {
    return (
      <PageLayout mainClassName="bg-gradient-to-b from-slate-50 via-white to-slate-100/70 flex flex-col gap-0">
        <SectionWrapper as="div" className="flex min-h-[60vh] items-center justify-center text-slate-500">
          Loading organiser...
        </SectionWrapper>
      </PageLayout>
    );
  }

  if (!org) {
    return (
      <PageLayout mainClassName="bg-gradient-to-b from-slate-50 via-white to-slate-100/70 flex flex-col gap-0">
        <SectionWrapper as="div" className="flex min-h-[60vh] items-center justify-center">
          Organiser not found
        </SectionWrapper>
      </PageLayout>
    );
  }

  return (
    <PageLayout mainClassName="bg-gradient-to-b from-slate-50 via-white to-slate-100/70 flex flex-col gap-0">
      <section>
        <div className="relative h-[280px] overflow-hidden bg-slate-900">
          <img
            src={resolveMediaUrl(org.bannerImage, "/images/event-placeholder.svg")}
            className="h-full w-full object-cover"
            alt={org.name}
            onError={(eventTarget) => withImageFallback(eventTarget, "/images/event-placeholder.svg")}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
        </div>

        <SectionWrapper as="div">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <img
                src={resolveMediaUrl(org.image, "/images/organizer-placeholder.svg")}
                className="h-24 w-24 rounded-2xl object-contain bg-slate-100 border border-slate-200"
                alt={org.name}
                onError={(eventTarget) => withImageFallback(eventTarget, "/images/organizer-placeholder.svg")}
              />

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Organizer Profile</p>
                <h1 className="mt-2 text-3xl font-semibold text-slate-900">{org.name}</h1>
                <p className="mt-1 text-slate-600">{events.length} published {events.length === 1 ? "event" : "events"}</p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            {events.length === 0 ? (
              <EmptyState
                icon={null}
                title="No events found"
                description="This organiser has not published any events yet."
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {events.map((event) => (
                  <EventCard key={event._id} event={event} />
                ))}
              </div>
            )}
          </div>
        </SectionWrapper>
      </section>
    </PageLayout>
  );
};

export default OrganiserProfile;
