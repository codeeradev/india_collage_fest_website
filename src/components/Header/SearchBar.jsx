import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const typingRef = useRef(false);

  useEffect(() => {
    // 🔒 block auto redirect on first render
    if (!typingRef.current) return;

    const timer = setTimeout(() => {
      if (value.trim()) {
        navigate(`/events?search=${encodeURIComponent(value)}`);
      } else {
        navigate("/events");
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div
      className="
        flex items-center gap-2
        w-full max-w-[420px]
        bg-bgLight
        border border-borderLight
        rounded-full px-4 py-2
        transition
        focus-within:border-primary
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 text-textSecondary"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>

      <input
        value={value}
        onChange={(e) => {
          typingRef.current = true;
          setValue(e.target.value);
        }}
        placeholder="Search for any event"
        className="
          w-full bg-transparent
          text-sm text-textPrimary
          placeholder-textSecondary
          outline-none
        "
      />
    </div>
  );
};

export default SearchBar;
