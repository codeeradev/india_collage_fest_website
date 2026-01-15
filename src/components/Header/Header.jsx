import { useState } from "react";
import ExploreMenu from "./ExploreMenu";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import CitySelectorModal from "./CitySelectorModal";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [exploreOpen, setExploreOpen] = useState(false);
  const [cityModalOpen, setCityModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  const navigate = useNavigate();

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="h-20 flex items-center justify-between">

            {/* LEFT */}
            <div className="flex items-center gap-6">
              <a href="/" className="flex items-center">
                <Logo />
              </a>

              {/* EXPLORE */}
              <div
                className="relative hidden lg:block"
                onMouseEnter={() => setExploreOpen(true)}
                onMouseLeave={() => setExploreOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setExploreOpen(prev => !prev)}
                  className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-indigo-600 transition"
                >
                  Explore
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5.23 7.21L10 11.9l4.77-4.69 1.06 1.06L10 14.02 4.17 8.27z" />
                  </svg>
                </button>

                {exploreOpen && (
                  <div className="absolute left-0 top-full mt-3 z-50">
                    <ExploreMenu />
                  </div>
                )}
              </div>
            </div>

            {/* CENTER SEARCH (DESKTOP ONLY) */}
            <div className="hidden lg:flex flex-1 justify-center">
              <div className="w-full max-w-[460px]">
                <SearchBar />
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">
              <button className="hidden md:flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900"
                onClick={() => setCityModalOpen(true)}
              >
                <svg
                  className="w-4 h-4 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 22s8-4.5 8-12a8 8 0 10-16 0c0 7.5 8 12 8 12z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {selectedCity ? selectedCity.name : "Select City"}
              </button>

              <button
                onClick={() => navigate("/create-event")}
                className="hidden lg:flex px-4 py-2 text-sm font-semibold border border-slate-300 rounded-full hover:bg-slate-100"
              >
                Create Event
              </button>

              <button className="self-center text-opacity-90 group px-4 py-2 border border-neutral-300 hover:border-neutral-400 rounded-full inline-flex items-center text-sm text-gray-700 font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 item-center gap-1 shadow-lg"
                onClick={() => navigate("/login")}>
                Login
              </button>

              <button className="lg:hidden w-10 h-10 flex items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      <CitySelectorModal
        open={cityModalOpen}
        onClose={() => setCityModalOpen(false)}
        onSelect={(city) => {
          setSelectedCity(city);
          setCityModalOpen(false);
        }} />
    </>
  );
};

export default Header;
