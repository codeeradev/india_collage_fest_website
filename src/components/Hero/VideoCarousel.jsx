import { useEffect, useMemo, useState } from "react";

const VideoCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = useMemo(
    () => [
      {
        src: "https://storage.googleapis.com/ticket9-prod.appspot.com/videos/1765955266059_sport.mp4",
        title: "Sports",
      },
      {
        src: "https://storage.googleapis.com/ticket9-prod.appspot.com/videos/1765955219308_concert.mp4",
        title: "Concerts",
      },
      {
        src: "https://storage.googleapis.com/ticket9-prod.appspot.com/videos/1765955295343_music.mp4",
        title: "Music",
      },
    ],
    [],
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 6500);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="absolute inset-0">
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ${
            activeIndex === index ? "opacity-100 z-20" : "opacity-0 z-10"
          }`}
          aria-hidden={activeIndex !== index}
        >
          <video
            src={slide.src}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className={`absolute inset-0 w-full h-full object-cover ${
              activeIndex === index ? "animate-slow-zoom" : ""
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-slate-950/20 to-slate-900/45" />
        </div>
      ))}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 rounded-full bg-slate-950/45 border border-white/20 px-3 py-2 backdrop-blur-md">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${slide.title} video`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? "w-8 bg-white"
                : "w-2.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoCarousel;
