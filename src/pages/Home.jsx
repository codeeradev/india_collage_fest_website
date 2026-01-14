import Hero from "../components/Hero/Hero";
import FeaturedEvents from "../components/FeaturedEvents/FeaturedEvents";
import PopularEvents from "../components/PopularEvents/PopularEvents";
import RecommendedEvents from "../components/RecommendedEvents";
import WhyBookWithUs from "../components/WhyBookWithUs";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer"; // Assuming Footer.jsx is in components/Footer/
import Header from "../components/Header/Header"; // Assuming Header.jsx is in components/Header/

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <script defer type="application/ld+json">
        {`[{"@context":"https://schema.org","@type":"Corporation","name":"Ticket9","url":"https://www.theticket9.com/","logo":"https://storage.googleapis.com/ticket9-prod.appspot.com/Email/1727092315290/logo%206_image_image_1.webp","alternateName":"Ticket9","image":"https://storage.googleapis.com/ticket9-prod.appspot.com/Email/1728982076326/ticket9_cover_img_image_image_1.webp","sameAs":["https://in.linkedin.com/company/theticket9","https://www.instagram.com/the_ticket_9/","https://www.instagram.com/ticket9_/","https://www.facebook.com/theticket9","https://twitter.com/theticket9","https://www.crunchbase.com/organization/ticket-9","https://yourstory.com/companies/ticket-9","https://tracxn.com/d/companies/ticket9/__XqbVPyCVjkggirgRyUtTX2q1QLgBAE2i1ChSOg30AVE"],"contactPoint":[{"@type":"ContactPoint","telephone":"+919790762727","contactType":"customer service","email":"support@theticket9.com","availableLanguage":"en"}]},{"@context":"https://schema.org","@type":"WebSite","name":"Ticket9","url":"https://www.theticket9.com/","potentialAction":{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://www.theticket9.com/event/{search_term_string}"},"query-input":"required name=search_term_string"}}]`}
      </script>
      <div className="w-full h-full relative bg-gradient-to-br from-white to-[#fef6f9]">
        <section
          aria-label="Notifications alt+T"
          tabIndex="-1"
          aria-live="polite"
          aria-relevant="additions text"
          aria-atomic="false"
        ></section>
        <div className="relative">
          {/* Use your existing Header component */}
          <Header />
          {/* Mobile header bar */}
          <div className="w-full hidden md:block z-40 bg-white/95 backdrop-blur-xl shadow-lg fixed top-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-1">
              <div className="flex justify-between items-center">
                <div className="flex">
                  <button className="flex items-center gap-2 px-2 py-1 font-medium text-sm transition-all duration-200 outline-none text-[#ff5862]">
                    Events
                  </button>
                  <button className="flex items-center gap-2 px-2 py-1 font-medium text-sm transition-all duration-200 outline-none text-gray-600 hover:text-gray-800">
                    RSVP
                  </button>
                  <button className="flex items-center gap-1 px-2 py-1 font-medium text-sm transition-all duration-200 outline-none text-gray-600 opacity-70">
                    Movies{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-lock size-3.5"
                      aria-hidden="true"
                    >
                      <rect
                        width="18"
                        height="11"
                        x="3"
                        y="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </button>
                </div>
                <div className="flex items-center gap-2 pr-6">
                  <div className="rounded-full px-5 py-2 text-sm cursor-pointer transition-all duration-300 flex gap-2 items-center">
                    <span className="font-medium text-gray-700 transition-colors">
                      What&apos;s New
                    </span>
                  </div>
                  <div className="rounded-full py-1.5 text-sm cursor-pointer transition-all duration-300 flex gap-2 items-center">
                    <button className="outline-none">
                      <span className="text-gray-700 flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-smartphone size-3.5"
                          aria-hidden="true"
                        ></svg>{" "}
                        Get App
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:hidden sticky top-20 z-40 h-10 bg-white/95 backdrop-blur-md border-b border-gray-200/60 transition-all duration-300">
            <div className="flex justify-center items-center px-2 pt-1 max-w-7xl mx-auto h-full">
              <nav className="flex gap-8">
                <button className="relative flex flex-col items-center group">
                  <span className="text-[13px] font-semibold flex items-center gap-1 transition-all duration-300 px-2 relative text-[#ff5862]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-calendar size-3"
                      aria-hidden="true"
                    ></svg>
                    Events
                    <span className="absolute left-0 right-0 h-[3px] rounded-full bottom-[-6px] transition-all duration-300 bg-[#ff5862] opacity-100"></span>
                  </span>
                </button>
                <button className="relative flex flex-col items-center group">
                  <span className="text-[13px] font-semibold inline-flex items-center gap-1 transition-all duration-300 px-2 relative text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-mail-check size-3"
                      aria-hidden="true"
                    ></svg>
                    RSVP
                    <span className="absolute -top-1.5 -right-2 bg-[#ff5862] text-white text-[8px] px-1.5 py-0.5 rounded-full leading-none">
                      New
                    </span>
                    <span className="absolute left-0 right-0 h-[3px] rounded-full bottom-[-6px] transition-all duration-300 opacity-0"></span>
                  </span>
                </button>
                <button
                  disabled
                  className="relative flex flex-col items-center group"
                >
                  <span className="text-[13px] font-semibold inline-flex items-center gap-1 transition-all duration-300 px-2 relative text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-clapperboard size-3"
                      aria-hidden="true"
                    ></svg>
                    Movies
                    <span className="absolute -top-1.5 -right-1 border border-gray-600 text-gray-600 text-[8px] px-1.5 py-0.5 rounded-full leading-none">
                      Soon
                    </span>
                    <span className="absolute left-0 right-0 h-[3px] rounded-full bottom-[-6px] transition-all duration-300 opacity-0"></span>
                  </span>
                </button>
              </nav>
            </div>
          </div>
          <div className="pt-20">
            <div>
              <header>
                <div className="mt-8 mb-3 mx-5">
                  <div className="w-full flex items-center bg-white px-4 py-2 md:hidden rounded-full border border-gray-300 shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-search w-5 h-5 text-gray-500 mr-2"
                      aria-hidden="true"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </svg>
                    <input
                      type="text"
                      placeholder="Search events, concerts, shows…"
                      className="flex-1 outline-none text-gray-800 text-sm placeholder:text-gray-400"
                      readOnly
                    />
                  </div>
                </div>
                <Hero />
              </header>
              <main className="md:mt-0 z-10 relative">
                <div className="rounded-t-2xl md:rounded-none px-2 md:px-5 md:pt-10 pb-16 space-y-6 md:space-y-10">
                  <FeaturedEvents />
                  <PopularEvents />
                  <RecommendedEvents />
                  <WhyBookWithUs />
                  <section
                    aria-label="Bottom Ads or Promotions"
                    className="pt-5"
                  >
                    <div>
                      <section
                        className="relative max-w-6xl mx-auto rounded-2xl p-6 md:p-8 border border-gray-200 bg-gradient-to-br from-indigo-100 via-red-50 to-yellow-50 mt-5 md:mt-20 shadow-lg select-none"
                        aria-labelledby="download-app-heading"
                      >
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8">
                          <div className="w-24 md:w-44 flex-shrink-0">
                            <img
                              alt="Ticket9 App Logo"
                              draggable="false"
                              loading="lazy"
                              width="128"
                              height="128"
                              decoding="async"
                              data-nimg="1"
                              className="w-full h-auto object-contain rounded-lg drop-shadow-xl"
                              style={{ color: "transparent" }}
                              src="../_next/static/media/ticket9-color-250x250.0dba4e8a.webp"
                            />
                          </div>
                          <div className="flex-1 text-center md:text-left">
                            <h2
                              id="download-app-heading"
                              className="text-2xl md:text-3xl font-bold text-gray-900 mb-3"
                            >
                              Download Ticket9 App
                            </h2>
                            <div className="text-gray-700 text-sm md:text-base space-y-2 max-w-2xl">
                              <div className="flex md:items-start gap-2">
                                <div>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-circle-check-big text-green-500 mt-1"
                                    aria-hidden="true"
                                  >
                                    <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                                    <path d="m9 11 3 3L22 4"></path>
                                  </svg>
                                </div>
                                <span className="text-left">
                                  Enjoy exclusive perks with our app
                                </span>
                              </div>
                              <div className="flex md:items-start gap-2">
                                <div>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-circle-check-big text-green-500 mt-1"
                                    aria-hidden="true"
                                  >
                                    <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                                    <path d="m9 11 3 3L22 4"></path>
                                  </svg>
                                </div>
                                <span className="text-left">
                                  Quick tickets, early access, and unbeatable
                                  deals anytime, anywhere.
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col justify-center md:justify-start items-center md:items-start gap-2 mt-2">
                              <div className="flex items-center gap-1.5">
                                <div className="flex">
                                  <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth="0"
                                    viewBox="0 0 576 512"
                                    className="size-4 text-yellow-400 fill-yellow-400"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                                  </svg>
                                </div>
                                <div className="flex">
                                  <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth="0"
                                    viewBox="0 0 576 512"
                                    className="size-4 text-yellow-400 fill-yellow-400"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                                  </svg>
                                </div>

                                <div className="flex">
                                  <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth="0"
                                    viewBox="0 0 576 512"
                                    className="size-4 text-yellow-400 fill-yellow-400"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                                  </svg>
                                </div>
                              </div>
                              <span className="text-sm font-semibold text-gray-800 space-x-1">
                                <span> 4.5 </span>
                                <span className="text-gray-700 font-normal">
                                  (1K+ reviews)
                                </span>
                              </span>
                            </div>
                            <p className="text-xs text-gray-700">
                              Trusted by thousands of users worldwide
                            </p>
                          </div>
                          <div className="flex flex-row items-center gap-4">
                            <div className="flex flex-col justify-center items-center gap-4 md:gap-5">
                              <div className="flex flex-col items-center gap-4 w-full">
                                <h3 className="text-xs md:text-sm font-medium text-gray-700 text-center">
                                  Available on mobile
                                </h3>
                                <div className="flex flex-col justify-center items-center gap-2 w-full max-w-xs">
                                  <a
                                    href="https://play.google.com/store/apps/details?id=com.theticket9.ticket9&amp;hl=en_IN"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Get Ticket9 on Google Play"
                                    className="group relative transition-all duration-200 hover:scale-105 hover:drop-shadow-md rounded-lg overflow-hidden"
                                  >
                                    <img
                                      alt="Get it on Google Play"
                                      loading="lazy"
                                      width="160"
                                      height="53"
                                      decoding="async"
                                      data-nimg="1"
                                      className="h-12 w-auto md:h-[53px] object-contain"
                                      style={{ color: "transparent" }}
                                      srcSet="../_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbtn-android-white.1e282caa.png&amp;w=256&amp;q=75 1x, ../_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbtn-android-white.1e282caa.png&amp;w=384&amp;q=75 2x"
                                      src="../_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbtn-android-white.1e282caa.png&amp;w=384&amp;q=75"
                                    />
                                  </a>
                                  <a
                                    href="https://apps.apple.com/in/app/ticket9/id6720710550"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Download Ticket9 on the App Store"
                                    className="group relative transition-all duration-200 hover:scale-105 hover:drop-shadow-md rounded-lg overflow-hidden"
                                  >
                                    <img
                                      alt="Download on the App Store"
                                      loading="lazy"
                                      width="160"
                                      height="53"
                                      decoding="async"
                                      data-nimg="1"
                                      className="h-12 w-auto md:h-[53px] object-contain"
                                      style={{ color: "transparent" }}
                                      srcSet="../_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbtn-ios-white.3d6dcf0b.png&amp;w=256&amp;q=75 1x, ../_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbtn-ios-white.3d6dcf0b.png&amp;w=384&amp;q=75 2x"
                                      src="../_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbtn-ios-white.3d6dcf0b.png&amp;w=384&amp;q=75"
                                    />
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                              <div className="bg-white p-2 rounded-lg flex flex-col items-center size-28 md:size-36 order-2 md:order-1">
                                <img
                                  alt="Scan to download Ticket9 app"
                                  draggable="false"
                                  loading="lazy"
                                  width="100"
                                  height="100"
                                  decoding="async"
                                  data-nimg="1"
                                  className="w-full h-full object-contain"
                                  style={{ color: "transparent" }}
                                  src="../_next/static/media/Ticket9playstore_QRcode.0f4bd804.png"
                                />
                              </div>
                              <p className="text-xs text-gray-700 text-center max-w-40 md:pt-3 pb-3 order-1 md:order-2">
                                Scan to download directly to your phone
                              </p>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </section>
                  <Newsletter />
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
