import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoCarousel from "./VideoCarousel";
import { get } from "../../api/apiClient";
import { ENDPOINTS } from "../../api/endpoints";

const Hero = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  // 🔥 fetch categories
  useEffect(() => {
    get(ENDPOINTS.GET_CATEGORIES)
      .then((res) => {
        const list = res.data.category || [];
        setCategories(list.slice(0, 5)); // ✅ only 5
      })
      .catch(console.error);
  }, []);

  return (
    <section className="relative h-[60vh] md:h-[90vh] overflow-hidden group select-none">
      <VideoCarousel />

      {/* overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/50 to-black/50" />

      <div className="absolute inset-0 flex items-center px-8 lg:px-14">
        <div className="max-w-4xl text-white">

          <h1 className="text-4xl lg:text-5xl font-extrabold mb-3">
            Discover Your Next
          </h1>

          <h1 className="text-4xl lg:text-5xl font-extrabold pb-6 bg-gradient-to-r from-[#FF9650] to-[#FB426E] bg-clip-text text-transparent">
            Unforgettable Experience
          </h1>

          <p className="text-lg lg:text-xl mb-8 text-gray-200">
            Explore concerts, shows, nightlife, and exclusive experiences happening around you.
          </p>

          {/* 🔍 SEARCH — navigation only */}
          <div
            onClick={() => navigate("/events")}
            className="flex flex-col sm:flex-row gap-4 max-w-2xl cursor-text"
          >
            <input
              readOnly
              type="text"
              placeholder="Search events, concerts, shows…"
              className="flex-1 bg-white rounded-xl px-5 py-4 text-gray-800 cursor-text"
            />

            <button
              type="button"
              className="bg-gradient-to-br from-[#FF9650] to-[#FB426E] text-white px-8 py-4 rounded-xl font-semibold"
            >
              Search
            </button>
          </div>

          {/* 🔥 CATEGORY CHIPS FROM API */}
          <div className="flex flex-wrap gap-4 mt-8">
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() =>
                  navigate(`/events?category=${cat._id}`)
                }
                className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition"
              >
                {cat.name}
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
