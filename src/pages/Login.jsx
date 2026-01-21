import { useState } from "react";
import AuthLayout from "../components/Auth/AuthLayout";
import OtpInput from "../components/Auth/OtpInput";
import { post } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";
import { showAlert } from "../components/AlertAndLoader/UIComponents";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../components/Auth/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("email"); // email | otp

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  /* ---------------- SEND OTP ---------------- */
  const sendOtp = async () => {
    if (!email) {
      showAlert("warning", "Please enter email");
      return;
    }

    try {
      showAlert("loading", "Sending OTP...");
      await post(ENDPOINTS.LOGIN, { email });
      showAlert("success", "OTP sent to your email");
      setStep("otp");
    } catch (error) {
      const msg = error?.response?.data?.message;
      showAlert("error", msg || "Failed to send OTP");
    }
  };

  /* ---------------- VERIFY OTP ---------------- */
  const verifyOtp = async () => {
    if (otp.length !== 6) {
      showAlert("warning", "Enter valid 6-digit OTP");
      return;
    }

    try {
      showAlert("loading", "Verifying OTP...");
      const res = await post(ENDPOINTS.VERIFY_OTP, { email, otp });
      console.log(res.data.token);
      login(res.data.user, res.data.token);
      showAlert("success", "Login successful");
      navigate("/");
    } catch {
      showAlert("error", "Invalid OTP");
    }
  };

  return (
    <AuthLayout>
      {/* ================= EMAIL STEP ================= */}
      {step === "email" && (
        <>
          <h2 className="text-2xl font-semibold mb-6 text-slate-900">
            Welcome back
          </h2>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3.5 mb-6 focus:ring-2 focus:ring-rose-400 outline-none"
          />

          <button
            onClick={sendOtp}
            style={{ backgroundColor: "#fb5f6a", color: "#fff" }}
            className="w-full py-3.5 rounded-xl font-semibold text-base shadow-sm"
          >
            Continue
          </button>
        </>
      )}

      {/* ================= OTP STEP ================= */}
      {step === "otp" && (
        <>
          <h2 className="text-2xl font-semibold mb-6 text-slate-900">
            Enter verification code
          </h2>

          <OtpInput value={otp} onChange={setOtp} />

          <button
            onClick={verifyOtp}
            style={{ backgroundColor: "#fb5f6a", color: "#fff" }}
            className="w-full py-3.5 rounded-xl font-semibold text-base shadow-sm mt-6"
          >
            Verify & Login
          </button>

          <button
            onClick={sendOtp}
            className="w-full text-sm text-slate-500 mt-4"
          >
            Resend OTP
          </button>
        </>
      )}
    </AuthLayout>
  );
};

export default Login;
