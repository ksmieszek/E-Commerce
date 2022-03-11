import { useSelector } from "react-redux";
import styles from "./ProductsList.module.scss";
import { useSort } from "hooks/useSort";
import { Link } from "react-router-dom";
import LackOfItemsInfo from "components/lackOfItemsInfo/LackOfItemsInfo";
import { SortContext } from "pages/Products/Products";
import { useContext } from "react";

const ProductsList = ({ filteredProducts }) => {
  const gridClass = useSelector((state) => state.grid.gridClass);
  const { sortMethod } = useContext(SortContext);
  const sortedProducts = useSort(filteredProducts, sortMethod);

  return (
    <main>
      {sortedProducts.length > 0 ? (
        <div className={`${styles.products__list} ${styles[gridClass]}`}>
          {sortedProducts.map((item) => (
            <Link to={`/product/${item.id}`} key={item.id} className={styles.product}>
              <div className={styles.product__images}>
                <img className={styles.image__front} src={item.frontImage} alt="" />
                <img className={styles.image__back} src={item.backImage} alt="" />
              </div>
              <div className={styles.product__name}>
                <div className={styles.name}>{item.name}</div>
              </div>
              <div className={styles.product__price}>{item.price} PLN</div>
            </Link>
          ))}
        </div>
      ) : (
        <LackOfItemsInfo text="There are no products matching the criteria." showHyperlink={false}></LackOfItemsInfo>
      )}
    </main>
  );
};

export default ProductsList;
