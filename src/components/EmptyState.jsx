/* eslint-disable react/prop-types */

const EmptyState = ({
  title = "Nothing here yet",
  description = "Content will appear here once available.",
  icon = null,
}) => {
  return (
    <div className="relative mt-16 flex flex-col items-center overflow-hidden text-center">
      <div className="absolute -top-32 h-[420px] w-[420px] rounded-full bg-gradient-to-r from-blue-200/40 via-cyan-200/35 to-amber-100/35 blur-3xl" />

      <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-700 to-cyan-500 shadow-xl shadow-blue-500/25 animate-float-y">
        {icon ? (
          <span className="text-3xl">{icon}</span>
        ) : (
          <svg className="h-9 w-9 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8m-8 4h5m-8 4h12a2 2 0 002-2V6a2 2 0 00-2-2H9l-4 4v10a2 2 0 002 2z" />
          </svg>
        )}
      </div>

      <h3 className="text-lg md:text-xl font-semibold text-slate-900">{title}</h3>

      <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">{description}</p>

      <div className="mt-6 h-[2px] w-28 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
    </div>
  );
};

export default EmptyState;
