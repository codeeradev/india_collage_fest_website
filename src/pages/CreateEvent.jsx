import { useEffect, useState } from "react";
import { ENDPOINTS } from "../api/endpoints";
import { get, post } from "../api/apiClient";
import { showAlert } from "../components/AlertAndLoader/UIComponents";
import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header/Header";

const CreateEvent = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    address: "",
    category: "",
    subCategory: "",

    // ✅ backend required
    ticket_price: "",
    eventMode: "", // online | offline
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

  const navigate = useNavigate();

  /* ---------------- FETCH INITIAL DATA ---------------- */
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

  /* ---------------- HANDLERS ---------------- */
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ---------------- SUBMIT ---------------- */
  const submitEvent = async () => {
    if (!form.title || !form.category || !form.location) {
      showAlert("warning", "Please fill required fields");
      return;
    }

    try {
      showAlert("loading", "Creating event...");

      const payload = {
        ...form,

        // ✅ ONLY empty → free
        ticket_price: form.ticket_price === "" ? "free" : form.ticket_price,

        // ✅ backend wants boolean
        visibility: form.visibility === "public",

        // ✅ offline only
        address: form.eventMode === "offline" ? form.address : "",
      };

      const formData = new FormData();

      Object.entries(payload).forEach(([key, value]) => {
        formData.append(key, value ?? "");
      });

      if (image) {
        formData.append("image", image);
      }

      await post(ENDPOINTS.ADD_EVENT, formData, {
        authRequired: true,
      });

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

  /* ---------------- UI ---------------- */
  return (
    <>
      <div className="pt-28 pb-20 bg-slate-50 min-h-screen relative">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <Header />

          <div>
            <h1 className="text-3xl font-semibold text-slate-900">
              Create Event
            </h1>
            <p className="text-slate-600 mt-1">
              Fill in the details to publish your event
            </p>
          </div>

          <div className="form-card space-y-8">
            {/* EVENT INFO */}
            <div className="form-section">
              <h3>Event Information</h3>

              <input
                className="input"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Event title"
              />

              <textarea
                className="input"
                rows={3}
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Event description"
              />

              <label className="upload-box">
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />

                {!preview ? (
                  <div className="upload-placeholder">
                    <p>Click to upload event banner</p>
                    <span>Recommended size 1200 × 500</span>
                  </div>
                ) : (
                  <img
                    src={preview}
                    alt="Event banner"
                    className="upload-image"
                  />
                )}
              </label>
            </div>

            {/* DATE & TIME */}
            <div className="form-section">
              <h3>Date & Time</h3>

              <div className="form-grid">
                <input
                  type="date"
                  name="start_date"
                  value={form.start_date}
                  onChange={handleChange}
                  className="input"
                />

                <input
                  type="date"
                  name="end_date"
                  value={form.end_date}
                  onChange={handleChange}
                  className="input"
                />

                <input
                  type="time"
                  name="start_time"
                  value={form.start_time}
                  onChange={handleChange}
                  className="input"
                />

                <input
                  type="time"
                  name="end_time"
                  value={form.end_time}
                  onChange={handleChange}
                  className="input"
                />
              </div>
            </div>

            {/* LOCATION */}
            <div className="form-section">
              <h3>Location</h3>

              <div className="form-grid">
                <select
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Select city</option>
                  {cities.map((city) => (
                    <option key={city._id} value={city._id}>
                      {city.city}
                    </option>
                  ))}
                </select>

                <input
                  className="input"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Event address"
                />
              </div>
            </div>

            {/* CATEGORY */}
            <div className="form-section">
              <h3>Category</h3>

              <div className="form-grid">
                <select
                  value={form.category}
                  onChange={handleCategoryChange}
                  className="input"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                <select
                  name="subCategory"
                  value={form.subCategory}
                  onChange={handleChange}
                  disabled={!subCategories.length}
                  className="input"
                >
                  <option value="">Sub category</option>
                  {subCategories.map((sub) => (
                    <option key={sub._id} value={sub._id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* EVENT MODE */}
            <div className="form-section">
              <h3>Event Mode</h3>

              <select
                name="eventMode"
                value={form.eventMode}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select mode</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>

            {/* PRICE */}
            <div className="form-section">
              <input
                className="input"
                name="ticket_price"
                value={form.ticket_price}
                onChange={handleChange}
                placeholder="Ticket price (leave empty = Free)"
              />
            </div>

            {/* VISIBILITY */}
            <div className="form-section flex items-center justify-between">
              <div>
                <h3>Visibility</h3>
                <p className="text-sm text-slate-500">
                  Public events appear to everyone
                </p>
              </div>

              <select
                name="visibility"
                value={form.visibility}
                onChange={(e) =>
                  setForm({ ...form, visibility: e.target.value })
                }
                className="input w-40"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>

            {/* SUBMIT */}
            <div className="flex justify-end">
              <button onClick={submitEvent} className="publish-btn">
                Publish Event
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateEvent;
