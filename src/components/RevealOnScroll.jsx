import { useEffect, useRef, useState } from "react";

const RevealOnScroll = ({ children, delay = 0, className = "" }) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!elementRef.current) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -60px 0px",
      },
    );

    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${className} reveal-prep ${isVisible ? "reveal-visible" : ""}`}
    >
      {children}
    </div>
  );
};

export default RevealOnScroll;
