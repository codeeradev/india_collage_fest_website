import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  const city =
    event?.city?.toLowerCase().replace(/\s+/g, "-") || "chennai";

  return (
    <div className="w-full">
      <div className="flex justify-center items-center font-semibold h-full">
        <Link
          to={`/city/${city}`}
          className="block w-full h-full focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-xl"
        >
          <div className="h-full w-full flex flex-col border border-slate-300 my-2 shadow-lg
                          transition-transform duration-200 ease-in-out
                          md:hover:scale-95 rounded-xl relative">

            {/* Image Skeleton */}
            <div className="w-full h-64 bg-gray-200 rounded-t-xl animate-pulse" />

            {/* Title Skeleton */}
            <div className="mt-4 px-3">
              <div className="h-5 bg-gray-200 rounded-full w-3/4 animate-pulse" />
            </div>

            {/* Location Skeleton */}
            <div className="mt-3 px-3">
              <div className="h-3 bg-gray-200 rounded-full w-1/3 animate-pulse" />
            </div>

            {/* Footer Skeleton */}
            <div className="mt-3 px-3 pb-3 flex justify-between">
              <div className="h-3 bg-gray-200 rounded-full w-20 animate-pulse" />
              <div className="h-3 bg-gray-200 rounded-full w-8 animate-pulse" />
            </div>

          </div>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
