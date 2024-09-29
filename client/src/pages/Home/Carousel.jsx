import { useEffect, useState, useRef } from "react";
import necklaceImage from "../../assets/carosel/elegant.avif";

export const Carousel = () => {
  const [activeSlide, setActiveSlide] = useState(1);
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide === 4 ? 1 : prevSlide + 1));
    }, 4000); // 4 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const rect = carouselRef.current.getBoundingClientRect();
        const inViewport = rect.top >= 0 && rect.bottom <= window.innerHeight;
        if (inViewport) {
          const slide = document.getElementById(`item${activeSlide}`);
          if (slide) {
            slide.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "start",
            });
          }
        }
      }
    };

    handleScroll(); // Check if the carousel is in view on initial render

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSlide]);

  return (
    <div ref={carouselRef}>
      <div className="carousel w-full h-64">
        <div id="item1" className="carousel-item w-full h-full">
          <img
            src={necklaceImage}
            className="w-full h-full object-cover"
            alt="Slide 1"
          />
        </div>
        <div id="item2" className="carousel-item w-full h-full">
          <img
            src="https://www.blackmambajewellery.com/cdn/shop/files/Capture154152copy_1100x.jpg?v=1721419978"
            className="w-full h-full object-cover"
            alt="Slide 2"
          />
        </div>
        <div id="item3" className="carousel-item w-full h-full">
          <img
            src="https://img.freepik.com/premium-photo/elegant-monochrome-necklace-table-sleek-black-vase-fashion-beauty-composition_163305-324651.jpg?w=640"
            className="w-full h-full object-cover"
            alt="Slide 3"
          />
        </div>
        <div id="item4" className="carousel-item w-full h-full">
          <img
            src="https://img.freepik.com/premium-photo/platinum-bracelet-with-intricate-carvings-wallpaper_1072167-9777.jpg?w=360"
            className="w-full h-full object-cover"
            alt="Slide 4"
          />
        </div>
      </div>

      <div className="flex w-full justify-center gap-2 py-2">
        <button
          className={`btn btn-xs ${activeSlide === 1 ? "btn-active" : ""}`}
          onClick={() => setActiveSlide(1)}
        >
          1
        </button>
        <button
          className={`btn btn-xs ${activeSlide === 2 ? "btn-active" : ""}`}
          onClick={() => setActiveSlide(2)}
        >
          2
        </button>
        <button
          className={`btn btn-xs ${activeSlide === 3 ? "btn-active" : ""}`}
          onClick={() => setActiveSlide(3)}
        >
          3
        </button>
        <button
          className={`btn btn-xs ${activeSlide === 4 ? "btn-active" : ""}`}
          onClick={() => setActiveSlide(4)}
        >
          4
        </button>
      </div>
    </div>
  );
};
