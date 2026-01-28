const EventGrid = ({ events }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map(event => (
        <div key={event._id} className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition">

          <img
            src={event.banner}
            className="h-48 w-full object-cover"
          />

          <div className="p-4 space-y-1">
            <p className="text-sm text-pink-600">{event.category?.name}</p>
            <h3 className="font-semibold line-clamp-2">{event.title}</h3>
            <p className="text-sm text-gray-500">
              {event.location?.city}
            </p>
          </div>

        </div>
      ))}
    </div>
  );
};

export default EventGrid;
