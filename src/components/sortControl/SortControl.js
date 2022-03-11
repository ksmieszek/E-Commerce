import styles from "./SortControl.module.scss";
import { sortActions } from "hooks/useSort";
import { SortContext } from "pages/Products/Products";
import { useContext } from "react";

const SortControl = () => {
  const { sortMethod, setSortMethod } = useContext(SortContext);

  return (
    <div className={styles.wrapper}>
      <button className={`${styles.list__opener} ${styles[`list__opener--narrow`]}`}>Sort</button>
      <button className={`${styles.list__opener} ${styles[`list__opener--wide`]}`}>{sortMethod}</button>
      <div className={styles.list}>
        {Object.entries(sortActions).map(([key, value], index) => {
          return (
            <button
              key={index}
              className={`${styles.item} ${sortMethod === sortActions[key] ? styles.selected : ""}`}
              onClick={() => setSortMethod(sortActions[key])}
            >
              {value}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SortControl;
