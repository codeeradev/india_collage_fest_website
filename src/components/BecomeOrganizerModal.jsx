import { useState, useEffect } from "react";
import { ENDPOINTS } from "../api/endpoints";
import { post, get } from "../api/apiClient";
import TurnstileCaptcha from "./Captcha/TurnstileCaptcha";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

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

  useEffect(() => {
    const onEscape = (event) => {
      if (event.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [onClose]);

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
    <div
      className="fixed inset-0 z-[99999] flex items-start justify-center bg-slate-950/55 px-4 pb-8 pt-20 backdrop-blur-sm md:pt-24"
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-[460px] max-h-[calc(100vh-7rem)] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_34px_80px_-42px_rgba(15,23,42,0.45)] [scrollbar-width:thin] [scrollbar-color:rgba(100,116,139,0.7)_transparent] md:max-h-[calc(100vh-9rem)] md:p-7"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Become an Organizer</h2>
            <p className="mt-1 text-sm text-slate-500">
              {step === 1 ? "Share your basic details to receive OTP." : "Enter the verification code sent to your email."}
            </p>
          </div>
          <Button
            type="button"
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close modal"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <Input
              className="mb-3 h-11 rounded-xl border-slate-300 bg-slate-50 px-3.5"
              placeholder="Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <Input
              className="mb-3 h-11 rounded-xl border-slate-300 bg-slate-50 px-3.5"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <Input
              className="mb-3 h-11 rounded-xl border-slate-300 bg-slate-50 px-3.5"
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
              className="mb-4 h-11 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 text-sm text-slate-700 outline-none transition-all focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
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
            <label className="mb-4 flex h-[190px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 transition-all hover:border-blue-400 hover:bg-blue-50/40">
              {!form.image ? (
                <div className="text-center">
                  <p className="text-sm font-semibold text-slate-700">Upload Profile Photo</p>
                  <span className="text-xs text-slate-500">PNG / JPG</span>
                </div>
              ) : (
                <img
                  src={URL.createObjectURL(form.image)}
                  alt="preview"
                  className="h-full w-full rounded-2xl object-cover"
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

            <div className="mt-4">
              <Button
                type="button"
                onClick={handleSendOtp}
                disabled={loading || (captchaEnabled && !captchaToken)}
                className="h-11 w-full rounded-full !bg-blue-700 !text-white hover:!bg-blue-800"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </div>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <Input
              className="h-11 rounded-xl border-slate-300 bg-slate-50 px-3.5 text-center font-mono tracking-[0.42em]"
              placeholder="Enter OTP"
              maxLength={6}
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, ""))
              }
            />

            <div className="mt-4">
              <Button
                type="button"
                onClick={handleVerifyOtp}
                disabled={loading || otp.length !== 6}
                className="h-11 w-full rounded-full !bg-blue-700 !text-white hover:!bg-blue-800"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
            </div>
          </>
        )}

        <Button variant="ghost" onClick={onClose} className="mt-3 w-full text-sm font-medium text-slate-500 transition-colors hover:text-slate-700">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default BecomeOrganizerModal;

