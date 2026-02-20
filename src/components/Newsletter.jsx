import newsletterIllustration from "../_next/static/media/Curated-events.932e5871.webp";
import { withImageFallback } from "../utils/mediaUrl";

const Newsletter = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section aria-label="Newletter Section" className="pt-12">
      <div className="relative flex flex-col-reverse lg:flex-row md:flex-col md:justify-center lg:justify-center md:items-center lg:items-center gap-8">
        <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mr-10 lg:w-2/5">
          <h2 className="font-semibold text-3xl md:text-4xl text-slate-900">
            Join Our Newsletter
          </h2>
          <span className="block mt-4 text-slate-600">
            No noise, just curated updates on upcoming events, campus highlights, and exclusive perks.
          </span>
          <ul className="space-y-4 mt-8">
            <li className="flex items-center space-x-4">
              <span className="rounded-full text-blue-700 bg-blue-100 text-xs py-1 px-3">01</span>
              <span className="font-medium text-slate-700">
                Access to upcoming events, webinars, and campus experiences.
              </span>
            </li>
            <li className="flex items-center space-x-4">
              <span className="rounded-full text-blue-700 bg-blue-100 text-xs py-1 px-3">02</span>
              <span className="font-medium text-slate-700">
                Exclusive offers and coupons for subscribers only.
              </span>
            </li>
          </ul>
          <div>
            <form
              className="mt-10 relative max-w-sm"
              aria-label="Subscribe to newsletter"
              onSubmit={handleSubmit}
            >
              <label htmlFor="email-input" className="sr-only">Enter your email to subscribe</label>
              <div>
                <div className="relative z-0">
                  <label className="text-sm text-slate-600 leading-6 capitalize cursor-pointer block w-full font-medium"></label>
                  <input
                    className="w-full mt-1 border border-slate-200 focus:outline-none focus:ring-[1.3px] focus:ring-blue-300 focus:border-transparent transition duration-300 ease-in-out focus:ring-opacity-90 placeholder:text-slate-400 placeholder:font-normal rounded-full h-12 w-full py-3 border-2 border-slate-200 px-4 bg-white"
                    type="email"
                    placeholder="Enter your email"
                    maxLength="255"
                    id="email-input"
                    name="email"
                  />
                </div>
              </div>
              <button
                aria-label="Submit email"
                title="Submit email"
                type="submit"
                className="absolute mt-0.5 transform top-1/2 -translate-y-1/2 right-2 hover:scale-95 duration-200 text-white rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-700 transition-all flex justify-center items-center p-2 shadow-lg shadow-blue-500/30"
              >
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"></path>
                </svg>
              </button>
            </form>
          </div>
        </div>
        <div className="mb-5 md:mb-0">
          <img
            alt="Newsletter illustration"
            draggable="false"
            fetchPriority="high"
            loading="eager"
            width="520"
            height="420"
            decoding="async"
            className="noContextmenu drop-shadow-xl rounded-3xl border border-white/50"
            style={{ color: "transparent" }}
            src={newsletterIllustration}
            onError={(eventTarget) => withImageFallback(eventTarget, "/images/event-placeholder.svg")}
          />
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
