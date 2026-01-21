const EventCardSkeleton = () => {
  return (
    <div className="w-full">
      <div className="flex justify-center items-center h-full">
        <div className="w-full h-full border border-slate-300 my-2 shadow-lg rounded-xl">

          <div className="w-full h-64 bg-gray-200 rounded-t-xl animate-pulse" />

          <div className="mt-4 px-3">
            <div className="h-5 bg-gray-200 rounded-full w-3/4 animate-pulse" />
          </div>

          <div className="mt-3 px-3">
            <div className="h-3 bg-gray-200 rounded-full w-1/3 animate-pulse" />
          </div>

          <div className="mt-3 px-3 pb-3 flex justify-between">
            <div className="h-3 bg-gray-200 rounded-full w-20 animate-pulse" />
            <div className="h-3 bg-gray-200 rounded-full w-8 animate-pulse" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default EventCardSkeleton;
