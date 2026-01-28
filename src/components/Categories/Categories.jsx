import { useEffect, useState } from "react";
import { get } from "../../api/apiClient";
import { ENDPOINTS } from "../../api/endpoints";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    get(ENDPOINTS.GET_CATEGORIES)
      .then((res) => setCategories(res.data.category || []))
      .catch(console.error);
  }, []);

  return (
    <section className="relative mt-14">
      {/* background separation */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fff5f8] to-white" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* section card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-sm border border-gray-100 px-6 py-8">
          {/* header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              Browse by Category
              <span>🎉</span>
            </h2>

            <button className="text-sm font-medium text-primary hover:underline">
              View all
            </button>
          </div>

          {/* categories */}
          <div className="flex gap-8 overflow-x-auto pb-2 scrollbar-hide justify-start md:justify-between">
            {categories.map((cat) => (
              <div
                key={cat._id}
                onClick={() => navigate(`/events?category=${cat._id}`)}
                className="group min-w-[110px] text-center cursor-pointer transition-all"
              >
                {/* icon */}
                <div
                  className="
                    relative mx-auto w-20 h-20 rounded-full
                    bg-white border
                    shadow-sm
                    flex items-center justify-center
                    transition-all duration-300
                    group-hover:-translate-y-1
                    group-hover:shadow-lg
                  "
                >
                  {/* glow ring */}
                  <div
                    className="
                      absolute inset-0 rounded-full
                      bg-gradient-to-br from-pink-500 via-rose-400 to-orange-400
                      opacity-0 group-hover:opacity-20
                      blur-md transition
                    "
                  />

                  <img
                    src={`${IMAGE_BASE_URL}${cat.icon}`}
                    alt={cat.name}
                    className="relative z-10 w-9 h-9 object-contain"
                  />
                </div>

                <p className="mt-3 text-sm font-semibold text-gray-800">
                  {cat.name}
                </p>

                <p className="text-xs text-gray-400">
                  {cat.eventCount} events
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
