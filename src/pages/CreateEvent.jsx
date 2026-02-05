import React, { useEffect, useState } from "react";
import { ENDPOINTS } from "../api/endpoints";
import { get, post } from "../api/apiClient";
import { showAlert } from "../components/AlertAndLoader/UIComponents";
import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header/Header";
import BannerCropper from "../components/createEvent/BannerCropper";
import MapPicker from "../components/createEvent/MapPicker";

/* ─── SVG Icons (inline, zero deps) ─── */
const IconUpload = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="20" fill="#f1f5f9" />
    <path
      d="M20 26v-8M16 22l4-4 4 4"
      stroke="#64748b"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 28h12"
      stroke="#64748b"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
const IconCalendar = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect
      x="1"
      y="3"
      width="14"
      height="11"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.4"
    />
    <path d="M1 7h14" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M5 1v4M11 1v4"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);
const IconClock = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M8 4.5V8l2.5 1.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const IconLocation = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6c0 3.5 4.5 8.5 4.5 8.5s4.5-5 4.5-8.5c0-2.5-2-4.5-4.5-4.5z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);
const IconTag = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M2 8.6V3a1 1 0 011-1h5.6a1 1 0 01.7.3l5.4 5.4a1 1 0 010 1.4l-5.6 5.6a1 1 0 01-1.4 0L2.3 9.3a1 1 0 01-.3-.7z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <circle cx="6" cy="6" r="1" fill="currentColor" />
  </svg>
);
const IconGlobe = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M1.5 8h13M8 1.5c2 1.5 3 3.8 3 6.5s-1 5-3 6.5M8 1.5c-2 1.5-3 3.8-3 6.5s1 5 3 6.5"
      stroke="currentColor"
      strokeWidth="1.4"
    />
  </svg>
);
const IconDollar = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M8 4v8M6.5 5.5h2a1.5 1.5 0 010 3h-2a1.5 1.5 0 000 3h2"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ─── Tiny helpers ─── */
const Section = ({ icon: Icon, title, children, style }) => (
  <div
    style={{
      background: "#fff",
      borderRadius: 16,
      border: "1px solid #e2e8f0",
      overflow: "hidden",
      ...style,
    }}
  >
    {/* header strip */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "14px 22px",
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      <span style={{ color: "#6366f1", display: "flex" }}>
        <Icon />
      </span>
      <span
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#334155",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        {title}
      </span>
    </div>

    <div style={{ padding: "20px 22px 22px" }}>{children}</div>
  </div>
);

/* label + input wrapper */
const Field = ({ label, children, half }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 6,
      flex: half ? "1 1 0" : undefined,
    }}
  >
    {label && (
      <label style={{ fontSize: 13, fontWeight: 500, color: "#64748b" }}>
        {label}
      </label>
    )}
    {children}
  </div>
);

/* shared input styles applied via className-less inline */
const inputBase = {
  width: "100%",
  boxSizing: "border-box",
  padding: "11px 14px",
  fontSize: 14,
  color: "#1e293b",
  background: "#f8fafc",
  border: "1.5px solid #e2e8f0",
  borderRadius: 10,
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
  fontFamily: "inherit",
};

const focusStyle = {
  borderColor: "#6366f1",
  boxShadow: "0 0 0 3px rgba(99,102,241,0.15)",
  background: "#fff",
};

/* ─── Wrapper that attaches focus/blur handlers ─── */
const StyledInput = ({ style: extraStyle, ...props }) => {
  const [focused, setFocused] = useState(false);
  return (
    <input
      {...props}
      style={{ ...inputBase, ...(focused ? focusStyle : {}), ...extraStyle }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
};

const StyledSelect = ({ style: extraStyle, children, ...props }) => {
  const [focused, setFocused] = useState(false);
  return (
    <select
      {...props}
      style={{
        ...inputBase,
        appearance: "none",
        WebkitAppearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2364748b' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 14px center",
        paddingRight: 36,
        cursor: "pointer",
        ...(focused ? focusStyle : {}),
        ...extraStyle,
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {children}
    </select>
  );
};

const StyledTextarea = ({ style: extraStyle, ...props }) => {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      {...props}
      style={{
        ...inputBase,
        resize: "vertical",
        minHeight: 90,
        ...(focused ? focusStyle : {}),
        ...extraStyle,
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
};

/* ─── Icon prefix wrapper for inputs ─── */
const InputWithIcon = ({ icon: Icon, children }) => (
  <div style={{ position: "relative" }}>
    <span
      style={{
        position: "absolute",
        left: 13,
        top: "50%",
        transform: "translateY(-50%)",
        color: "#94a3b8",
        pointerEvents: "none",
        display: "flex",
        zIndex: 1,
      }}
    >
      <Icon />
    </span>
    {/* clone child and add paddingLeft */}
    {React.Children.map(children, (child) =>
      React.cloneElement(child, {
        style: { ...child.props.style, paddingLeft: 38 },
      }),
    )}
  </div>
);

/* ─── Main Page ─── */
const CreateEvent = () => {
  /* ───── STATE (unchanged) ───── */
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    address: "",
    category: "",
    subCategory: "",
    ticket_price: "",
    eventMode: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    visibility: "public",
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [cities, setCities] = useState([]);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [rawImage, setRawImage] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  const [coords, setCoords] = useState(null);

  const navigate = useNavigate();

  /* ───── FETCH INITIAL DATA (unchanged) ───── */
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [catRes, cityRes] = await Promise.all([
          get(ENDPOINTS.GET_CATEGORIES),
          get(ENDPOINTS.GET_CITIES),
        ]);
        setCategories(catRes.data.category || []);
        setCities(cityRes.data.data || []);
      } catch {
        showAlert("error", "Failed to load initial data");
      }
    };
    fetchInitialData();
  }, []);

  /* ───── HANDLERS (unchanged) ───── */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setRawImage(file);
    setShowCropper(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    setForm({ ...form, category: categoryId, subCategory: "" });
    setSubCategories([]);
    if (!categoryId) return;
    try {
      const res = await get(`${ENDPOINTS.GET_SUB_CATEGORIES}/${categoryId}`);
      setSubCategories(res.data.subCategories || []);
    } catch {
      showAlert("error", "Failed to load sub categories");
    }
  };

  /* ───── SUBMIT (unchanged) ───── */
  const submitEvent = async () => {
    if (!form.title || !form.category || !form.location) {
      showAlert("warning", "Please fill required fields");
      return;
    }
    try {
      showAlert("loading", "Creating event...");
      const payload = {
        ...form,
        ticket_price: form.ticket_price === "" ? "free" : form.ticket_price,
        visibility: form.visibility === "public",
        address: form.eventMode === "offline" ? form.address : "",
      };
      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        formData.append(key, value ?? "");
      });
      if (image) {
        formData.append("image", image);
      }
      await post(ENDPOINTS.ADD_EVENT, formData, { authRequired: true });
      showAlert("success", "Event created successfully");
      navigate("/");
      setForm({
        title: "",
        description: "",
        location: "",
        address: "",
        category: "",
        subCategory: "",
        ticket_price: "",
        eventMode: "",
        start_date: "",
        end_date: "",
        start_time: "",
        end_time: "",
        visibility: "public",
      });
      setImage(null);
      setPreview(null);
      setSubCategories([]);
    } catch {
      showAlert("error", "Something went wrong while creating event");
    }
  };

  /* ───── UI ───── */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');

        * { box-sizing: border-box; }

        body, #root { font-family: 'DM Sans', sans-serif; }

        html, body {
  overflow-x: hidden;
}

        /* date/time native picker reset */
        input[type="date"]::-webkit-calendar-picker-indicator,
        input[type="time"]::-webkit-calendar-picker-indicator {
          opacity: 0.5;
          cursor: pointer;
          filter: invert(0.4);
        }
        input[type="date"]::-webkit-input-placeholder,
        input[type="time"]::-webkit-input-placeholder { color: #94a3b8; }

        /* scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }

        /* subtle page fade-in */
        @keyframes pageFade {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ce-page { animation: pageFade 0.45s cubic-bezier(.22,1,.36,1) both; }

        /* section stagger */
        @keyframes sectionUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ce-section { animation: sectionUp 0.4s cubic-bezier(.22,1,.36,1) both; }

        /* banner hover glow */
        .ce-banner-wrap:hover { border-color: #a5b4fc !important; }
        .ce-banner-wrap:hover .ce-banner-hint { color: #6366f1 !important; }

        /* publish btn hover */
        .ce-publish:hover { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%) !important; box-shadow: 0 6px 24px rgba(99,102,241,0.4) !important; transform: translateY(-1px); }
        .ce-publish:active { transform: translateY(0); box-shadow: 0 2px 8px rgba(99,102,241,0.3) !important; }

        /* toggle pill */
        .ce-pill { display: inline-flex; background: #f1f5f9; border-radius: 8px; padding: 3px; gap: 2px; }
        .ce-pill button { border: none; background: transparent; padding: "6px 16px"; border-radius: 6px; font-size: 13px; font-weight: 500; color: #64748b; cursor: pointer; transition: all 0.2s; font-family: inherit; padding: 6px 18px; }
        .ce-pill button.active { background: #fff; color: #6366f1; box-shadow: 0 1px 4px rgba(0,0,0,0.1); font-weight: 600; }
        .ce-pill button:hover:not(.active) { color: #334155; }

        /* mode badge row */
        .ce-mode-row { display: flex; gap: 8px; flex-wrap: wrap; }
        .ce-mode-card { flex: 1 1 100px; min-width: 100px; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 14px 12px; text-align: center; cursor: pointer; transition: all 0.2s; background: #fff; }
        .ce-mode-card:hover { border-color: #a5b4fc; background: #eef2ff; }
        .ce-mode-card.active { border-color: #6366f1; background: linear-gradient(135deg, #eef2ff, #f5f3ff); box-shadow: 0 2px 12px rgba(99,102,241,0.15); }
        .ce-mode-card .mode-icon { font-size: 22px; margin-bottom: 4px; }
        .ce-mode-card .mode-label { font-size: 13px; font-weight: 600; color: #334155; }
        .ce-mode-card.active .mode-label { color: #6366f1; }
      `}</style>

      <div
        className="ce-page"
        style={{
          paddingTop: 112,
          paddingBottom: 80,
          minHeight: "100vh",
          background:
            "linear-gradient(180deg, #f0f4ff 0%, #fafbff 40%, #f8fafc 100%)",
          position: "relative",
        }}
      >
        {/* decorative blobs */}
        <div
          style={{
            position: "fixed",
            top: -120,
            right: -120,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "fixed",
            bottom: -80,
            left: -100,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div
          style={{
            maxWidth: 780,
            margin: "0 auto",
            padding: "0 20px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Header />

          {/* ── Page Title ── */}
          <div style={{ marginBottom: 28 }}>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#0f172a",
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              Create Event
            </h1>
            <p
              style={{
                fontSize: 14,
                color: "#64748b",
                marginTop: 4,
                marginBottom: 0,
              }}
            >
              Fill in the details below to publish your event
            </p>
          </div>

          {/* ── Cropper overlay (unchanged logic) ── */}
          {showCropper && (
            <BannerCropper
              file={rawImage}
              onCancel={() => setShowCropper(false)}
              onDone={(cropped) => {
                setImage(cropped);
                setPreview(URL.createObjectURL(cropped));
                setShowCropper(false);
              }}
            />
          )}

          {/* ═══════════ FORM SECTIONS ═══════════ */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* ── 1. Event Information ── */}
            <div className="ce-section" style={{ animationDelay: "0.05s" }}>
              <Section icon={IconTag} title="Event Information">
                <Field label="Event Title">
                  <StyledInput
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. Annual Tech Summit 2025"
                  />
                </Field>

                <Field label="Description" style={{ marginTop: 14 }}>
                  <StyledTextarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe your event — what attendees can expect…"
                    rows={3}
                  />
                </Field>

                {/* Banner upload */}
                <Field label="Event Banner" style={{ marginTop: 14 }}>
                  <label
                    className="ce-banner-wrap"
                    style={{
                      display: "block",
                      border: "2px dashed #cbd5e1",
                      borderRadius: 12,
                      cursor: "pointer",
                      overflow: "hidden",
                      transition: "border-color 0.25s",
                    }}
                  >
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageChange}
                    />

                    {!preview ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "32px 16px",
                          gap: 10,
                        }}
                      >
                        <IconUpload />
                        <p
                          className="ce-banner-hint"
                          style={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: "#64748b",
                            margin: 0,
                            transition: "color 0.25s",
                          }}
                        >
                          Click to upload event banner
                        </p>
                        <span style={{ fontSize: 12, color: "#94a3b8" }}>
                          Recommended size 1200 × 500 · PNG, JPG
                        </span>
                      </div>
                    ) : (
                      <div style={{ position: "relative" }}>
                        <img
                          src={preview}
                          alt="Event banner"
                          style={{
                            width: "100%",
                            display: "block",
                            maxHeight: 220,
                            objectFit: "cover",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background:
                              "linear-gradient(transparent 60%, rgba(0,0,0,0.35))",
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "center",
                            paddingBottom: 12,
                          }}
                        >
                          <span
                            style={{
                              color: "#fff",
                              fontSize: 13,
                              fontWeight: 600,
                              opacity: 0.9,
                            }}
                          >
                            Click to replace
                          </span>
                        </div>
                      </div>
                    )}
                  </label>
                </Field>
              </Section>
            </div>

            {/* ── 2. Date & Time ── */}
            <div className="ce-section" style={{ animationDelay: "0.1s" }}>
              <Section icon={IconCalendar} title="Date & Time">
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <Field label="Start Date" half>
                    <InputWithIcon icon={IconCalendar}>
                      <StyledInput
                        type="date"
                        name="start_date"
                        value={form.start_date}
                        onChange={handleChange}
                      />
                    </InputWithIcon>
                  </Field>
                  <Field label="End Date" half>
                    <InputWithIcon icon={IconCalendar}>
                      <StyledInput
                        type="date"
                        name="end_date"
                        value={form.end_date}
                        onChange={handleChange}
                      />
                    </InputWithIcon>
                  </Field>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    flexWrap: "wrap",
                    marginTop: 14,
                  }}
                >
                  <Field label="Start Time" half>
                    <InputWithIcon icon={IconClock}>
                      <StyledInput
                        type="time"
                        name="start_time"
                        value={form.start_time}
                        onChange={handleChange}
                      />
                    </InputWithIcon>
                  </Field>
                  <Field label="End Time" half>
                    <InputWithIcon icon={IconClock}>
                      <StyledInput
                        type="time"
                        name="end_time"
                        value={form.end_time}
                        onChange={handleChange}
                      />
                    </InputWithIcon>
                  </Field>
                </div>
              </Section>
            </div>

            {/* ── 3. Location ── */}
            <div className="ce-section" style={{ animationDelay: "0.15s" }}>
              <Section icon={IconLocation} title="Location">
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <Field label="City" half>
                    <StyledSelect
                      name="location"
                      value={form.location}
                      onChange={async (e) => {
                        handleChange(e);

                        const cityId = e.target.value;
                        const cityObj = cities.find((c) => c._id === cityId);

                        if (!cityObj?.city) return;

                        try {
                          const res = await fetch(
                            `https://nominatim.openstreetmap.org/search?format=json&q=${cityObj.city}, India`,
                          );

                          const data = await res.json();

                          if (data.length > 0) {
                            setCoords({
                              lat: Number(data[0].lat),
                              lng: Number(data[0].lon),
                            });
                          }
                        } catch (err) {
                          console.error("Geocoding failed", err);
                        }
                      }}
                    >
                      <option value="">Select city</option>
                      {cities.map((city) => (
                        <option key={city._id} value={city._id}>
                          {city.city}
                        </option>
                      ))}
                    </StyledSelect>
                  </Field>
                  <Field label="Address" half>
                    <InputWithIcon icon={IconLocation}>
                      <StyledInput
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="Venue address"
                      />
                    </InputWithIcon>
                  </Field>
                </div>
              </Section>
            </div>
            {form.location && (
              <div
                style={{
                  marginTop: 14,
                  borderRadius: 14,
                  overflow: "hidden",
                  border: "1px solid #e2e8f0",
                }}
              >
                <MapPicker
                  value={coords}
                  onChange={({ lat, lng, address }) => {
                    setCoords({ lat, lng });
                    setForm((prev) => ({ ...prev, address }));
                  }}
                />
              </div>
            )}

            {/* ── 4. Category ── */}
            <div className="ce-section" style={{ animationDelay: "0.2s" }}>
              <Section icon={IconTag} title="Category">
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <Field label="Category" half>
                    <StyledSelect
                      value={form.category}
                      onChange={handleCategoryChange}
                    >
                      <option value="">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </StyledSelect>
                  </Field>
                  <Field label="Sub Category" half>
                    <StyledSelect
                      name="subCategory"
                      value={form.subCategory}
                      onChange={handleChange}
                      disabled={!subCategories.length}
                      style={
                        !subCategories.length
                          ? { opacity: 0.5, cursor: "not-allowed" }
                          : {}
                      }
                    >
                      <option value="">Sub category</option>
                      {subCategories.map((sub) => (
                        <option key={sub._id} value={sub._id}>
                          {sub.name}
                        </option>
                      ))}
                    </StyledSelect>
                  </Field>
                </div>
              </Section>
            </div>

            {/* ── 5. Event Mode ── */}
            <div className="ce-section" style={{ animationDelay: "0.25s" }}>
              <Section icon={IconGlobe} title="Event Mode">
                <div className="ce-mode-row">
                  {[
                    { value: "online", label: "Online", icon: "🌐" },
                    { value: "offline", label: "Offline", icon: "📍" },
                    { value: "hybrid", label: "Hybrid", icon: "🔀" },
                  ].map((mode) => (
                    <div
                      key={mode.value}
                      className={`ce-mode-card${form.eventMode === mode.value ? " active" : ""}`}
                      onClick={() =>
                        setForm({ ...form, eventMode: mode.value })
                      }
                    >
                      <div className="mode-icon">{mode.icon}</div>
                      <div className="mode-label">{mode.label}</div>
                    </div>
                  ))}
                </div>
              </Section>
            </div>

            {/* ── 6. Ticket Price ── */}
            <div className="ce-section" style={{ animationDelay: "0.3s" }}>
              <Section icon={IconDollar} title="Ticket Price">
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <InputWithIcon icon={IconDollar}>
                      <StyledInput
                        name="ticket_price"
                        value={form.ticket_price}
                        onChange={handleChange}
                        placeholder="e.g. 499"
                        type="number"
                        min="0"
                      />
                    </InputWithIcon>
                  </div>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: form.ticket_price === "" ? "#10b981" : "#64748b",
                      background:
                        form.ticket_price === "" ? "#ecfdf5" : "#f1f5f9",
                      padding: "6px 12px",
                      borderRadius: 20,
                      whiteSpace: "nowrap",
                      transition: "all 0.25s",
                    }}
                  >
                    {form.ticket_price === "" ? "🎟 FREE" : "💰 Paid"}
                  </span>
                </div>
              </Section>
            </div>

            {/* ── 7. Visibility ── */}
            <div className="ce-section" style={{ animationDelay: "0.35s" }}>
              <Section icon={IconGlobe} title="Visibility">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: "#334155",
                        margin: 0,
                      }}
                    >
                      {form.visibility === "public" ? "Public" : "Private"}{" "}
                      Event
                    </p>
                    <p
                      style={{
                        fontSize: 13,
                        color: "#94a3b8",
                        margin: "3px 0 0",
                      }}
                    >
                      {form.visibility === "public"
                        ? "Visible to everyone on the platform"
                        : "Only invited attendees can see this event"}
                    </p>
                  </div>

                  {/* pill toggle */}
                  <div className="ce-pill">
                    <button
                      className={form.visibility === "public" ? "active" : ""}
                      onClick={() => setForm({ ...form, visibility: "public" })}
                    >
                      Public
                    </button>
                    <button
                      className={form.visibility === "private" ? "active" : ""}
                      onClick={() =>
                        setForm({ ...form, visibility: "private" })
                      }
                    >
                      Private
                    </button>
                  </div>
                </div>
              </Section>
            </div>

            {/* ── SUBMIT ── */}
            <div
              className="ce-section"
              style={{ animationDelay: "0.4s", paddingTop: 4 }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <span style={{ fontSize: 13, color: "#94a3b8" }}>
                  * Title, Category & City are required
                </span>
                <button
                  className="ce-publish"
                  onClick={submitEvent}
                  style={{
                    background:
                      "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                    color: "#fff",
                    border: "none",
                    padding: "13px 36px",
                    borderRadius: 12,
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 4px 18px rgba(99,102,241,0.35)",
                    transition: "all 0.2s cubic-bezier(.22,1,.36,1)",
                    letterSpacing: "0.02em",
                    fontFamily: "inherit",
                  }}
                >
                  Publish Event →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CreateEvent;
