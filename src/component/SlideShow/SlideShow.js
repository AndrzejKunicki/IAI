import React from "react";
import { Slide } from "react-slideshow-image";
import "./SlideShow.scss";
import "react-slideshow-image/dist/styles.css";

const Slideshow = ({ images }) => {
  return (
    <div className="slider">
      <Slide easing="ease">
        <div className="each_slide">
          <div>
            <img src={images[0]} alt=""></img>
          </div>
        </div>
        <div className="each_slide">
          <div>
            <img src={images[1]} alt=""></img>
          </div>
        </div>
        <div className="each_slide">
          <div>
            <img src={images[2]} alt=""></img>
          </div>
        </div>
      </Slide>
    </div>
  );
};

export default Slideshow;
