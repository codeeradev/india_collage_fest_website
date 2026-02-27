import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { get } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";

const buildCitySlug = (city) => {
  const raw = city?.slug || city?.citySlug || city?.slugName || city?.city || "";

  return raw
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
};

const quickLinks = [
  { label: "All Events", to: "/events" },
  { label: "This Weekend", to: "/events?date=weekend" },
  { label: "Free Events", to: "/events?free=true" },
  { label: "Create Event", to: "/create-event" },
  { label: "Blog", to: "/blog" },
];

const companyLinks = [
  { label: "About Us", to: "/info/about" },
  { label: "Contact", to: "/info/contact" },
  { label: "Privacy", to: "/info/privacy" },
  { label: "Terms", to: "/info/terms" },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/the_ticket_9/" },
  { label: "Facebook", href: "https://www.facebook.com/theticket9" },
  { label: "LinkedIn", href: "https://in.linkedin.com/company/theticket9" },
  { label: "Twitter", href: "https://twitter.com/theticket9" },
];

const Footer = () => {
  const [cities, setCities] = useState([]);
  const [citiesLoading, setCitiesLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchCities = async () => {
      try {
        setCitiesLoading(true);
        const res = await get(ENDPOINTS.GET_CITIES);
        const list = res?.data?.data || res?.data?.cities || [];

        if (active) {
          setCities(list);
        }
      } catch (error) {
        console.error("Failed to load footer cities", error);
        if (active) {
          setCities([]);
        }
      } finally {
        if (active) {
          setCitiesLoading(false);
        }
      }
    };

    fetchCities();
    return () => {
      active = false;
    };
  }, []);

  const displayCities = useMemo(() => cities.slice(0, 30), [cities]);

  return (
    <footer
      className="relative z-20 overflow-hidden"
      style={{
        isolation: "isolate",
        opacity: 1,
        background:
          "radial-gradient(circle at 10% 12%, rgba(37,99,235,0.14) 0%, transparent 36%), radial-gradient(circle at 90% 10%, rgba(30,64,175,0.12) 0%, transparent 34%), linear-gradient(180deg, #0f172a 0%, #11203f 55%, #1e3a8a 100%)",
        borderTop: "1px solid rgba(148, 163, 184, 0.26)",
        color: "#e2e8f0",
      }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/35 to-transparent" />
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-20 left-[-8rem] h-80 w-80 rounded-full blur-3xl"
          style={{ background: "rgba(37, 99, 235, 0.16)" }}
        />
        <div
          className="absolute -bottom-24 right-[-7rem] h-80 w-80 rounded-full blur-3xl"
          style={{ background: "rgba(30, 64, 175, 0.18)" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-8 pt-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr_1fr]">
          <div className="space-y-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: "#67e8f9" }}>
                India College Fest
              </p>
              <h2 className="mt-3 text-2xl font-semibold" style={{ color: "#f8fafc" }}>
                Built for high-quality event discovery.
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed" style={{ color: "#dbeafe" }}>
                Discover concerts, campus fests, workshops, and community experiences with a clean booking flow and strong organizer tools.
              </p>
            </div>

            <div
              className="rounded-2xl px-5 py-4"
              style={{
                border: "1px solid rgba(148, 163, 184, 0.4)",
                background: "rgba(15, 23, 42, 0.84)",
              }}
            >
              <p className="text-sm font-semibold" style={{ color: "#f8fafc" }}>Need help or partnership details?</p>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
                <a
                  href="mailto:indiacollegefest@gmail.com"
                  className="transition-colors hover:opacity-90"
                  style={{ color: "#93c5fd" }}
                >
                  indiacollegefest@gmail.com
                </a>
                <a href="tel:+918930486972" className="transition-colors hover:opacity-90" style={{ color: "#cbd5e1" }}>
                  +91 8930486972
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em]" style={{ color: "#f1f5f9" }}>Explore</h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-sm transition-colors hover:opacity-100" style={{ color: "#cbd5e1" }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em]" style={{ color: "#f1f5f9" }}>Company</h3>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-sm transition-colors hover:opacity-100" style={{ color: "#cbd5e1" }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: "#93c5fd" }}>Social</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full px-3 py-1.5 text-xs font-medium transition-all hover:-translate-y-0.5"
                    style={{
                      border: "1px solid rgba(148, 163, 184, 0.42)",
                      background: "rgba(15, 23, 42, 0.86)",
                      color: "#dbeafe",
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8" style={{ borderTop: "1px solid rgba(148, 163, 184, 0.28)" }}>
          <p className="mb-4 text-sm font-semibold" style={{ color: "#f8fafc" }}>Popular Cities</p>
          <div className="flex flex-wrap gap-2.5">
            {citiesLoading &&
              Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={`city-chip-${index}`}
                  className="h-9 w-24 rounded-full animate-pulse"
                  style={{
                    border: "1px solid rgba(148, 163, 184, 0.35)",
                    background: "rgba(15, 23, 42, 0.72)",
                  }}
                />
              ))}

            {!citiesLoading &&
              displayCities.map((city) => {
                const slug = buildCitySlug(city);
                if (!slug) return null;

                const cityLabel = city.city || city.name || city.slug || city.citySlug || slug;

                return (
                  <Link
                    key={city._id || cityLabel}
                    to={`/city/${encodeURIComponent(slug)}`}
                  className="rounded-full px-4 py-2 text-xs font-medium transition-all hover:-translate-y-0.5"
                  style={{
                      border: "1px solid rgba(148, 163, 184, 0.42)",
                      background: "rgba(15, 23, 42, 0.86)",
                      color: "#dbeafe",
                    }}
                  >
                    {cityLabel}
                  </Link>
                );
              })}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 pt-6 text-sm md:flex-row md:items-center md:justify-between" style={{ borderTop: "1px solid rgba(148, 163, 184, 0.28)", color: "#94a3b8" }}>
          <p>Copyright 2026 India College Fest. All rights reserved.</p>

          <div className="flex items-center gap-5">
            <Link to="/info/privacy" className="transition-colors hover:opacity-100" style={{ color: "#cbd5e1" }}>
              Privacy
            </Link>
            <Link to="/info/terms" className="transition-colors hover:opacity-100" style={{ color: "#cbd5e1" }}>
              Terms
            </Link>
            <Link to="/info/contact" className="transition-colors hover:opacity-100" style={{ color: "#cbd5e1" }}>
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
