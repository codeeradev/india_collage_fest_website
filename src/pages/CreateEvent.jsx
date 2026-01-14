import { useEffect, useState } from "react";
import { ENDPOINTS } from "../api/endpoints";
import { get, post } from "../api/apiClient";
import { Alert, Loader } from "../components/AlertAndLoader/Alert";

const CreateEvent = () => {
    const [form, setForm] = useState({
        title: "",
        description: "",
        location: "",
        category: "",
        subCategory: "",
        visibility: "public",
    });

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [cities, setCities] = useState([]);

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ type: "", message: "" });

    /* ---------------- AUTO HIDE ALERT ---------------- */
    useEffect(() => {
        if (alert.message) {
            const timer = setTimeout(() => {
                setAlert({ type: "", message: "" });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

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
            } catch (error) {
                console.log("error", error)
                setAlert({
                    type: "error",
                    message: "Failed to load initial data",
                });
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
            const res = await get(
                `${ENDPOINTS.GET_SUB_CATEGORIES}?categoryId=${categoryId}`
            );
            setSubCategories(res.data.subCategory || []);
        } catch {
            setAlert({
                type: "error",
                message: "Failed to load sub categories",
            });
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
            setAlert({
                type: "warning",
                message: "Please fill required fields",
            });
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            Object.entries(form).forEach(([key, value]) =>
                formData.append(key, value)
            );

            if (image) formData.append("image", image);

            await post(ENDPOINTS.ADD_EVENT, formData, {
                authRequired: true,
            });

            setAlert({
                type: "success",
                message: "Event created successfully",
            });

            setForm({
                title: "",
                description: "",
                location: "",
                category: "",
                subCategory: "",
                visibility: "public",
            });

            setImage(null);
            setPreview(null);
            setSubCategories([]);
        } catch {
            setAlert({
                type: "error",
                message: "Something went wrong while creating event",
            });
        } finally {
            setLoading(false);
        }
    };

    /* ---------------- UI ---------------- */
    return (
        <div className="pt-28 pb-20 bg-slate-50 min-h-screen relative">

            {/* 🔔 RIGHT SIDE NOTIFICATION */}
            <div className="fixed top-24 right-6 z-50 w-[340px] animate-slide-in">
                {alert.message && (
                    <Alert type={alert.type} message={alert.message} />
                )}
            </div>

            {loading && <Loader label="Creating event..." />}

            <div className="max-w-3xl mx-auto px-4 space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-semibold text-slate-900">
                        Create Event
                    </h1>
                    <p className="text-slate-600 mt-1">
                        Fill in the details to publish your event
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-5">

                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Event title"
                        className="w-full rounded-md border border-slate-300 px-3 py-2"
                    />

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Event description"
                        className="w-full rounded-md border border-slate-300 px-3 py-2"
                    />

                    <select
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 bg-white"
                    >
                        <option value="">Select City</option>
                        {cities.map((city) => (
                            <option key={city._id} value={city.city}>
                                {city.city}
                            </option>
                        ))}
                    </select>

                    <select
                        value={form.category}
                        onChange={handleCategoryChange}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 bg-white"
                    >
                        <option value="">Select Category</option>
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
                        className="w-full rounded-md border border-slate-300 px-3 py-2 bg-white disabled:opacity-50"
                    >
                        <option value="">Select Sub Category</option>
                        {subCategories.map((sub) => (
                            <option key={sub._id} value={sub._id}>
                                {sub.name}
                            </option>
                        ))}
                    </select>

                    <div>
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="mt-3 h-40 rounded-lg object-cover border"
                            />
                        )}
                    </div>

                    <select
                        name="visibility"
                        value={form.visibility}
                        onChange={handleChange}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 bg-white"
                    >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>

                    <div className="flex justify-end pt-4">
                        <button
                            onClick={submitEvent}
                            className="px-6 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
                        >
                            Publish Event
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateEvent;
