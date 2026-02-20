import { useState, useEffect } from "react";
import { ENDPOINTS } from "../api/endpoints";
import { post, get } from "../api/apiClient";
import TurnstileCaptcha from "./Captcha/TurnstileCaptcha";

// eslint-disable-next-line react/prop-types
const BecomeOrganizerModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [otp, setOtp] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaKey, setCaptchaKey] = useState(0);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    image: null,
  });

  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
  const captchaEnabled = Boolean(turnstileSiteKey);

  const resetCaptcha = () => {
    setCaptchaToken("");
    setCaptchaKey((key) => key + 1);
  };

  // lock scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  // fetch cities
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await get(ENDPOINTS.GET_CITIES);
        setCities(res.data.data || res.data);
      } catch (e) {
        console.log("City fetch error");
      }
    };
    fetchCities();
  }, []);

  // =====================
  // SEND OTP
  // =====================
  const handleSendOtp = async () => {
    if (!form.name) return alert("Enter name");
    if (!form.email.includes("@")) return alert("Enter email");
    if (!form.phone) return alert("Enter phone");
    if (form.phone.length !== 10) return alert("Phone must be 10 digits");
    if (!form.location) return alert("Select city");
    if (!form.image) return alert("Upload profile image");
    if (captchaEnabled && !captchaToken) return alert("Complete the captcha");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("location", form.location);
      formData.append("image", form.image);
      if (captchaEnabled) {
        formData.append("cf-turnstile-response", captchaToken);
      }

      await post(ENDPOINTS.BECOME_A_ORGANISER, formData);

      alert("OTP sent");
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
      if (captchaEnabled) resetCaptcha();
    }
  };

  // =====================
  // VERIFY OTP
  // =====================
  const handleVerifyOtp = async () => {
    if (otp.length !== 6) return alert("Enter 6 digit OTP");

    try {
      setLoading(true);

      const res = await post(ENDPOINTS.VERIFY_OTP, {
        email: form.email,
        otp,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("OTP verified. Waiting for admin approval.");
      onClose();
    } catch (err) {
      alert("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <h2 className="modal-title">Become an Organizer</h2>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <input
              className="input"
              placeholder="Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              className="input"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              className="input"
              placeholder="Phone"
              maxLength={10}
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value.replace(/\D/g, ""),
                })
              }
            />

            <select
              className="input"
              value={form.location}
              onChange={(e) =>
                setForm({ ...form, location: e.target.value })
              }
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city._id} value={city._id}>
                  {city.city}
                </option>
              ))}
            </select>

            {/* IMAGE UPLOAD */}
            <label className="upload-box">
              {!form.image ? (
                <div className="upload-placeholder">
                  <p>Upload Profile Photo</p>
                  <span>PNG / JPG</span>
                </div>
              ) : (
                <img
                  src={URL.createObjectURL(form.image)}
                  alt="preview"
                  className="upload-image"
                />
              )}

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) =>
                  setForm({ ...form, image: e.target.files[0] })
                }
              />
            </label>

            <div className="flex justify-center mt-4">
              <TurnstileCaptcha
                key={`organiser-captcha-${captchaKey}`}
                siteKey={turnstileSiteKey}
                onVerify={setCaptchaToken}
                onExpire={() => setCaptchaToken("")}
              />
            </div>

            <div className="modal-actions">
              <button
                onClick={handleSendOtp}
                disabled={loading || (captchaEnabled && !captchaToken)}
                className="modal-btn"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </div>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <input
              className="input text-center tracking-widest"
              placeholder="Enter OTP"
              maxLength={6}
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, ""))
              }
            />

            <div className="modal-actions">
              <button
                onClick={handleVerifyOtp}
                disabled={loading || otp.length !== 6}
                className="modal-btn"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          </>
        )}

        <button onClick={onClose} className="modal-cancel">
          Cancel
        </button>

      </div>
    </div>
  );
};

export default BecomeOrganizerModal;
