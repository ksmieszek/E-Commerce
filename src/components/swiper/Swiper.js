import { useState, useEffect } from "react";
import styles from "./Swiper.module.scss";

const Swiper = ({ items }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(items);
  }, [items]);

  return (
    <div className={styles.swiper}>
      {products.map((item) => (
        <a href={`/product/${item.id}`} key={item.id} className={styles.slide}>
          <img src={item.frontImage} alt="" />
          <div className={styles.product__name}>
            <div className={styles.name}>{item.name}</div>
          </div>
          <div className={styles.product__price}>{item.price} PLN</div>
        </a>
      ))}
    </div>
  );
};

export default Swiper;
