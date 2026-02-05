const EventCardSkeleton = () => {
  return (
    <div className="h-full rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm">
      {/* IMAGE SKELETON */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 animate-shimmer bg-[length:200%_100%]">
        {/* Category badge skeleton */}
        <div className="absolute top-3 left-3">
          <div className="h-7 w-24 bg-white/80 rounded-full animate-pulse" />
        </div>
      </div>

      {/* CONTENT SKELETON */}
      <div className="p-4 space-y-3">
        {/* TITLE */}
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 rounded-lg w-full animate-pulse" />
          <div className="h-5 bg-gray-200 rounded-lg w-3/4 animate-pulse" />
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
        </div>

        {/* LOCATION */}
        <div className="flex items-start gap-2">
          <div className="w-4 h-4 mt-0.5 bg-gray-200 rounded-full animate-pulse flex-shrink-0" />
          <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
        </div>

        {/* DATE + TIME */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
          </div>
          
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Custom shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default EventCardSkeleton;