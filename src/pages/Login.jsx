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
      {step === "email" && (
        <>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Welcome</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">Sign in to continue</h2>
          <p className="mt-2 text-sm text-slate-600">Enter your email and we will send a one-time code.</p>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-6 w-full border border-slate-300 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-blue-300 outline-none"
          />

          <button
            onClick={sendOtp}
            className="mt-5 w-full rounded-xl bg-gradient-to-r from-blue-700 to-cyan-500 py-3.5 text-base font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Continue
          </button>
        </>
      )}

      {step === "otp" && (
        <>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Verification</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">Enter verification code</h2>
          <p className="mt-2 text-sm text-slate-600">Code sent to <span className="font-semibold text-slate-800">{email}</span></p>

          <div className="mt-6">
            <OtpInput value={otp} onChange={setOtp} />
          </div>

          <button
            onClick={verifyOtp}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-blue-700 to-cyan-500 py-3.5 text-base font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Verify & Login
          </button>

          <div className="mt-4 flex items-center justify-between text-sm">
            <button onClick={sendOtp} className="text-slate-500 transition hover:text-blue-700">
              Resend OTP
            </button>
            <button onClick={() => setStep("email")} className="text-slate-500 transition hover:text-blue-700">
              Change email
            </button>
          </div>
        </>
      )}
    </AuthLayout>
  );
};

export default Login;
