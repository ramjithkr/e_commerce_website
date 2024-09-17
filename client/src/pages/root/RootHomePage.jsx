import { Carousel } from "../Home/Carousel";
import { DisplayImages1 } from "../Home/DisplayImages1";
import { RootMensBracelete } from "../Home/Mensbracelete";
import { RootMensPendent } from "../Home/MensPendent";

export const RootHomePage = () => {
  return (
    <div>
      <Carousel />

      <RootMensPendent />
      <DisplayImages1 />
      <RootMensBracelete />
    </div>
  );
};
