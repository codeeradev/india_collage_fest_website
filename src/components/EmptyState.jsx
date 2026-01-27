/* eslint-disable react/prop-types */

const EmptyState = ({
  title = "Nothing here yet",
  description = "Content will appear here once available.",
  icon = "🎫",
}) => {
  return (
    <div className="relative mt-24 flex flex-col items-center text-center overflow-hidden">

      {/* animated glow background */}
      <div
        className="absolute -top-40 w-[520px] h-[520px]
        bg-gradient-to-r from-indigo-300/30 via-purple-300/30 to-pink-300/30
        rounded-full blur-3xl animate-pulse"
      />

      {/* floating icon */}
      <div className="relative mb-6 animate-float-y">
        <div
          className="w-24 h-24 rounded-2xl
          bg-gradient-to-br from-indigo-500 to-purple-600
          flex items-center justify-center
          shadow-xl"
        >
          <span className="text-4xl">{icon}</span>
        </div>
      </div>

      {/* text */}
      <h3 className="text-lg md:text-xl font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mt-2 text-gray-500 text-sm max-w-md leading-relaxed">
        {description}
      </p>

      {/* divider */}
      <div
        className="mt-6 w-24 h-[2px]
        bg-gradient-to-r from-transparent via-gray-300 to-transparent"
      />
    </div>
  );
};

export default EmptyState;
