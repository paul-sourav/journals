import React from "react";
import "./Features.css";
import img1 from "../images/1.jpg";
import img2 from "../images/2.jpg";
import img3 from "../images/3.jpg";
import img5 from "../images/5.jpg";
import img6 from "../images/6.jpg";

const Features = () => {
  return (
    <>
      <div className="features">
        <h1>Throwback to Your Happiest Moments</h1>
        <p>
          Look back at your best memories and your journal entries from a week,
          a month, or even a year or two ago.
        </p>
        <div className="media-show">
          <div>
            <img src={img1} alt="img1" />
            <p> Memory</p>
          </div>
          <div>
            <img src={img2} alt="img2" />
            <p> Memory</p>
          </div>
          <div>
            <img src={img3} alt="img3" />
            <p> Memory</p>
          </div>
          <div>
            <img src={img5} alt="img5" />
            <p> Memory</p>
          </div>
          <div>
            <img src={img6} alt="img6" />
            <p> Memory</p>
          </div>
        </div>

        
      </div>
    </>
  );
};

export default Features;
