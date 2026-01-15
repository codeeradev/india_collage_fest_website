import { useState } from "react";
import AuthLayout from "../components/Auth/AuthLayout";
import OtpInput from "../components/Auth/OtpInput";
import { post } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";
import { showAlert } from "../components/AlertAndLoader/UIComponents";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("email"); // email | otp

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
      localStorage.setItem("token", res.data.token);
      showAlert("success", "Login successful");
    } catch {
      showAlert("error", "Invalid OTP");
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-semibold mb-2 text-slate-900">
        Good to see you again 👋
      </h2>

      <p className="text-slate-600 mb-4">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="text-rose-500 font-medium">
          Create one now
        </Link>
      </p>

      {/* EMAIL STEP */}
      {step === "email" && (
        <>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-4 py-3 mb-4 focus:ring-2 focus:ring-rose-400 outline-none"
          />

          <button
            onClick={sendOtp}
            style={{ backgroundColor: "#fb5f6a", color: "#fff" }}
            className="w-full py-3 rounded-lg font-semibold"
          >
            Send OTP
          </button>
        </>
      )}

      {/* OTP STEP */}
      {step === "otp" && (
        <>
          <OtpInput value={otp} onChange={setOtp} />

          <button
            onClick={verifyOtp}
            style={{ backgroundColor: "#fb5f6a", color: "#fff" }}
            className="w-full py-3 rounded-lg font-semibold mt-4"
          >
            Verify & Login
          </button>

          <button
            onClick={sendOtp}
            className="w-full text-sm text-slate-500 mt-3"
          >
            Resend OTP
          </button>
        </>
      )}
    </AuthLayout>
  );
};

export default Login;
