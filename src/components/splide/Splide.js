import React from "react";
import SplideSlider from "@splidejs/splide";
import "./Splide.scss";

const Splide = ({ id, options = {}, children }) => {
  const [splide, setSplide] = React.useState({});
  const ref = React.useRef();

  React.useEffect(() => {
    setSplide(new SplideSlider(ref.current, options));
  }, []);

  React.useEffect(() => {
    if (splide.mount) {
      splide.mount();
    }
  }, [splide]);

  return (
    <div id={id} className="splide" ref={ref}>
      <div className="splide__track">
        <ul className="splide__list">{children}</ul>
      </div>
    </div>
  );
};

export default Splide;
