const CityHero = () => {
  return (
    <div className="mt-20">
      <div className="container mx-auto py-5">
        <div className="flex flex-col lg:flex-row container mx-auto px-8 md:px-20 py-5">
          <div className="flex-shrink-0 lg:w-1/2 flex gap-10 flex-col relative items-start space-y-6 lg:space-y-10 pb-14 lg:pb-10 xl:pb-10 xl:pr-14 lg:mr-10 xl:mr-0">
            <div className="mt-8 flex flex-col gap-5 lg:gap-10">
              <h4 className="font-medium text-4xl lg:text-6xl leading-[110%] capitalize">chennai</h4>
              <span className="text-md lg:text-xl">
                Vanakkam Chennai! Explore music, dance and arts that celebrate the essence of Tamil culture
              </span>
            </div>
            <img
              alt="hero"
              draggable="false"
              fetchPriority="high"
              width="20"
              height="20"
              decoding="async"
              data-nimg="1"
              className="w-full hidden lg:block"
              style={{ color: 'transparent' }}
              src="/_next/static/media/chennai.377fb13a.webp"
            />
          </div>
          <div className="flex-grow">
            <img
              alt="hero"
              draggable="false"
              fetchPriority="high"
              width="815"
              height="756"
              decoding="async"
              data-nimg="1"
              className="w-full"
              style={{ color: 'transparent' }}
              src="/_next/static/media/chennai 1.fc4a0638.webp"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityHero;