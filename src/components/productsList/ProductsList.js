import { useSelector } from "react-redux";
import styles from "./ProductsList.module.scss";
import { useSort } from "hooks/useSort";
import { Link } from "react-router-dom";

const ProductsList = ({ filteredProducts }) => {
  const gridClass = useSelector((state) => state.grid.gridClass);
  const sortKey = useSelector((state) => state.sort.sortMethodKey);
  const sortedProducts = useSort(filteredProducts, sortKey);

  return (
    <main className={`${styles.products__list} ${styles[gridClass]}`}>
      {sortedProducts.map((item, index) => (
        <div key={index} className={styles.product}>
          <div className={styles.product__images}>
            <img className={styles.image__front} src={item.frontImage} alt="" />
            <img className={styles.image__back} src={item.backImage} alt="" />
          </div>
          <div className={styles.product__name}>
            <div className={styles.name}>{item.name}</div>
          </div>
          <div className={styles.product__price}>{item.price} PLN</div>
        </div>
      ))}
    </main>
  );
};

export default ProductsList;
