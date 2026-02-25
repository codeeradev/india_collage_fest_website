import { useState } from "react";
import AuthLayout from "../components/Auth/AuthLayout";
import OtpInput from "../components/Auth/OtpInput";
import { post } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";
import { showAlert } from "../components/AlertAndLoader/UIComponents";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../components/Auth/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

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
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-slate-900">Welcome back</h2>
            <p className="mt-2 text-sm text-slate-500">Sign in with your email to receive a secure verification code.</p>
          </div>

          <label className="mb-2 block text-sm font-medium text-slate-700">Email address</label>

          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-6 h-12 rounded-xl border-slate-300 bg-slate-50/70 px-4 text-slate-900 shadow-inner focus-visible:border-blue-400 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-blue-100"
          />

          <Button
            onClick={sendOtp}
            className="h-12 w-full rounded-xl !bg-blue-700 text-base font-semibold !text-white shadow-[0_14px_28px_-18px_rgba(29,78,216,0.75)] transition-all hover:!bg-blue-800"
          >
            Send OTP
          </Button>
        </>
      )}

      {/* ================= OTP STEP ================= */}
      {step === "otp" && (
        <>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-slate-900">Enter verification code</h2>
            <p className="mt-2 text-sm text-slate-500">A 6-digit OTP was sent to <span className="font-medium text-slate-700">{email}</span>.</p>
          </div>

          <OtpInput value={otp} onChange={setOtp} />

          <Button
            onClick={verifyOtp}
            className="mt-6 h-12 w-full rounded-xl !bg-blue-700 text-base font-semibold !text-white shadow-[0_14px_28px_-18px_rgba(29,78,216,0.75)] transition-all hover:!bg-blue-800"
          >
            Verify & Login
          </Button>

          <Button
            onClick={sendOtp}
            variant="ghost"
            className="mt-4 w-full text-sm font-medium !text-slate-600 transition-colors hover:!text-blue-700"
          >
            Resend OTP
          </Button>
        </>
      )}
    </AuthLayout>
  );
};

export default Login;
