import SortControl from "components/sortControl/SortControl";
import GridControl from "components/gridControl/GridControl";
import { useComponentPresence } from "hooks/useComponentPresence";
import styles from "./ProductsOverviewOptions.module.scss";

const ProductsOverview = () => {
  const { makeSidebarVisible } = useComponentPresence();

  return (
    <div className={styles.wrapper}>
      <div className={styles.filter__controls}>
        <button className={styles.filters__opener} onClick={() => makeSidebarVisible()}>
          FILTERS
        </button>
      </div>
      <div className={styles.sort__controls}>
        <GridControl />
        <SortControl />
      </div>
    </div>
  );
};

export default ProductsOverview;
