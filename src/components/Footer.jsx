import footerImage1 from "../_next/static/media/website city landscape.80ea0585.svg";
import footerImage2 from "../_next/static/media/website city landscape mobile.227b4c49.svg";

const Footer = () => {
  return (
    <footer className="mt-24">

      {/* CITY ART */}
      <div className="relative bg-white">
        <div className="hidden md:block">
          <img
            src={footerImage1}
            alt="City"
            className="w-full opacity-80 select-none pointer-events-none"
          />
        </div>

        <div className="md:hidden">
          <img
            src={footerImage2}
            alt="City"
            className="w-full opacity-80 select-none pointer-events-none"
          />
        </div>

        {/* fade into footer */}
        <div className="absolute bottom-0 w-full h-24 bg-gradient-to-b from-transparent to-[#0a0f1c]" />
      </div>

      {/* ✅ REAL FOOTER BACKGROUND */}
      <div className="bg-[#0a0f1c] text-slate-300">

        {/* FOOTER BODY */}
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-5 gap-x-10 gap-y-10 text-sm">

          {/* BRAND */}
          <div className="space-y-4">
            <h2 className="text-white text-lg font-semibold">
              India College Fest
            </h2>

            <p className="leading-relaxed text-slate-400">
              Launch, manage and scale college and community events with
              powerful tools, automation and insights.
            </p>
          </div>

          <FooterColumn title="Company">
            <a>About Us</a>
            <a>Pricing</a>
            <a>Contact</a>
            <a>Blog</a>
            <a>Event Magazine</a>
          </FooterColumn>

          <FooterColumn title="Organizers">
            <a>Create Event</a>
            <a>Workshops</a>
            <a>Sports & Fitness</a>
            <a>Concerts</a>
            <a>Festivals</a>
            <a>Meetups</a>
          </FooterColumn>

          <FooterColumn title="Platform">
            <a>Free Events</a>
            <a>Ticket Booking</a>
            <a>Promotion</a>
            <a>Analytics</a>
            <a>Organizer Dashboard</a>
          </FooterColumn>

          <FooterColumn title="Cities">
            <a>Chennai</a>
            <a>Bengaluru</a>
            <a>Hyderabad</a>
            <a>Mumbai</a>
            <a>Delhi</a>
            <a>Goa</a>
          </FooterColumn>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-white/10 py-4 text-center text-xs text-slate-500">
          © 2026 India College Fest. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

const FooterColumn = ({ title, children }) => (
  <div className="space-y-2">
    <h4 className="text-white font-semibold mb-3 text-sm">
      {title}
    </h4>

    {children.map((item, i) => (
      <p
        key={i}
        className="cursor-pointer text-slate-400 hover:text-white transition-colors"
      >
        {item}
      </p>
    ))}
  </div>
);

export default Footer;
