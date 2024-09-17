import { DisplayImages1 } from "../Home/DisplayImages1";

import { Carousel } from "../Home/Carousel";

// import { WebAnalyticsDashboard } from "../Home/adminHome/WebAnalytics";
import { UserMensPendent } from "./../Home/MensPendent";
import { UserMensBracelete } from "../Home/Mensbracelete";

export const UserHomePage = () => {
  return (
    <div>
      {/* <WebAnalyticsDashboard/> */}

      <Carousel />
      <UserMensPendent />
      <DisplayImages1 />
      <UserMensBracelete/>  
    </div>
  );
};
