const EventCardSkeleton = () => {
  return (
    <div className="h-full overflow-hidden rounded-[16px] border border-gray-200 bg-white shadow-sm">
      {/* IMAGE SKELETON */}
      <div className="relative aspect-[16/9] bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 animate-shimmer bg-[length:200%_100%]">
        {/* Category badge skeleton */}
        <div className="absolute left-2.5 top-2.5">
          <div className="h-5 w-20 rounded-full bg-white/80 animate-pulse" />
        </div>
      </div>

      {/* CONTENT SKELETON */}
      <div className="space-y-2 p-3">
        {/* TITLE */}
        <div className="space-y-2">
          <div className="h-4 w-full rounded-lg bg-gray-200 animate-pulse" />
          <div className="h-4 w-3/4 rounded-lg bg-gray-200 animate-pulse" />
        </div>

        {/* DESCRIPTION */}
        <div>
          <div className="h-3.5 w-full rounded bg-gray-200 animate-pulse" />
        </div>

        {/* LOCATION */}
        <div className="flex items-start gap-1.5">
          <div className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 rounded-full bg-gray-200 animate-pulse" />
          <div className="h-3.5 w-2/3 rounded bg-gray-200 animate-pulse" />
        </div>
      </div>

      {/* Custom shimmer animation */}
      <style>{`
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
