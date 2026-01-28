import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import EventCard from "../components/PopularEvents/EventCard";

import { get } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";
import EmptyState from "../components/EmptyState";

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_URL;

const OrganiserProfile = () => {
  const { id } = useParams();

  const [org, setOrg] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await get(
          `${ENDPOINTS.GET_ORGANISER_EVENT}?organiser=${id}`,
        );

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

  /* ---------- loading ---------- */
  if (loading) {
    return (
      <>
        <Header />
        <div className="h-[60vh] flex items-center justify-center text-slate-500">
          Loading organiser...
        </div>
        <Footer />
      </>
    );
  }

  /* ---------- not found ---------- */
  if (!org) {
    return (
      <>
        <Header />
        <div className="h-[60vh] flex items-center justify-center">
          Organiser not found
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      {/* banner */}
      {org.bannerImage && (
        <img
          src={IMAGE_BASE_URL + org.bannerImage}
          className="w-full h-[300px] object-cover"
          alt={org.name}
        />
      )}

      {/* profile */}
      <div className="max-w-7xl mx-auto px-6 -mt-16">
        <div className="bg-white rounded-2xl p-6 shadow flex gap-6 items-center">
          <img
            src={IMAGE_BASE_URL + org.image}
            className="w-24 h-24 rounded-xl object-contain bg-slate-100"
            alt={org.name}
          />

          <div>
            <h1 className="text-2xl font-semibold">{org.name}</h1>

            <p className="text-slate-500 mt-1">{events.length} Events</p>
          </div>
        </div>

        {/* events */}
        <div className="mt-12">
          {events.length === 0 ? (
            <EmptyState
              icon="🎫"
              title="No events found"
              description="This organiser has not published any events yet."
            />
          ) : (
            <div className="grid grid-cols-4 gap-8">
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OrganiserProfile;
