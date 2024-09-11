import DisplayImg1 from "../../assets/carosel/DisplayIMG001.webp";
import DisplayImg2 from "../../assets/carosel/DisplayIMG002.webp";
import DisplayImg3 from "../../assets/carosel/DisplayIMG003.webp";

export const DisplayImages1 = () => {
  return (
    <div className="flex justify-between">
      <img src={DisplayImg3} alt="Display 2" className="w-1/3 object-cover" />
      <img src={DisplayImg1} alt="Display 1" className="w-1/3 object-cover" />
      <img src={DisplayImg2} alt="Display 2" className="w-1/3 object-cover" />
    </div>
  );
};
