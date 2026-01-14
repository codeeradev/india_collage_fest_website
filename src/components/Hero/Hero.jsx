import VideoCarousel from './VideoCarousel';

const Hero = () => (
  <section className="relative h-[60vh] md:h-[90vh] overflow-hidden group select-none">
    <VideoCarousel />
    <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/50 to-black/50"></div>
    <div className="absolute inset-0 flex items-center px-8 lg:px-14">
      <div className="max-w-4xl text-white">
        <h1 className="text-4xl lg:text-5xl font-extrabold mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
          Discover Your Next
        </h1>
        <h1 className="text-4xl lg:text-5xl font-extrabold pb-4 lg:pb-6 bg-gradient-to-r from-[#FF9650] to-[#FB426E] bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
          Unforgettable Experience
        </h1>
        <p className="text-lg lg:text-xl mb-4 lg:mb-8 text-gray-200">
          Explore concerts, shows, nightlife, and exclusive experiences happening around you.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-2xl">
          <input
            type="text"
            placeholder="Search events, concerts, shows…"
            className="flex-1 bg-white rounded-xl px-5 py-4 text-gray-800"
          />
          <button className="bg-gradient-to-br from-[#FF9650] to-[#FB426E] text-white px-8 py-4 rounded-xl font-semibold">
            Search
          </button>
        </form>
        <div className="flex flex-wrap gap-4 mt-6 lg:mt-10">
          <button className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition">
            Concert
          </button>
          <button className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition">
            Sports
          </button>
          <button className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition">
            Musics
          </button>
          <button className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition">
            Live Shows
          </button>
          <button className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition">
            Comedy Show
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;