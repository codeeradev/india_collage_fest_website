import { Input } from "../ui/input";

const OtpInput = ({ value, onChange }) => {
  return (
    <div className="space-y-3">
      <Input
        type="text"
        value={value}
        maxLength={6}
        onChange={(event) => onChange(event.target.value.replace(/\D/g, ""))}
        placeholder="Enter 6-digit OTP"
        className="h-12 rounded-xl border-slate-300 bg-slate-50/70 text-center font-mono text-lg tracking-[0.45em] text-slate-900 shadow-inner focus-visible:border-blue-400 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-blue-100"
      />
      <p className="text-center text-xs text-slate-500">Enter the 6-digit code</p>
    </div>
  );
};

export default OtpInput;
