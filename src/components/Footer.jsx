import footerImage1 from "../_next/static/media/website city landscape.80ea0585.svg";
import footerImage2 from "../_next/static/media/website city landscape mobile.227b4c49.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-32">
      {/* CITY ART */}
      <div className="relative bg-white">
        <div className="hidden md:block">
          <img
            src={footerImage1}
            alt="City"
            className="w-full opacity-40 select-none pointer-events-none"
          />
        </div>

        <div className="md:hidden">
          <img
            src={footerImage2}
            alt="City"
            className="w-full opacity-40 select-none pointer-events-none"
          />
        </div>

        {/* Gradient fade into footer */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-b from-transparent via-gray-50/50 to-gray-50" />
      </div>

      {/* MAIN FOOTER */}
      <div className="bg-gray-50 text-gray-700 relative overflow-hidden">
        {/* Background decoration - subtle */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          {/* Newsletter Section */}
          <div className="py-16 border-b border-gray-200">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200 mb-2">
                <svg
                  className="w-5 h-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="text-sm font-semibold text-purple-700">
                  Stay Updated
                </span>
              </div>

              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Never Miss an Event
              </h3>

              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Subscribe to get updates on upcoming events, exclusive offers,
                and event highlights in your city
              </p>

              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 bg-white border-2 border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
                />
                <button
                  className="px-8 py-4 font-semibold rounded-xl text-white transition-all hover:scale-[1.02] active:scale-95 hover:shadow-lg"
                  style={{
                    background:
                      "linear-gradient(90deg,#f97316,#ec4899,#8b5cf6)",
                  }}
                >
                  Subscribe
                </button>
              </div>

              <p className="text-sm text-gray-500 pt-2">
                Join 50,000+ event enthusiasts. Unsubscribe anytime.
              </p>
            </div>
          </div>

          {/* Links Section */}
          <div className="py-16 grid grid-cols-2 md:grid-cols-6 gap-x-8 gap-y-12">
            {/* BRAND */}
            <div className="col-span-2 space-y-6">
              <div>
                <h2
                  className="text-2xl font-bold mb-3 inline-block"
                  style={{
                    background:
                      "linear-gradient(90deg,#f97316,#ec4899,#8b5cf6)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  India College Fest
                </h2>

                <p className="text-base text-gray-600 leading-relaxed">
                  India's premier platform for discovering and creating
                  unforgettable college and community experiences.
                </p>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-3">
                  Follow Us
                </p>
                <div className="flex gap-3">
                  <SocialIcon aria-label="Facebook">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </SocialIcon>
                  <SocialIcon aria-label="Twitter">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </SocialIcon>
                  <SocialIcon aria-label="Instagram">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                    </svg>
                  </SocialIcon>
                  <SocialIcon aria-label="LinkedIn">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </SocialIcon>
                </div>
              </div>
            </div>

            {/* DISCOVER */}
            <FooterColumn title="Browse Events">
              <FooterLink href="#">This Weekend</FooterLink>
              <FooterLink href="#">Free Events</FooterLink>
              <FooterLink href="#">Online Events</FooterLink>
              <FooterLink href="#">Popular Categories</FooterLink>
            </FooterColumn>

            {/* CREATE EVENT */}
            <FooterColumn title="Create Event">
              <FooterLink href="#">Organizer Dashboard</FooterLink>
              <FooterLink href="#">Pricing</FooterLink>
              <FooterLink href="#">Resources</FooterLink>
              <FooterLink href="#">Event Templates</FooterLink>
            </FooterColumn>

            {/* ABOUT US */}
            <FooterColumn title="About Us">
              <FooterLink href="#">Careers</FooterLink>
              <FooterLink href="#">Blog</FooterLink>
              <FooterLink to="/info/about">About Us</FooterLink>
              <FooterLink to="/info/contact">Contact</FooterLink>
            </FooterColumn>

            {/* HELP CENTER */}
            <FooterColumn title="Help Center">
              <FooterLink to="/info/terms">Terms & Conditions</FooterLink>
              <FooterLink to="/info/privacy">Privacy Policy</FooterLink>

              <FooterLink href="#">Cookie Policy</FooterLink>
              <FooterLink href="#">Trust & Safety</FooterLink>
            </FooterColumn>
          </div>

          {/* Popular Cities */}
          <div className="pb-12 border-b border-gray-200">
            <div className="flex flex-wrap gap-3">
              {[
                "Mumbai",
                "Delhi",
                "Bengaluru",
                "Hyderabad",
                "Chennai",
                "Kolkata",
                "Pune",
                "Ahmedabad",
                "Jaipur",
                "Chandigarh",
                "Lucknow",
                "Goa",
                "Kochi",
                "Indore",
                "Bhopal",
              ].map((city) => (
                <button
                  key={city}
                  className="px-4 py-2 bg-white hover:bg-gray-100 border border-gray-300 hover:border-purple-400 rounded-full text-sm text-gray-700 hover:text-purple-700 font-medium transition-all hover:shadow-sm"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <div className="text-gray-600 text-center md:text-left">
              © 2026 India College Fest. All rights reserved.
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600">
              <a
                href="#"
                className="hover:text-purple-600 transition-colors flex items-center gap-2 font-medium"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>Support</span>
              </a>
              <a
                href="#"
                className="hover:text-purple-600 transition-colors flex items-center gap-2 font-medium"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
                <span>Feedback</span>
              </a>
              <a
                href="#"
                className="hover:text-purple-600 transition-colors flex items-center gap-2 font-medium"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
                <span>English</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ================= HELPER COMPONENTS ================= */

const FooterColumn = ({ title, children }) => (
  <div className="space-y-4">
    <h4 className="text-gray-900 font-bold text-sm mb-4">{title}</h4>
    <div className="space-y-3">{children}</div>
  </div>
);

const FooterLink = ({ to, children }) => (
  <Link
    to={to}
    className="block text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm group font-medium"
  >
    <span className="flex items-center gap-2">
      {children}
      <svg
        className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </span>
  </Link>
);

const SocialIcon = ({ children, "aria-label": ariaLabel }) => (
  <a
    href="#"
    aria-label={ariaLabel}
    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gradient-to-r hover:from-orange-500 hover:via-pink-500 hover:to-purple-600 border border-gray-300 hover:border-transparent flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 hover:scale-110"
  >
    {children}
  </a>
);

export default Footer;
