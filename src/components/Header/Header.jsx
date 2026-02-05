import { useState, useContext } from "react";
import ExploreMenu from "./ExploreMenu";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import CitySelectorModal from "./CitySelectorModal";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";
import { useCity } from "../../context/CityContext";

const Header = () => {
  const [exploreOpen, setExploreOpen] = useState(false);
  const [cityModalOpen, setCityModalOpen] = useState(false);
  const { city, setCity } = useCity();

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleCreateEvent = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    navigate("/create-event");
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="h-[72px] flex items-center justify-between gap-8">
            {/* LEFT */}
            <div className="flex items-center gap-8">
              <a 
                href="/" 
                className="flex items-center transition-opacity hover:opacity-80"
              >
                <Logo />
              </a>

              {/* EXPLORE */}
              <div className="relative hidden lg:block">
                <button
                  type="button"
                  onClick={() => setExploreOpen((prev) => !prev)}
                  className="group flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 rounded-lg hover:bg-slate-50/80 transition-all duration-200"
                >
                  <span>Explore</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
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
                  <div className="absolute left-0 top-full mt-2 z-50">
                    <ExploreMenu />
                  </div>
                )}
              </div>
            </div>

            {/* CENTER SEARCH (DESKTOP ONLY) */}
            <div className="hidden lg:flex flex-1 justify-center max-w-2xl">
              <div className="w-full">
                <div className="rounded-full shadow-sm border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-200 bg-white">
                  <SearchBar />
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">
              {/* City Selector */}
              <button
                className="hidden md:flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-indigo-600 rounded-lg hover:bg-slate-50/80 transition-all duration-200 group"
                onClick={() => setCityModalOpen(true)}
              >
                <svg
                  className="w-4.5 h-4.5 text-indigo-500 group-hover:text-indigo-600 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4.5 8-12a8 8 0 10-16 0c0 7.5 8 12 8 12z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="font-medium">
                  {city ? city.city : "Select City"}
                </span>
              </button>

              {/* Create Event Button */}
              <button
                onClick={handleCreateEvent}
                className="hidden lg:flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full border-2 border-slate-200 text-slate-700 hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all duration-200"
              >
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span>Create Event</span>
              </button>

              {/* User Profile / Login */}
              {user ? (
                <div className="flex items-center">
                  <button
                    onClick={() => navigate("/profile")}
                    className="flex items-center gap-3 pl-2 pr-4 py-2 rounded-full border-2 border-slate-200 hover:border-indigo-500 hover:shadow-md transition-all duration-200 bg-white group"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-fix text-white flex items-center justify-center font-bold text-sm uppercase shadow-sm group-hover:shadow-md transition-shadow">
                      {user?.name?.charAt(0)}
                    </div>
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors">
                      {user?.name}
                    </span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="px-6 py-2.5 text-sm font-semibold rounded-full bg-gradient-main text-white shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
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