import Hero from "../components/Hero/Hero";
import FeaturedEvents from "../components/FeaturedEvents/FeaturedEvents";
import PopularEvents from "../components/PopularEvents/PopularEvents";
// import RecommendedEvents from "../components/RecommendedEvents";
import FeaturedOrganizers from "../components/FeaturedOrganizers";
import WhyBookWithUs from "../components/WhyBookWithUs";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer"; // Assuming Footer.jsx is in components/Footer/
import Header from "../components/Header/Header"; // Assuming Header.jsx is in components/Header/
import Categories from "../components/Categories/Categories";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <script defer type="application/ld+json">
        {`[{"@context":"https://schema.org","@type":"Corporation","name":"Ticket9","url":"https://www.theticket9.com/","logo":"https://storage.googleapis.com/ticket9-prod.appspot.com/Email/1727092315290/logo%206_image_image_1.webp","alternateName":"Ticket9","image":"https://storage.googleapis.com/ticket9-prod.appspot.com/Email/1728982076326/ticket9_cover_img_image_image_1.webp","sameAs":["https://in.linkedin.com/company/theticket9","https://www.instagram.com/the_ticket_9/","https://www.instagram.com/ticket9_/","https://www.facebook.com/theticket9","https://twitter.com/theticket9","https://www.crunchbase.com/organization/ticket-9","https://yourstory.com/companies/ticket-9","https://tracxn.com/d/companies/ticket9/__XqbVPyCVjkggirgRyUtTX2q1QLgBAE2i1ChSOg30AVE"],"contactPoint":[{"@type":"ContactPoint","telephone":"+919790762727","contactType":"customer service","email":"support@theticket9.com","availableLanguage":"en"}]},{"@context":"https://schema.org","@type":"WebSite","name":"Ticket9","url":"https://www.theticket9.com/","potentialAction":{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://www.theticket9.com/event/{search_term_string}"},"query-input":"required name=search_term_string"}}]`}
      </script>
      
      <div className="w-full h-full relative bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
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
          {/* <div className="w-full hidden md:block z-40 bg-white/95 backdrop-blur-xl shadow-lg fixed top-20">
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
          </div> */}
          
          {/* <div className="w-full md:hidden sticky top-20 z-40 h-10 bg-white/95 backdrop-blur-md border-b border-gray-200/60 transition-all duration-300">
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
          </div> */}
          
          {/* <div className="pt-20"> */}
          <div>
            <header>
              {/* Mobile Search Bar */}
              <div className="pt-24 pb-4 px-5 md:hidden">
                <div className="w-full flex items-center bg-white px-5 py-3.5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 group">
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
                    className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 mr-3 transition-colors duration-200"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                  <input
                    type="text"
                    placeholder="Search events, concerts, shows…"
                    className="flex-1 outline-none text-slate-800 text-sm placeholder:text-slate-400"
                    readOnly
                  />
                </div>
              </div>

              {/* Hero Section */}
              <Hero />

              {/* Categories Section */}
              <section className="bg-white/80 backdrop-blur-sm border-y border-slate-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-14">
                  <Categories />
                </div>
              </section>
            </header>

            {/* Main Content */}
            <main className="relative z-10">
              <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20 space-y-24 md:space-y-32">
                {/* Featured Events */}
                <section className="scroll-mt-20">
                  <FeaturedEvents />
                </section>

                {/* Popular Events */}
                <section className="scroll-mt-20">
                  <PopularEvents />
                </section>

                {/* Featured Organizers */}
                <section className="scroll-mt-20">
                  <FeaturedOrganizers />
                </section>

                {/* Why Book With Us */}
                <section className="scroll-mt-20">
                  <WhyBookWithUs />
                </section>

                {/* Newsletter */}
                <section className="scroll-mt-20">
                  <Newsletter />
                </section>
              </div>
            </main>
          </div>
          {/* </div> */}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;