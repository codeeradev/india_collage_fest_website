const EventCardSkeleton = () => {
  return (
    <div className="h-full overflow-hidden rounded-[18px] border border-slate-200/80 bg-white shadow-[0_12px_24px_-22px_rgba(15,23,42,0.45)]">
      <div className="relative aspect-[16/9] bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 animate-shimmer">
        <div className="absolute top-2.5 left-2.5 h-6 w-20 rounded-full bg-white/80 animate-pulse" />
      </div>

      <div className="space-y-2 p-3">
        <div className="space-y-2">
          <div className="h-4 w-full rounded-lg bg-slate-200 animate-pulse" />
          <div className="h-4 w-3/4 rounded-lg bg-slate-200 animate-pulse" />
        </div>

        <div className="space-y-2">
          <div className="h-3.5 w-full rounded bg-slate-200 animate-pulse" />
          <div className="h-3.5 w-5/6 rounded bg-slate-200 animate-pulse" />
        </div>

        <div className="flex items-start gap-1.5">
          <div className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-full bg-slate-200 animate-pulse" />
          <div className="h-3.5 w-2/3 rounded bg-slate-200 animate-pulse" />
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-2">
          <div className="h-5 w-16 rounded-full bg-slate-200 animate-pulse" />
          <div className="h-3.5 w-16 rounded bg-slate-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default EventCardSkeleton;
