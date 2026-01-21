import { useParams } from "react-router-dom";

const CityHero = () => {
  const { citySlug } = useParams();

  const cityName =
    citySlug?.replace(/-/g, " ") || "chennai";

  return (
    <div className="mt-20">
      <div className="container mx-auto py-5">
        <div className="flex flex-col lg:flex-row px-8 md:px-20 py-5">

          <div className="lg:w-1/2 space-y-6">

            <h4 className="font-medium text-4xl lg:text-6xl capitalize">
              {cityName}
            </h4>

            <span className="text-md lg:text-xl text-gray-600 capitalize">
              Discover top events happening in {cityName}
            </span>

          </div>

          <div className="flex-grow">
            <img
              src={`/cities/${citySlug}.webp`}
              onError={(e) => (e.target.src = "/city-default.webp")}
              className="w-full rounded-xl"
              alt={cityName}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default CityHero;
