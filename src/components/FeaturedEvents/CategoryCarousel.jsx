const CategoryCarousel = () => (
  <div className="relative my-8 md:my-10">
    <div className="embla overflow-hidden">
      <div className="embla__container flex gap-4">
        {/* Placeholder categories; in real app, map over data */}
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="embla__slide flex-shrink-0 size-16 animate-pulse rounded-full bg-gray-100"></div>
          <span className="text-xs md:text-sm w-full h-5 bg-gray-100 rounded-full inline-block font-medium text-center whitespace-nowrap"></span>
        </div>
        {/* Repeat for more categories */}
      </div>
    </div>
  </div>
);

export default CategoryCarousel;