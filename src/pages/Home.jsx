import Hero from "../components/Hero/Hero";
import FeaturedEvents from "../components/FeaturedEvents/FeaturedEvents";
import PopularEvents from "../components/PopularEvents/PopularEvents";
import FeaturedOrganizers from "../components/FeaturedOrganizers";
import WhyBookWithUs from "../components/WhyBookWithUs";
import Footer from "../components/Footer";
import Header from "../components/Header/Header";
import Categories from "../components/Categories/Categories";
import RevealOnScroll from "../components/RevealOnScroll";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <script defer type="application/ld+json">
        {`[{"@context":"https://schema.org","@type":"Corporation","name":"Ticket9","url":"https://www.theticket9.com/","logo":"https://storage.googleapis.com/ticket9-prod.appspot.com/Email/1727092315290/logo%206_image_image_1.webp","alternateName":"Ticket9","image":"https://storage.googleapis.com/ticket9-prod.appspot.com/Email/1728982076326/ticket9_cover_img_image_image_1.webp","sameAs":["https://in.linkedin.com/company/theticket9","https://www.instagram.com/the_ticket_9/","https://www.instagram.com/ticket9_/","https://www.facebook.com/theticket9","https://twitter.com/theticket9","https://www.crunchbase.com/organization/ticket-9","https://yourstory.com/companies/ticket-9","https://tracxn.com/d/companies/ticket9/__XqbVPyCVjkggirgRyUtTX2q1QLgBAE2i1ChSOg30AVE"],"contactPoint":[{"@type":"ContactPoint","telephone":"+919790762727","contactType":"customer service","email":"support@theticket9.com","availableLanguage":"en"}]},{"@context":"https://schema.org","@type":"WebSite","name":"Ticket9","url":"https://www.theticket9.com/","potentialAction":{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://www.theticket9.com/event/{search_term_string}"},"query-input":"required name=search_term_string"}}]`}
      </script>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-44 left-[-12rem] h-[32rem] w-[32rem] rounded-full bg-blue-200/45 blur-3xl" />
        <div className="absolute top-[22rem] right-[-9rem] h-[24rem] w-[24rem] rounded-full bg-cyan-200/45 blur-3xl" />
        <div className="absolute bottom-[18rem] left-[30%] h-[20rem] w-[20rem] rounded-full bg-amber-100/45 blur-3xl" />
      </div>

      <div className="relative z-10 w-full h-full">
        <section
          aria-label="Notifications alt+T"
          tabIndex="-1"
          aria-live="polite"
          aria-relevant="additions text"
          aria-atomic="false"
        />

        <Header />

        <div>
          <header>
            <div className="pt-24 pb-4 px-5 md:hidden">
              <div className="w-full flex items-center bg-white/95 px-5 py-3.5 rounded-2xl border border-slate-200 shadow-[0_20px_30px_-28px_rgba(15,23,42,0.55)] hover:shadow-[0_20px_30px_-20px_rgba(37,99,235,0.45)] transition-shadow duration-200 group">
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
                  className="w-5 h-5 text-slate-400 group-hover:text-blue-600 mr-3 transition-colors duration-200"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                  type="text"
                  placeholder="Search events, concerts, shows..."
                  className="flex-1 outline-none text-slate-800 text-sm placeholder:text-slate-400"
                  readOnly
                />
              </div>
            </div>

            <Hero />

            <RevealOnScroll delay={60}>
              <section className="relative bg-slate-50/90">
                <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-14 lg:px-8">
                  <Categories />
                </div>
              </section>
            </RevealOnScroll>
          </header>

          <main className="relative z-10">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20 space-y-20 md:space-y-28">
              <RevealOnScroll className="scroll-mt-20" delay={0}>
                <section>
                  <FeaturedEvents />
                </section>
              </RevealOnScroll>

              <RevealOnScroll className="scroll-mt-20" delay={90}>
                <section>
                  <PopularEvents />
                </section>
              </RevealOnScroll>

              <RevealOnScroll className="scroll-mt-20" delay={140}>
                <section>
                  <FeaturedOrganizers />
                </section>
              </RevealOnScroll>

              <RevealOnScroll className="scroll-mt-20" delay={180}>
                <section>
                  <WhyBookWithUs />
                </section>
              </RevealOnScroll>
            </div>
          </main>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
