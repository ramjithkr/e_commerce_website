import necklaceImage from "../../assets/carosel/elegant.avif";
import { useEffect, useState } from "react";





// running display

export const Carousel = () => {
  const [activeSlide, setActiveSlide] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      // setActiveSlide((prevSlide) => (prevSlide === 4 ? 1 : prevSlide + 1));
    }, 5000); // 5 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  // Scroll to the active slide
  useEffect(() => {
    const slide = document.getElementById(`item${activeSlide}`);
    if (slide) {
      slide.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  }, [activeSlide]);

  return (
    <div>
      <div className="carousel w-full h-64">
        {" "}
        {/* Set a fixed height */}
        <div id="item1" className="carousel-item w-full h-full">
          <img
            src={necklaceImage}
            className="w-full h-full object-cover"
            alt="Slide 1"
          />
        </div>
        <div id="item2" className="carousel-item w-full h-full">
          <img
            src="https://img.freepik.com/free-photo/three-black-ducks_23-2147680069.jpg?w=996&t=st=1726074332~exp=1726074932~hmac=964400ee42b6b551bc6b4c68442177083034cd8b4167a7eb1a3b115e0abf743a"
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

