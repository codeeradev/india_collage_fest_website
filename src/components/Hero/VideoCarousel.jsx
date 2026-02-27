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


