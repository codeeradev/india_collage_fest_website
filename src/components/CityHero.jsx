import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CityHero = ({ cityName: cityNameProp, imageUrl }) => {
  const { citySlug } = useParams();
  const [imageFailed, setImageFailed] = useState(false);

  const cityName =
    cityNameProp || citySlug?.replace(/-/g, " ") || "chennai";

  const showImage = Boolean(imageUrl) && !imageFailed;

  useEffect(() => {
    setImageFailed(false);
  }, [imageUrl]);

  return (
    <div className="mt-24">
      <div className="container mx-auto py-6">
        <div className="flex flex-col lg:flex-row px-8 md:px-20 py-6 gap-8 items-center">

          <div className="lg:w-1/2 space-y-6">
            <h4 className="font-semibold text-4xl lg:text-6xl capitalize text-slate-900">
              {cityName}
            </h4>

            <span className="text-base lg:text-xl text-slate-600 capitalize">
              Discover top events happening in {cityName}
            </span>

          </div>

          <div className="flex-grow">
            {showImage ? (
              <img
                src={imageUrl}
                onError={() => setImageFailed(true)}
                className="w-full rounded-2xl object-cover shadow-lg"
                alt={cityName}
              />
            ) : (
              <div className="w-full rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-10 shadow-sm">
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl font-semibold shadow-lg">
                    {cityName?.charAt(0)?.toUpperCase() || "C"}
                  </div>
                  <p className="text-sm text-slate-500">
                    City highlights and experiences curated for {cityName}
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default CityHero;
