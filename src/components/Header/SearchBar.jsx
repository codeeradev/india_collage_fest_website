import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const typingRef = useRef(false);

  useEffect(() => {
    // Block auto redirect on first render.
    if (!typingRef.current) return;

    const timer = setTimeout(() => {
      if (value.trim()) {
        navigate(`/events?search=${encodeURIComponent(value)}`);
      } else {
        navigate("/events");
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [value, navigate]);

  return (
    <div className="group flex w-full items-center gap-3 rounded-full px-4 py-2.5 transition-all duration-300">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 shrink-0 text-slate-400 transition-colors duration-300 group-focus-within:text-blue-600 group-hover:text-blue-500"
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
        placeholder="Search events, venues, or organizers"
        className="w-full bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:font-medium placeholder:text-slate-400"
      />
    </div>
  );
};

export default SearchBar;
