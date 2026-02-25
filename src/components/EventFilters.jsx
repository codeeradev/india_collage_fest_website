import PropTypes from "prop-types";
import { Button } from "./ui/button";

const FILTERS = [
  {
    value: "all",
    label: "All Events",
    description: "Everything happening",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    value: "week",
    label: "This Week",
    description: "Next 7 days",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    value: "month",
    label: "This Month",
    description: "Upcoming highlights",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const EventFilters = ({ filter, setFilter }) => {
  return (
    <div className="w-full">
      <div className="rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.35)] md:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-1 text-left">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              Filter Events
            </p>
            <p className="text-sm text-slate-500">
              Choose a time window that matches your plan
            </p>
          </div>

          <div className="flex flex-wrap gap-2 md:justify-end">
            {FILTERS.map((item) => {
              const isActive = filter === item.value;
              return (
                <Button
                  key={item.value}
                  type="button"
                  onClick={() => setFilter(item.value)}
                  className={`group relative inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "border-transparent bg-blue-600 text-white shadow-md shadow-blue-200"
                      : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  <span className={`transition-transform duration-300 ${isActive ? "" : "group-hover:scale-110"}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>

                  {isActive && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
                    </span>
                  )}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

EventFilters.propTypes = {
  filter: PropTypes.oneOf(["all", "week", "month"]).isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default EventFilters;


