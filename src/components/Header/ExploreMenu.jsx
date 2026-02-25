import { Link } from "react-router-dom";

const menuItems = [
  {
    title: "Events",
    subtitle: "Curated listings",
    href: "/events",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" />
      </svg>
    ),
  },
  {
    title: "Brands",
    subtitle: "Partner showcases",
    href: "/brands",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 0 0-2 2v2m0 6v2a2 2 0 0 0 2 2h2m6 0h2a2 2 0 0 0 2-2v-2m0-6V7a2 2 0 0 0-2-2h-2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9h6v6H9z" />
      </svg>
    ),
  },
  {
    title: "Creators",
    subtitle: "Creator network",
    href: "/creators",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.55-2.28A1 1 0 0 1 21 8.62v6.76a1 1 0 0 1-1.45.9L15 14" />
        <rect x="3" y="6" width="12" height="12" rx="2" ry="2" />
      </svg>
    ),
  },
  {
    title: "Coupons",
    subtitle: "Member offers",
    href: "/coupons",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h0m6 10h0M5 7.2V5a2 2 0 0 1 2-2h2.2a2 2 0 0 1 1.4.6l10.8 10.8a2 2 0 0 1 0 2.8L18.8 20a2 2 0 0 1-2.8 0L5.6 9.6A2 2 0 0 1 5 8.2z" />
      </svg>
    ),
  },
  {
    title: "Blog",
    subtitle: "Insights",
    href: "/blog",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
];

const ExploreMenu = () => {
  return (
    <div className="w-80 rounded-2xl border border-slate-200/80 bg-white/95 p-2.5 shadow-[0_20px_48px_-26px_rgba(15,23,42,0.45)] backdrop-blur-xl">
      {menuItems.map((item) => (
        <Link
          key={item.title}
          to={item.href}
          className="group flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-blue-50/80"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-700 transition-all duration-200 group-hover:scale-105 group-hover:border-blue-200">
            {item.icon}
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-900">{item.title}</span>
            <span className="text-xs text-slate-500">{item.subtitle}</span>
          </div>

          <svg
            className="ml-auto h-4 w-4 text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
          </svg>
        </Link>
      ))}
    </div>
  );
};

export default ExploreMenu;
