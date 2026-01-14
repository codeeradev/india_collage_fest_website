const VideoCarousel = () => {
  return (
    <div className="embla h-full">
      <div className="embla__container flex h-full">
        <div className="embla__slide flex-[0_0_100%] min-w-0 h-full relative">
          <video
            src="https://storage.googleapis.com/ticket9-prod.appspot.com/videos/1765955266059_sport.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster="/src/_next/static/media/preload-image.2a12e318.webp"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="embla__slide flex-[0_0_100%] min-w-0 h-full relative">
          <video
            src="https://storage.googleapis.com/ticket9-prod.appspot.com/videos/1765955219308_concert.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster="/src/_next/static/media/preload-image.2a12e318.webp"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="embla__slide flex-[0_0_100%] min-w-0 h-full relative">
          <video
            src="https://storage.googleapis.com/ticket9-prod.appspot.com/videos/1765955295343_music.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster="/src/_next/static/media/preload-image.2a12e318.webp"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoCarousel;