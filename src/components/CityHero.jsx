import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

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
    <section className="mt-24 border-y border-slate-200/70 bg-white/65 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <div className="grid items-center gap-6 lg:grid-cols-[1.12fr_0.88fr]">
          <div className="space-y-4 text-left">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
              City spotlight
            </p>
            <h1 className="text-4xl font-semibold capitalize leading-tight text-slate-900 md:text-5xl lg:text-6xl">
              {cityName}
            </h1>

            <p className="max-w-2xl text-base text-slate-600 md:text-lg">
              Discover top events happening in {cityName}
            </p>
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
              Curated local picks
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_40px_-30px_rgba(15,23,42,0.45)]">
            {showImage ? (
              <img
                src={imageUrl}
                onError={() => setImageFailed(true)}
                className="h-56 w-full object-cover sm:h-64 lg:h-72"
                alt={cityName}
              />
            ) : (
              <div className="h-56 w-full bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-10 sm:h-64 lg:h-72">
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-2xl font-semibold text-white shadow-lg">
                    {cityName?.charAt(0)?.toUpperCase() || "C"}
                  </div>
                  <p className="max-w-[280px] text-sm text-slate-500">
                    City highlights and experiences curated for {cityName}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

CityHero.propTypes = {
  cityName: PropTypes.string,
  imageUrl: PropTypes.string,
};

export default CityHero;
