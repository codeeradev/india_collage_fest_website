import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ExploreMenu from "./ExploreMenu";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import CitySelectorModal from "./CitySelectorModal";
import { AuthContext } from "../Auth/AuthContext";
import { useCity } from "../../context/CityContext";

const Header = () => {
  const [exploreOpen, setExploreOpen] = useState(false);
  const [cityModalOpen, setCityModalOpen] = useState(false);
  const { city, setCity } = useCity();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const exploreRef = useRef(null);

  useEffect(() => {
    const onPointerDown = (event) => {
      if (!exploreRef.current?.contains(event.target)) {
        setExploreOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const handleCreateEvent = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    navigate("/create-event");
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/88 backdrop-blur-xl supports-[backdrop-filter]:bg-white/82">
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/45 to-transparent" />

        <div className="mx-auto max-w-[1320px] px-4 md:px-6 lg:px-8">
          <div className="flex h-[70px] items-center justify-between gap-3 md:gap-5">
            <div className="flex items-center gap-3 lg:gap-7">
              <Link to="/" className="flex items-center">
                <Logo />
              </Link>

              <div ref={exploreRef} className="relative hidden lg:block">
                <button
                  type="button"
                  onClick={() => setExploreOpen((prev) => !prev)}
                  className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-semibold text-slate-700 shadow-[0_8px_16px_-14px_rgba(15,23,42,0.45)] transition-all hover:border-blue-300 hover:text-blue-700"
                >
                  <span>Explore</span>
                  <svg
                    className={`h-4 w-4 transition-transform duration-200 ${
                      exploreOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {exploreOpen && (
                  <div className="absolute left-0 top-full mt-3 z-50 animate-enter-up">
                    <ExploreMenu />
                  </div>
                )}
              </div>
            </div>

            <div className="hidden lg:flex max-w-xl flex-1">
              <div className="w-full rounded-full border border-slate-200 bg-slate-50/90 shadow-[0_10px_22px_-18px_rgba(15,23,42,0.5)] transition-all duration-300 hover:border-blue-200 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
                <SearchBar />
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 md:gap-2.5">
              <button
                type="button"
                className="flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-blue-300 hover:text-blue-700 md:px-4"
                onClick={() => setCityModalOpen(true)}
                aria-label="Select city"
                title={city ? `Current city: ${city.city}` : "Select city"}
              >
                <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4.5 8-12a8 8 0 10-16 0c0 7.5 8 12 8 12z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="max-w-[110px] truncate">{city ? city.city : "Select City"}</span>
              </button>

              <button
                type="button"
                onClick={handleCreateEvent}
                className="flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-blue-400 hover:text-blue-700 md:px-4"
                aria-label="Create event"
                title="Create Event"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span>Create Event</span>
              </button>

              {user ? (
                <button
                  type="button"
                  onClick={() => navigate("/profile")}
                  className="group flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white pl-2 pr-3 py-1.5 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
                  title="Profile"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-blue-700 to-cyan-500 text-sm font-bold uppercase text-white">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-700 max-w-[120px] truncate">
                    {user?.name || "Profile"}
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <CitySelectorModal
        open={!city || cityModalOpen}
        onClose={() => {
          if (!city) return;
          setCityModalOpen(false);
        }}
        onSelect={(selectedCity) => {
          setCity(selectedCity);
          setCityModalOpen(false);
        }}
      />
    </>
  );
};

export default Header;
