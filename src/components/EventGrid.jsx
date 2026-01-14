const EventGrid = () => {
  return (
    <div className="grid md:grid-cols-4 grid-cols-1 lg:gap-7">
      {/* Skeleton event cards - replace with real data */}
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="w-full">
          <div className="flex justify-center items-center font-semibold h-full">
            <div className="h-full w-full flex flex-col border border-slate-300 my-2 shadow-lg md:hover:scale-95 duration-200 ease-in-out rounded-xl relative">
              <div className="group">
                <div className="w-full h-full">
                  <span className="flex justify-between w-full h-full">
                    <div className="w-full h-64 bg-gray-200 rounded-t-xl flex items-center justify-center animate-pulse">
                      <img
                        alt="Loading..."
                        draggable="false"
                        loading="lazy"
                        width="96"
                        height="134"
                        decoding="async"
                        data-nimg="1"
                        className="w-12 grayscale opacity-20"
                        style={{ color: 'transparent' }}
                        src="/_next/static/media/9-96x134.366f4218.webp"
                      />
                    </div>
                  </span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 px-3">
                <div className="h-5 bg-gray-200 rounded-full w-3/4 animate-pulse"></div>
                <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
              <div className="mt-3 text-sm flex gap-1 items-center px-3">
                <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded-full w-1/3 animate-pulse"></div>
              </div>
              <div className="mt-3 flex gap-y-2 justify-between items-center flex-wrap px-3 pb-2 md:pb-0">
                <div className="flex pb-[2px] items-center">
                  <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="ml-1 h-3 bg-gray-200 rounded-full w-20 animate-pulse"></div>
                </div>
                <div className="flex flex-col">
                  <div className="h-3 bg-gray-200 rounded-full w-8 animate-pulse"></div>
                  <div className="w-5 border-b border-gray-300 mt-1 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventGrid;