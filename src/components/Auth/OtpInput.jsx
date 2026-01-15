const OtpInput = ({ value, onChange }) => {
  return (
    <input
      type="text"
      maxLength={6}
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
      placeholder="Enter 6-digit OTP"
      className="w-full text-center tracking-[0.6em] text-xl border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-rose-400 outline-none"
    />
  );
};

export default OtpInput;
