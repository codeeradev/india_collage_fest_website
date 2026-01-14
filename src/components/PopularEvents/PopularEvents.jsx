const PopularEvents = () => {
  return (
    <section aria-label="Popular Events">
      <div className="py-3 md:py-6">
        <div>
          <div className="flex flex-col lg:flex-row justify-start items-center lg:items-end">
            <header className="pl-2 md:pl-0 flex flex-col w-full justify-start items-start">
              <h2 id="popular-events-heading" className="font-semibold text-lg md:text-3xl text-gray-800">
                Explore Popular Events 🎉
              </h2>
              <p className="text-gray-600 text-sm md:text-base mt-1 md:mt-2">
                Dive into the most popular events and experiences nearby!
              </p>
            </header>
            <div className="flex lg:flex-nowrap flex-wrap justify-center items-center gap-3 mt-8 md:mt-5">
              <button className="px-4 py-2 rounded-full text-[13px] md:text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap border border-[#FD5B66] bg-red-50 text-[#FD5B66]">
                All Events
              </button>
              <button className="px-4 py-2 rounded-full text-[13px] md:text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap bg-gray-100 text-gray-800 hover:bg-gray-200">
                This Month
              </button>
              <button className="px-4 py-2 rounded-full text-[13px] md:text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap bg-gray-100 text-gray-700 hover:bg-gray-200">
                This Week
              </button>
            </div>
          </div>
          {/* Carousel and grid for events (simplified skeleton) */}
          <div className="relative my-8 md:my-10">
            <div className="embla overflow-hidden">
              <div className="embla__viewport">
                <div className="embla__container flex gap-4">
                  {/* Skeleton categories */}
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="embla__slide flex-shrink-0 size-16 animate-pulse rounded-full bg-gray-100"></div>
                    <span className="text-xs md:text-sm w-full h-5 bg-gray-100 rounded-full inline-block font-medium text-center whitespace-nowrap"></span>
                  </div>
                  {/* Repeat for more categories */}
                </div>
              </div>
            </div>
          </div>
          <div role="region" aria-label="popular events" aria-live="polite">
            <ul className="grid md:grid-cols-4 items-center gap-4 mt-5" role="list" aria-labelledby="popular-events-heading">
              {/* Skeleton event cards */}
              <li role="listitem">
                <article className="hover:shadow-lg rounded-xl border border-slate-200 hover:border-neutral-200 hover:scale-105 transition duration-200 m-3 lg:m-0">
                  <header className="w-full">
                    <div className="group h-fit w-full">
                      <div className="w-full overflow-hidden rounded-t-lg">
                        <div className="w-full relative flex items-center justify-center bg-gray-200 h-28 md:h-32 animate-pulse">
                          <img alt="Loading..." draggable="false" loading="lazy" width="100" height="100" decoding="async" data-nimg="1" className="w-10 grayscale opacity-20" style={{ color: 'transparent' }} src="/_next/static/media/9-96x134.366f4218.webp" />
                        </div>
                      </div>
                    </div>
                  </header>
                  <section className="w-full h-full mt-2 px-3 pt-1 pb-3">
                    <div className="cursor-pointer mt-2 space-y-2">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="h-5 bg-gray-200 rounded-full w-3/4 animate-pulse"></div>
                          <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
                        </div>
                        <div className="flex items-center text-sm pt-1">
                          <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
                          <div className="ml-2 h-3 bg-gray-200 rounded-full w-1/4 animate-pulse"></div>
                        </div>
                      </div>
                      <div className="w-14 border-b border-neutral-100 animate-pulse"></div>
                      <footer className="flex justify-between items-center">
                        <div className="flex items-center pb-[2px]">
                          <div className="w-[18px] h-[18px] bg-gray-200 rounded-full animate-pulse"></div>
                          <div className="ml-1 h-3 bg-gray-200 rounded-full w-16 animate-pulse"></div>
                        </div>
                        <div>
                          <div className="h-3 bg-gray-200 rounded-full w-8 animate-pulse"></div>
                          <div className="border-b w-5 border-gray-200 mt-1 animate-pulse"></div>
                        </div>
                      </footer>
                    </div>
                  </section>
                </article>
              </li>
              {/* Repeat for more cards */}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularEvents;