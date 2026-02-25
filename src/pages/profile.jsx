import { useEffect, useState, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { get, post } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";
import { AuthContext } from "../components/Auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { showAlert } from "../components/AlertAndLoader/UIComponents";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import EmptyState from "../components/EmptyState";
import { formatDate } from "../utils/dateFormater";
import { Button } from "../components/ui/button";
import {
  resolveEventImageUrl,
  resolveMediaUrl,
  withImageFallback,
} from "../utils/mediaUrl";

const EVENTS_PAGE_SIZE = 8;

const toDateInput = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
};

const toTimeInput = (value) => {
  if (!value) return "";
  if (typeof value === "string" && value.includes(":")) {
    return value.slice(0, 5);
  }
  return "";
};

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error("Failed to parse stored user", error);
    return null;
  }
};

const Profile = () => {
  const seedProfile = getStoredUser();
  const [profile, setProfile] = useState(seedProfile);
  const [draft, setDraft] = useState(seedProfile || {});
  const [dirty, setDirty] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imgError, setImgError] = useState(false);

  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventsError, setEventsError] = useState("");
  const [eventsPage, setEventsPage] = useState(1);
  const [eventsPagination, setEventsPagination] = useState({
    page: 1,
    limit: EVENTS_PAGE_SIZE,
    totalRecords: 0,
    totalPages: 1,
  });
  const [eventsSearch, setEventsSearch] = useState("");
  const [eventsStatus, setEventsStatus] = useState("all");

  const [editOpen, setEditOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventDraft, setEventDraft] = useState({});
  const [eventSaving, setEventSaving] = useState(false);
  const [eventImgError, setEventImgError] = useState(false);

  const fileInputRef = useRef(null);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [eventsPage, eventsStatus, eventsSearch]);

  useEffect(() => {
    if (!editOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [editOpen]);

  const fetchProfile = async () => {
    try {
      const res = await get(ENDPOINTS.GET_PROFILE, { authRequired: true });
      const payload = res?.data || {};
      const fetchedProfile =
        payload.profile ||
        payload.user ||
        payload.data?.profile ||
        payload.data?.user ||
        (payload.data && typeof payload.data === "object" ? payload.data : null);

      if (fetchedProfile) {
        setProfile((prev) => ({ ...(prev || {}), ...fetchedProfile }));
        setDraft((prev) => ({ ...(prev || {}), ...fetchedProfile }));
      }
    } catch (err) {
      console.error(err);
      const fallbackUser = getStoredUser();
      if (fallbackUser) {
        setProfile((prev) => ({ ...(prev || {}), ...fallbackUser }));
        setDraft((prev) => ({ ...(prev || {}), ...fallbackUser }));
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      setEventsLoading(true);
      setEventsError("");
      const params = new URLSearchParams();
      params.set("page", eventsPage.toString());
      params.set("limit", EVENTS_PAGE_SIZE.toString());
      if (eventsStatus !== "all") {
        params.set("status", eventsStatus);
      }
      if (eventsSearch.trim()) {
        params.set("search", eventsSearch.trim());
      }

      const res = await get(
        `${ENDPOINTS.GET_USER_EVENTS}?${params.toString()}`,
        { authRequired: true },
      );

      const payload = res?.data || {};
      const list =
        payload.events ||
        payload.data?.events ||
        payload.userEvents ||
        payload.data ||
        [];

      setEvents(Array.isArray(list) ? list : []);
      setEventsPagination(
        payload.pagination ||
          payload.data?.pagination || {
          page: 1,
          limit: EVENTS_PAGE_SIZE,
          totalRecords: 0,
          totalPages: 1,
        },
      );
    } catch (err) {
      console.error(err);
      setEventsError("Failed to load your events");
    } finally {
      setEventsLoading(false);
    }
  };

  const onChange = (key, value) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
    if (key === "image") setImgError(false);
  };

  const saveProfile = async () => {
    try {
      setSaving(true);
      const formData = new FormData();
      const current = profile || {};

      ["name", "email", "phone"].forEach((key) => {
        if (draft[key] !== current[key]) {
          formData.append(key, draft[key] || "");
        }
      });

      if (draft.image instanceof File) {
        formData.append("image", draft.image);
      }

      const res = await post(
        ENDPOINTS.UPDATE_PROFILE,
        formData,
        { authRequired: true },
      );
      const payload = res?.data || {};
      const updatedProfile =
        payload.profile ||
        payload.user ||
        payload.data?.profile ||
        payload.data?.user ||
        (payload.data && typeof payload.data === "object" ? payload.data : null);

      if (updatedProfile) {
        setProfile(updatedProfile);
        setDraft(updatedProfile);
      }
      setDirty(false);
    } catch (err) {
      console.error(err);
      showAlert("error", "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    setEventImgError(false);
    setEventDraft({
      title: event.title || "",
      description: event.description || "",
      address: event.address || "",
      ticket_price:
        event.ticket_price && event.ticket_price !== "free"
          ? event.ticket_price
          : "",
      start_date: toDateInput(event.start_date),
      end_date: toDateInput(event.end_date),
      start_time: toTimeInput(event.start_time),
      end_time: toTimeInput(event.end_time),
      eventMode: event.eventMode || "offline",
      visibility:
        event.visibility === false || event.visibility === "private"
          ? "private"
          : "public",
      image: null,
    });
    setEditOpen(true);
  };

  const closeEditModal = () => {
    setEditOpen(false);
    setEditingEvent(null);
    setEventDraft({});
  };

  const updateEventDraft = (key, value) => {
    setEventDraft((prev) => ({ ...prev, [key]: value }));
  };

  const saveEvent = async () => {
    if (!editingEvent) return;
    try {
      setEventSaving(true);

      const payload = {
        title: eventDraft.title,
        description: eventDraft.description,
        address: eventDraft.eventMode === "offline" ? eventDraft.address : "",
        ticket_price:
          eventDraft.ticket_price === "" ? "free" : eventDraft.ticket_price,
        start_date: eventDraft.start_date,
        end_date: eventDraft.end_date,
        start_time: eventDraft.start_time,
        end_time: eventDraft.end_time,
        eventMode: eventDraft.eventMode,
        visibility: eventDraft.visibility === "public",
      };

      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      if (eventDraft.image instanceof File) {
        formData.append("image", eventDraft.image);
      }

      const res = await post(
        `${ENDPOINTS.EDIT_USER_EVENT}/${editingEvent._id}`,
        formData,
        { authRequired: true },
      );

      const updated = res.data.event;
      setEvents((prev) =>
        prev.map((item) => (item._id === updated._id ? updated : item)),
      );

      showAlert("success", "Event updated");
      closeEditModal();
    } catch (err) {
      console.error(err);
      showAlert("error", "Event update failed");
    } finally {
      setEventSaving(false);
    }
  };

  const currentProfile = profile || draft || {};

  const imageUrl =
    draft.image instanceof File
      ? URL.createObjectURL(draft.image)
      : draft?.image
      ? resolveMediaUrl(draft.image, "/images/organizer-placeholder.svg")
      : currentProfile?.image
      ? resolveMediaUrl(currentProfile.image, "/images/organizer-placeholder.svg")
      : null;

  const modalImageUrl =
    eventDraft.image instanceof File
      ? URL.createObjectURL(eventDraft.image)
      : editingEvent?.image
      ? resolveEventImageUrl(editingEvent)
      : null;

  return (
    <>
      <Header />

      <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div className="max-w-6xl mx-auto px-6 pt-28 pb-14">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-blue-600">Account</p>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                Your Profile
              </h1>
              <p className="text-slate-600">
                Manage your personal details and events
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {dirty ? (
                <Button
                  onClick={saveProfile}
                  disabled={saving}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-full font-semibold shadow-sm hover:bg-blue-700 transition disabled:opacity-70"
                >
                  {saving ? "Saving..." : "Save changes"}
                </Button>
              ) : (
                <div className="hidden sm:flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  All changes saved
                </div>
              )}

              <Button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="px-5 py-2.5 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800 transition"
              >
                Logout
              </Button>
            </div>
          </div>

          {loading && <ProfileSkeleton />}

          {!loading && (
            <>
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 relative overflow-hidden">
                  <div className="absolute -top-16 -right-16 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
                  <div className="relative flex flex-col items-center text-center">
                    <Button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="group relative"
                      title="Change profile photo"
                    >
                      <div className="w-24 h-24 rounded-full overflow-hidden bg-blue-600 text-white flex items-center justify-center text-2xl font-bold ring-4 ring-white shadow-lg">
                        {imageUrl && !imgError ? (
                          <img
                            src={imageUrl}
                            alt="Profile"
                            className="w-full h-full object-cover"
                            onError={(eventTarget) => {
                              withImageFallback(
                                eventTarget,
                                "/images/organizer-placeholder.svg",
                              );
                              setImgError(true);
                            }}
                          />
                        ) : (
                          <span className="uppercase">
                            {currentProfile.name?.charAt(0) || "U"}
                          </span>
                        )}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center border-2 border-white shadow-md group-hover:scale-105 transition">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 7h3l2-3h8l2 3h3v13H3z"
                          />
                          <circle cx="12" cy="13" r="3" />
                        </svg>
                      </div>
                    </Button>

                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => onChange("image", e.target.files?.[0])}
                    />

                    <h2 className="mt-4 text-xl font-semibold text-slate-900">
                      {draft.name || "Your name"}
                    </h2>
                    <p className="text-sm text-slate-500">
                      {draft.email || "Add your email address"}
                    </p>

                    <Button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-full hover:bg-blue-100 transition"
                    >
                      Change photo
                    </Button>

                    <div className="mt-6 grid grid-cols-2 gap-3 w-full">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left">
                        <p className="text-xs text-slate-500">Total events</p>
                        <p className="text-lg font-semibold text-slate-900">
                          {eventsPagination.totalRecords}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left">
                        <p className="text-xs text-slate-500">Profile status</p>
                        <p className="text-lg font-semibold text-slate-900">
                          {saving ? "Saving..." : dirty ? "Unsaved" : "Up to date"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl shadow-sm p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        Profile Details
                      </h3>
                      <p className="text-sm text-slate-500">
                        Update your contact information.
                      </p>
                    </div>
                    {dirty && (
                      <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                        Unsaved changes
                      </span>
                    )}
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ProfileField
                      label="Full Name"
                      value={draft.name || ""}
                      placeholder="Your name"
                      onChange={(v) => onChange("name", v)}
                    />
                    <ProfileField
                      label="Email Address"
                      type="email"
                      value={draft.email || ""}
                      placeholder="you@example.com"
                      onChange={(v) => onChange("email", v)}
                    />
                    <ProfileField
                      label="Phone Number"
                      value={draft.phone || ""}
                      placeholder="Add phone number"
                      onChange={(v) => onChange("phone", v)}
                    />
                  </div>
                </div>
              </div>

              {/* EVENTS SECTION */}
              <section className="mt-12">
                <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 md:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">
                        My Events
                      </h2>
                      <p className="text-sm text-slate-500">
                        Manage events you created
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                      <input
                        value={eventsSearch}
                        onChange={(e) => {
                          setEventsSearch(e.target.value);
                          setEventsPage(1);
                        }}
                        placeholder="Search by title..."
                        className="w-full sm:w-64 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-slate-50"
                      />
                      <select
                        value={eventsStatus}
                        onChange={(e) => {
                          setEventsStatus(e.target.value);
                          setEventsPage(1);
                        }}
                        className="w-full sm:w-48 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-slate-50"
                      >
                        <option value="all">All statuses</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </div>

                  {eventsError && (
                    <div className="mt-4 text-sm text-red-600">
                      {eventsError}
                    </div>
                  )}

                  {eventsLoading && <EventsSkeleton />}

                  {!eventsLoading && events.length === 0 && (
                    <div className="mt-6">
                      <EmptyState
                        icon="EV"
                        title="No events yet"
                        description="Your events will appear here once you create them."
                      />
                    </div>
                  )}

                  {!eventsLoading && events.length > 0 && (
                    <>
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {events.map((event) => (
                          <EventCard
                            key={event._id}
                            event={event}
                            onEdit={() => openEditModal(event)}
                          />
                        ))}
                      </div>

                      {eventsPagination.totalPages > 1 && (
                        <div className="mt-6 flex items-center justify-between text-sm text-slate-600">
                          <Button
                            disabled={eventsPage <= 1}
                            onClick={() =>
                              setEventsPage((p) => Math.max(1, p - 1))
                            }
                            className="px-4 py-2 rounded-full border border-slate-200 disabled:opacity-50 hover:border-blue-300 hover:text-blue-700 transition"
                          >
                            Previous
                          </Button>
                          <span>
                            Page {eventsPagination.page} of{" "}
                            {eventsPagination.totalPages}
                          </span>
                          <Button
                            disabled={eventsPage >= eventsPagination.totalPages}
                            onClick={() =>
                              setEventsPage((p) =>
                                Math.min(eventsPagination.totalPages, p + 1),
                              )
                            }
                            className="px-4 py-2 rounded-full border border-slate-200 disabled:opacity-50 hover:border-blue-300 hover:text-blue-700 transition"
                          >
                            Next
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </section>
            </>
          )}
        </div>
      </main>

      {editOpen && editingEvent && (
        <div className="modal-overlay" onMouseDown={closeEditModal}>
          <div
            className="modal-box"
            style={{ maxWidth: 720 }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <h2 className="modal-title">Edit Event</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-500">Title</label>
                <input
                  className="input"
                  value={eventDraft.title || ""}
                  onChange={(e) => updateEventDraft("title", e.target.value)}
                  placeholder="Event title"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500">Ticket Price</label>
                <input
                  className="input"
                  value={eventDraft.ticket_price || ""}
                  onChange={(e) =>
                    updateEventDraft(
                      "ticket_price",
                      e.target.value.replace(/[^\d.]/g, ""),
                    )
                  }
                  placeholder="Leave blank for free"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500">Start Date</label>
                <input
                  type="date"
                  className="input"
                  value={eventDraft.start_date || ""}
                  onChange={(e) =>
                    updateEventDraft("start_date", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="text-xs text-slate-500">End Date</label>
                <input
                  type="date"
                  className="input"
                  value={eventDraft.end_date || ""}
                  onChange={(e) => updateEventDraft("end_date", e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-slate-500">Start Time</label>
                <input
                  type="time"
                  className="input"
                  value={eventDraft.start_time || ""}
                  onChange={(e) =>
                    updateEventDraft("start_time", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="text-xs text-slate-500">End Time</label>
                <input
                  type="time"
                  className="input"
                  value={eventDraft.end_time || ""}
                  onChange={(e) => updateEventDraft("end_time", e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-slate-500">Event Mode</label>
                <select
                  className="input"
                  value={eventDraft.eventMode || ""}
                  onChange={(e) => updateEventDraft("eventMode", e.target.value)}
                >
                  <option value="offline">Offline</option>
                  <option value="online">Online</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500">Visibility</label>
                <select
                  className="input"
                  value={eventDraft.visibility || "public"}
                  onChange={(e) => updateEventDraft("visibility", e.target.value)}
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>
            </div>

            <div className="mt-3">
              <label className="text-xs text-slate-500">Description</label>
              <textarea
                className="input"
                rows="4"
                value={eventDraft.description || ""}
                onChange={(e) => updateEventDraft("description", e.target.value)}
                placeholder="Event description"
              />
            </div>

            {eventDraft.eventMode !== "online" && (
              <div className="mt-3">
                <label className="text-xs text-slate-500">Address</label>
                <input
                  className="input"
                  value={eventDraft.address || ""}
                  onChange={(e) => updateEventDraft("address", e.target.value)}
                  placeholder="Event address"
                />
              </div>
            )}

            <div className="mt-3">
              <label className="text-xs text-slate-500">Banner Image</label>
              <div className="flex items-center gap-3">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center text-xs text-slate-400">
                  {modalImageUrl && !eventImgError ? (
                    <img
                      src={modalImageUrl}
                      alt="Event"
                      className="w-full h-full object-cover"
                      onError={() => setEventImgError(true)}
                    />
                  ) : (
                    "No image"
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    updateEventDraft("image", e.target.files?.[0] || null)
                  }
                />
              </div>
            </div>

            <div className="mt-4">
              <Button className="modal-btn" onClick={saveEvent} disabled={eventSaving}>
                {eventSaving ? "Saving..." : "Save Changes"}
              </Button>
              <Button className="modal-cancel" onClick={closeEditModal}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

/* ================= UI PARTS ================= */

const ProfileField = ({ label, value, onChange, placeholder, type }) => (
  <label className="block">
    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
      {label}
    </span>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
    />
  </label>
);

ProfileField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

ProfileField.defaultProps = {
  type: "text",
};

const EventStatusBadge = ({ status }) => {
  const map = {
    approved: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    rejected: "bg-red-100 text-red-700",
  };
  const label = status
    ? status.charAt(0).toUpperCase() + status.slice(1)
    : "Pending";
  return (
    <span
      className={`text-xs px-2 py-1 rounded-full ${
        map[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {label}
    </span>
  );
};

EventStatusBadge.propTypes = {
  status: PropTypes.string,
};

const EventCard = ({ event, onEdit }) => {
  const imageUrl = resolveEventImageUrl(event);

  const locationLine =
    event.eventMode === "online"
      ? "Online event"
      : event.address || event.location?.city || "Location TBA";

  const priceLabel =
    event.ticket_price && event.ticket_price !== "free"
      ? `Rs. ${event.ticket_price}`
      : "FREE";

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition">
      <div className="flex gap-4">
        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
          <img
            src={imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(eventTarget) =>
              withImageFallback(eventTarget, "/images/event-placeholder.svg")
            }
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-slate-900 line-clamp-1">
              {event.title}
            </h3>
            <EventStatusBadge status={event.approvalStatus} />
          </div>
          <p className="text-sm text-slate-600 line-clamp-2 mt-1">
            {event.description}
          </p>
          <div className="mt-2 text-xs text-slate-500">
            {formatDate(event.start_date)} | {event.start_time}
          </div>
          <div className="mt-1 text-xs text-slate-500 line-clamp-1">
            {locationLine}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-900">
          {priceLabel}
        </span>
        <div className="flex items-center gap-2">
          <Link
            to={`/event/${event._id}`}
            className="px-3 py-1.5 text-sm rounded-full border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-700 transition"
          >
            View
          </Link>
          <Button
            onClick={onEdit}
            className="px-3 py-1.5 text-sm rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
};

const EventsSkeleton = () => (
  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
    {[1, 2, 3, 4].map((item) => (
      <div
        key={item}
        className="bg-white border border-slate-200 rounded-2xl p-4 animate-pulse"
      >
        <div className="h-24 bg-slate-100 rounded-2xl" />
        <div className="mt-4 h-4 bg-slate-100 rounded w-3/4" />
        <div className="mt-2 h-3 bg-slate-100 rounded w-full" />
        <div className="mt-2 h-3 bg-slate-100 rounded w-5/6" />
      </div>
    ))}
  </div>
);

const ProfileSkeleton = () => (
  <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse">
    <div className="bg-white border border-slate-200 rounded-3xl p-6">
      <div className="w-24 h-24 rounded-full bg-slate-100 mx-auto" />
      <div className="mt-4 h-4 bg-slate-100 rounded w-32 mx-auto" />
      <div className="mt-2 h-3 bg-slate-100 rounded w-40 mx-auto" />
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="h-16 bg-slate-100 rounded-xl" />
        <div className="h-16 bg-slate-100 rounded-xl" />
      </div>
    </div>
    <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6">
      <div className="h-4 bg-slate-100 rounded w-40" />
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-12 bg-slate-100 rounded-xl" />
        <div className="h-12 bg-slate-100 rounded-xl" />
        <div className="h-12 bg-slate-100 rounded-xl" />
      </div>
    </div>
  </div>
);

export default Profile;


