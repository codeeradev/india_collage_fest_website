import { useState, useEffect } from "react";
import AuthLayout from "./AuthLayout";
import { post, get } from "../../api/apiClient";
import { ENDPOINTS } from "../../api/endpoints";
import { showAlert } from "../AlertAndLoader/UIComponents";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    status: false,
  });

  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const cityRes = await get(ENDPOINTS.GET_CITIES);

        setCities(cityRes.data.data || []);
      } catch (error) {
        console.log("error", error);
        showAlert("error", "Failed to load initial data");
      }
    };

    fetchInitialData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ---------------- REGISTER ---------------- */
  const registerUser = async () => {
    const { name, email, phone } = form;

    if (!name || !email || !phone) {
      showAlert("warning", "Please fill required fields");
      return;
    }

    try {
      showAlert("loading", "Creating account...");
      await post(ENDPOINTS.REGISTER, form);
      showAlert("success", "Account created successfully");
      navigate("/login");
    } catch (error) {
      const msg = error?.response?.data?.message;
      showAlert("error", msg || "Registration failed");
    }
  };

  return (
    <AuthLayout>
      <div className="auth-card">
        <h2 className="text-2xl font-bold mb-1 text-slate-900">
          Create your account 🚀
        </h2>

        <p className="text-slate-600 mb-6 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-rose-500 font-medium">
            Login
          </Link>
        </p>

        <div className="space-y-3">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="input"
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="input"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="input"
          />

          <select
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="input"
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city._id} value={city._id}>
                {city.city}
              </option>
            ))}
          </select>
        </div>

        <button onClick={registerUser} className="auth-btn w-full mt-6">
          Register
        </button>
      </div>
    </AuthLayout>
  );
};

export default Register;
