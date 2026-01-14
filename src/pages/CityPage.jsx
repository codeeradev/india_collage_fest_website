import CityHero from '../components/CityHero';
import EventFilters from '../components/EventFilters';
import EventGrid from '../components/EventGrid';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';

const CityPage = () => {
  return (
    <div className="min-h-screen">
      <script defer type="application/ld+json">
        {`[{"@context":"https://schema.org","@type":"WebSite","name":"Ticket9","url":"https://www.theticket9.com/city/chennai","potentialAction":{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://www.theticket9.com/event/{search_term_string}"},"query-input":"required name=search_term_string"}}]`}
      </script>
      <div className="w-full h-full relative bg-gradient-to-br from-white to-[#fef6f9]">
        <section aria-label="Notifications alt+T" tabIndex="-1" aria-live="polite" aria-relevant="additions text" aria-atomic="false"></section>
        <div className="relative">
          {/* Header (reuse from previous) */}
          <div id="non-printable" className="w-full fixed top-0 left-0 right-0 z-50 transition-all duration-500 translate-y-0 bg-white/90 backdrop-blur-2xl shadow-sm">
            {/* Include Header component here */}
          </div>
          {/* Mobile header bar */}
          <div className="w-full hidden md:block z-40 bg-white/95 backdrop-blur-xl shadow-lg fixed top-20">
            {/* Include mobile header here */}
          </div>
          <div className="w-full md:hidden sticky top-20 z-40 h-10 bg-white/95 backdrop-blur-md border-b border-gray-200/60 transition-all duration-300">
            {/* Include mobile nav here */}
          </div>
          <CityHero />
          <div className="container mx-auto md:px-10">
            <div className="mb-12 lg:mb-16 px-5 md:px-0">
              <h1 className="text-4xl font-semibold capitalize">Events in chennai</h1>
              <span className="block text-gray-500 mt-3">Totally, Events in this city</span>
            </div>
            <EventFilters />
            <EventGrid />
            <Pagination />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CityPage;