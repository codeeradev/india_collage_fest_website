import { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { DEFAULT_HERO_CONTENT } from "../../config/heroDefaults";

const getSafeSlides = (slides = []) => {
  if (!Array.isArray(slides) || !slides.length) {
    return DEFAULT_HERO_CONTENT.videos;
  }

  return slides.filter((slide) => slide?.src);
};

const getSafeInterval = (value) => {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return DEFAULT_HERO_CONTENT.autoRotateMs;
  }

  return Math.min(Math.max(Math.round(parsed), 2000), 30000);
};

const VideoCarousel = ({ slides, autoRotateMs }) => {
  const safeSlides = useMemo(() => getSafeSlides(slides), [slides]);
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (activeIndex >= safeSlides.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, safeSlides.length]);

  useEffect(() => {
    if (safeSlides.length <= 1) return undefined;

    window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % safeSlides.length);
    }, getSafeInterval(autoRotateMs));

    return () => window.clearInterval(timerRef.current);
  }, [safeSlides.length, activeIndex, autoRotateMs]);

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="absolute inset-0">
      {safeSlides.map((slide, index) => (
        <div
          key={`${slide.src}-${index}`}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ${
            activeIndex === index ? "z-[2] opacity-100" : "z-[1] opacity-0"
          }`}
          aria-hidden={activeIndex !== index}
        >
          <video
            src={slide.src}
            autoPlay
            loop
            muted
            playsInline
            preload={activeIndex === index ? "auto" : "metadata"}
            className={`absolute inset-0 h-full w-full object-cover ${
              activeIndex === index ? "scale-105" : "scale-100"
            } transition-transform duration-[6500ms] ease-out`}
          />
        </div>
      ))}

      {safeSlides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 bg-slate-950/45 px-3 py-2 backdrop-blur-md sm:bottom-8">
          {safeSlides.map((slide, index) => (
            <button
              key={`${slide.title}-${index}`}
              type="button"
              onClick={() => handleDotClick(index)}
              aria-label={`Show ${slide.title || `video ${index + 1}`}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-8 bg-white"
                  : "w-2.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

VideoCarousel.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      title: PropTypes.string,
    }),
  ),
  autoRotateMs: PropTypes.number,
};

VideoCarousel.defaultProps = {
  slides: DEFAULT_HERO_CONTENT.videos,
  autoRotateMs: DEFAULT_HERO_CONTENT.autoRotateMs,
};

export default VideoCarousel;
