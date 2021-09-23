import React from "react";
import "./Home.scss";
import Navigation from "components/navigation/Navigation";
import Splide from "components/splide/Splide";

const Home = () => {
  const splideOptions = {
    rewind: true,
    perPage: 1,
    autoplay: true,
    type: "fade",
    focus: "left",
    gap: "1rem",
    pauseOnHover: false,
    pauseOnFocus: false,
    drag: false,
    interval: 4000,
    arrows: false,
  };

  return (
    <div className="home">
      <div className="hero">
        <Navigation />
        <Splide options={splideOptions}>
          <li className="splide__slide">
            <div />
          </li>
          <li className="splide__slide">
            <div />
          </li>
          <li className="splide__slide">
            <div />
          </li>
        </Splide>
      </div>
    </div>
  );
};

export default Home;