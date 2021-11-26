import styles from "./ImageSlider.module.scss";
import { useState, useEffect, useRef } from "react";

const ImageSlider = ({ sliderImages }) => {
  const [slidePrev, setSlidePrev] = useState("");
  const [slideActive, setSlideActive] = useState("");
  const [slideNext, setSlideNext] = useState("");
  const [counter, setCounter] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    setSlideActive(sliderImages[counter]);
    if (counter === 0) setSlidePrev(sliderImages[sliderImages.length - 1]);
    else setSlidePrev(sliderImages[counter - 1]);
    if (counter === sliderImages.length - 1) setSlideNext(sliderImages[0]);
    else setSlideNext(sliderImages[counter + 1]);
    sliderRef.current.classList.remove(styles[`slider__transform--right`]);
    sliderRef.current.classList.remove(styles[`slider__transform--left`]);
  }, [counter, sliderImages]);

  function endImageChangeAnimation() {
    if (sliderRef.current.classList.contains(styles[`slider__transform--right`])) {
      if (counter === sliderImages.length - 1) setCounter(0);
      else setCounter(counter + 1);
    }
    if (sliderRef.current.classList.contains(styles[`slider__transform--left`])) {
      if (counter === 0) setCounter(sliderImages.length - 1);
      else setCounter(counter - 1);
    }
  }

  function animateImageChange(transformClass) {
    if (
      sliderRef.current.classList.contains(styles[`slider__transform--left`]) ||
      sliderRef.current.classList.contains(styles[`slider__transform--right`])
    )
      return;
    sliderRef.current.classList.add(transformClass);
  }

  return (
    <div className={styles.image__slider} ref={sliderRef}>
      <button
        className={`${styles.control__button} ${styles[`control__button--left`]}`}
        onClick={() => animateImageChange(styles[`slider__transform--left`])}
      >
        {`<`}
      </button>
      <button
        className={`${styles.control__button} ${styles[`control__button--right`]}`}
        onClick={() => animateImageChange(styles[`slider__transform--right`])}
      >
        {`>`}
      </button>
      <div className={styles.slides}>
        <div className={styles.slide__prev}>
          <img src={slidePrev} alt="" />
        </div>
        <div className={styles.slide__active} onTransitionEnd={() => endImageChangeAnimation()}>
          <img src={slideActive} alt="" />
        </div>
        <div className={styles.slide__next}>
          <img src={slideNext} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
