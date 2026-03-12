import Hero from "../components/Hero/Hero";
import FeaturedEvents from "../components/FeaturedEvents/FeaturedEvents";
import PopularEvents from "../components/PopularEvents/PopularEvents";
import FeaturedOrganizers from "../components/FeaturedOrganizers";
import WhyBookWithUs from "../components/WhyBookWithUs";
import Categories from "../components/Categories/Categories";
import RevealOnScroll from "../components/RevealOnScroll";
import PageLayout from "../components/layout/PageLayout";
import SectionWrapper from "../components/layout/SectionWrapper";

const LandingPage = () => {
  return (
    <PageLayout className="relative overflow-x-clip" mainClassName="relative z-10 flex flex-col gap-0">
      <script defer type="application/ld+json">
        {`[{"@context":"https://schema.org","@type":"Corporation","name":"India College Fest","url":"https://www.indiacollegefest.com/","logo":"https://www.indiacollegefest.com/favicon.ico","alternateName":"indiacollegefest","image":"https://www.indiacollegefest.com/favicon.ico","sameAs":["https://in.linkedin.com/company/indiacollegefest","https://www.instagram.com/indiacollegefest/","https://www.facebook.com/indiacollegefest","https://twitter.com/indiacollegefest"],"contactPoint":[{"@type":"ContactPoint","telephone":"+919790762727","contactType":"customer service","email":"support@indiacollegefest.com","availableLanguage":"en"}]},{"@context":"https://schema.org","@type":"WebSite","name":"India College Fest","url":"https://www.indiacollegefest.com/","potentialAction":{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://www.indiacollegefest.com/event/{search_term_string}"},"query-input":"required name=search_term_string"}}]`}
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

        <div>
          <header>
            {/* <SectionWrapper
              as="div"
              withVerticalSpacing={false}
              className="md:hidden py-6 md:py-8 lg:py-10"
            >
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
            </SectionWrapper> */}

            <Hero />

            <RevealOnScroll delay={60}>
              <section className="relative bg-slate-50/90">
                <SectionWrapper
                  as="div"
                  withVerticalSpacing={false}
                  className="relative py-6 md:py-8 lg:py-10"
                >
                  <Categories />
                </SectionWrapper>
              </section>
            </RevealOnScroll>
          </header>

          <main className="relative z-10">
            <RevealOnScroll className="scroll-mt-20" delay={0}>
              <SectionWrapper withVerticalSpacing={false} className="py-6 md:py-8 lg:py-10">
                <FeaturedEvents />
              </SectionWrapper>
            </RevealOnScroll>

            <RevealOnScroll className="scroll-mt-20" delay={90}>
              <SectionWrapper withVerticalSpacing={false} className="py-6 md:py-8 lg:py-10">
                <PopularEvents />
              </SectionWrapper>
            </RevealOnScroll>

            <RevealOnScroll className="scroll-mt-20" delay={140}>
              <SectionWrapper withVerticalSpacing={false} className="py-6 md:py-8 lg:py-10">
                <FeaturedOrganizers />
              </SectionWrapper>
            </RevealOnScroll>

            <RevealOnScroll className="scroll-mt-20" delay={180}>
              <SectionWrapper withVerticalSpacing={false} className="py-6 md:py-8 lg:py-10">
                <WhyBookWithUs />
              </SectionWrapper>
            </RevealOnScroll>
          </main>
        </div>
      </div>
    </PageLayout>
  );
};

export default LandingPage;
