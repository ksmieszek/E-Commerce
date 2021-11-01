import styles from "./ProductsList.module.scss";

const ProductsList = ({ children }) => {
  return (
    <main className={styles.products__list}>
      {children.map((item, index) => {
        return (
          <div key={index} className={styles.product}>
            <div className={styles.product__images}>
              <img className={styles.image__front} src={item.frontImage} alt="" />
              <img className={styles.image__back} src={item.backImage} alt="" />
            </div>
            <div>{item.name}</div>
            <div>{item.price}</div>
          </div>
        );
      })}
    </main>
  );
};

export default ProductsList;
