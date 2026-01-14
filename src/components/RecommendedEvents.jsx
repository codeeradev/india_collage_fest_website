const RecommendedEvents = () => {
  return (
    <section aria-label="Recommended Events">
      <div className="py-4">
        <div>
          <header className="pl-2 md:pl-0">
            <h2 id="recommended-events-heading" className="font-semibold text-lg md:text-3xl text-gray-800">
              Recommended Events 🗓️
            </h2>
            <p className="text-gray-600 text-sm md:text-base mt-1 md:mt-2">
              Explore our hand-picked recommended events near you!
            </p>
          </header>
          <div>
            <ul className="grid md:grid-cols-4 items-center gap-4 pt-5 md:pt-10" role="list" aria-labelledby="recommended-events-heading">
              {/* Skeleton event cards (similar to PopularEvents) */}
              <li role="listitem">
                <article className="hover:shadow-lg rounded-xl border border-slate-200 hover:border-neutral-200 hover:scale-105 transition duration-200 m-3 lg:m-0">
                  <header className="w-full">
                    <div className="group h-fit w-full">
                      <div className="w-full overflow-hidden rounded-t-lg">
                        <div className="w-full relative flex items-center justify-center bg-gray-200 h-28 md:h-32 animate-pulse">
                          <img alt="Loading..." draggable="false" loading="lazy" width="100" height="100" decoding="async" data-nimg="1" className="w-10 grayscale opacity-20" style={{ color: 'transparent' }} src="../_next/static/media/9-96x134.366f4218.webp" />
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

export default RecommendedEvents;