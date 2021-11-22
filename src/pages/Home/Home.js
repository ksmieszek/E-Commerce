import React from "react";
import Splide from "components/splide/Splide";
import styles from "./Home.module.scss";
import SlideFirstSmall from "assets/images/slideFirstSmall.jpg";
import SlideSecondSmall from "assets/images/slideSecondSmall.jpg";
import SlideThirdSmall from "assets/images/slideThirdSmall.jpg";
import SlideFirst from "assets/images/slideFirst.jpg";
import SlideSecond from "assets/images/slideSecond.jpg";
import SlideThird from "assets/images/slideThird.jpg";
import TileFirstSmall from "assets/images/tileFirstSmall.jpg";
import TileSecondSmall from "assets/images/tileSecondSmall.jpg";
import TileThirdSmall from "assets/images/tileThirdSmall.jpg";
import TileFourthSmall from "assets/images/tileFourthSmall.jpg";
import TileFifthSmall from "assets/images/tileFifthSmall.jpg";
import TileFirst from "assets/images/tileFirst.jpg";
import TileSecond from "assets/images/tileSecond.jpg";
import TileThird from "assets/images/tileThird.jpg";
import TileFourth from "assets/images/tileFourth.jpg";
import TileFifth from "assets/images/tileFifth.jpg";

const Home = () => {
  const splideOptions = {
    rewind: true,
    perPage: 1,
    autoplay: true,
    type: "fade",
    pauseOnHover: false,
    pauseOnFocus: false,
    drag: false,
    interval: 5000,
    arrows: false,
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.hero}>
        <Splide options={splideOptions}>
          <li className="splide__slide">
            <picture>
              <source media="(max-width: 500px)" srcset={SlideFirstSmall} />
              <img src={SlideFirst} alt="" />
            </picture>
            <div className="headers">
              <h2>
                Beyond style <br />
                yourself
              </h2>
              <p>
                Fashion that reflect what <br />
                Your identity are
              </p>
            </div>
          </li>
          <li className="splide__slide">
            <picture>
              <source media="(max-width: 500px)" srcset={SlideSecondSmall} />
              <img src={SlideSecond} alt="" />
            </picture>
            <div className="headers">
              <h2>
                Unlock <br />
                Your style
              </h2>
              <p>Make Your look more perfect</p>
            </div>
          </li>
          <li className="splide__slide">
            <picture>
              <source media="(max-width: 500px)" srcset={SlideThirdSmall} />
              <img src={SlideThird} alt="" />
            </picture>
            <div className="headers">
              <h2>
                Basing wardrobe <br />
                essentials
              </h2>
              <p>
                Comfortable & stylish clothes <br />
                For Everyone
              </p>
            </div>
          </li>
        </Splide>
      </div>
      <div className={styles.tiles}>
        <a href="/" className={styles.tile}>
          <picture>
            <source media="(max-width: 500px)" srcset={TileFirstSmall} />
            <img src={TileFirst} alt="" />
          </picture>
          <div className={styles.title}>Jackets</div>
        </a>
        <a href="/" className={styles.tile}>
          <picture>
            <source media="(max-width: 500px)" srcset={TileSecondSmall} />
            <img src={TileSecond} alt="" />
          </picture>
          <div className={styles.title}>Boots</div>
        </a>
        <a href="/" className={styles.tile}>
          <picture>
            <source media="(max-width: 500px)" srcset={TileThirdSmall} />
            <img src={TileThird} alt="" />
          </picture>
          <div className={styles.title}>Suits</div>
        </a>
        <a href="/" className={styles.tile}>
          <picture>
            <source media="(max-width: 500px)" srcset={TileFourthSmall} />
            <img src={TileFourth} alt="" />
          </picture>
          <div className={styles.title}>Businesswear</div>
        </a>
        <a href="/" className={styles.tile}>
          <picture>
            <source media="(max-width: 500px)" srcset={TileFifthSmall} />
            <img src={TileFifth} alt="" />
          </picture>
          <div className={styles.title}>Accessories</div>
        </a>
      </div>
      <div className={styles.parallax}>
        <h2>EXTRA -20%</h2>
        <div className={styles.title}>See more</div>
      </div>
    </div>
  );
};

export default Home;
