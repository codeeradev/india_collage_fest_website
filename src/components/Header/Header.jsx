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
      <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="h-20 flex items-center justify-between">
            {/* LEFT */}
            <div className="flex items-center gap-6">
              <a href="/" className="flex items-center">
                <Logo />
              </a>

              {/* EXPLORE */}
              <div className="relative hidden lg:block">
                <button
                  type="button"
                  onClick={() => setExploreOpen((prev) => !prev)}
                  className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-indigo-600"
                >
                  Explore
                  <svg
                    className={`w-3.5 h-3.5 transition ${
                      exploreOpen ? "rotate-180" : ""
                    }`}
                  />
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
              <div className="w-full max-w-[520px]">
                <div className="rounded-full shadow-sm border border-slate-200 hover:shadow-md transition">
                  <SearchBar />
                </div>
              </div>
            </div>
            {/* RIGHT */}
            <div className="flex items-center gap-3">
              <button
                className="hidden md:flex items-center gap-1 text-sm text-slate-500 hover:text-indigo-600"
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
                {city ? city.city : "Select City"}
              </button>

              <button
                onClick={handleCreateEvent}
                className="hidden lg:flex px-4 py-2 text-sm font-medium rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition"
              >
                Create Event
              </button>

              {user ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate("/profile")}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border"
                  >
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold uppercase">
                      {user?.name?.charAt(0)}
                    </div>

                    <span className="text-sm font-medium">{user?.name}</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="px-5 py-2 text-sm font-semibold rounded-full bg-indigo-600 text-white"
                >
                  Login
                </button>
              )}
            </div>{" "}
          </div>
        </div>
      </header>
      <CitySelectorModal
        open={!city || cityModalOpen}
        onClose={() => {
          if (!city) return; // cannot close if no city selected
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
