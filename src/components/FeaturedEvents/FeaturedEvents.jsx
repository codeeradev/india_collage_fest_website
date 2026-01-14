import EventCard from "./EventCard";

const events = [
  { id: 1, title: "Music Night" },
  { id: 2, title: "Startup Meetup" },
  { id: 3, title: "Tech Conference" },
  { id: 4, title: "Food Festival" },
  { id: 5, title: "Art Exhibition" },
  { id: 6, title: "Comedy Show" },
];

const FeaturedEvents = () => (
  <section className="pt-4 overflow-hidden" aria-label="Featured Events">
    
    {/* Header */}
    <header className="pl-2 md:pl-0">
      <h2 className="font-semibold text-lg md:text-3xl text-gray-800">
        Featured Events ✨
      </h2>
      <p className="text-gray-600 text-sm md:text-base mt-1 md:mt-2">
        Explore top events and unforgettable experiences
      </p>
    </header>

    {/* Events Grid */}
    <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>

  </section>
);

export default FeaturedEvents;
