const ExploreMenu = () => {
  const items = [
    {
      title: "Events",
      subtitle: "Now Live",
      icon: "📅",
      href: "/events",
    },
    {
      title: "Brands",
      subtitle: "Now Live",
      icon: "🏷️",
      href: "/brands",
    },
    {
      title: "Creators",
      subtitle: "Join the waitlist",
      icon: "🎥",
      href: "/creators",
    },
    {
      title: "Coupons",
      subtitle: "Lite",
      icon: "🎟️",
      href: "/coupons",
    },
  ];

  return (
    <div
      className="
        absolute top-full left-0 mt-3
        w-72 rounded-2xl
        bg-white shadow-xl border border-borderLight
        p-2
      "
    >
      {items.map((item) => (
        <a
          key={item.title}
          href={item.href}
          className="
            flex items-center gap-4
            px-4 py-3 rounded-xl
            hover:bg-bgSoft transition
          "
        >
          {/* Icon */}
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-bgSoft text-lg">
            {item.icon}
          </div>

          {/* Text */}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-textPrimary">
              {item.title}
            </span>
            <span className="text-xs text-textSecondary">
              {item.subtitle}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
};

export default ExploreMenu;
