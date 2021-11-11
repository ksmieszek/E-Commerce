import { sortActions, changeSortKey } from "store/sortSlice";
import { useSelector, useDispatch } from "react-redux";
import styles from "./SortControl.module.scss";

const SortControl = () => {
  const dispatch = useDispatch();
  const sortKey = useSelector((state) => state.sort.sortMethodKey);

  return (
    <div className={styles.wrapper}>
      <button className={`${styles.list__opener} ${styles[`list__opener--narrow`]}`}>Sort</button>
      <button className={`${styles.list__opener} ${styles[`list__opener--wide`]}`}>{sortActions[sortKey]}</button>
      <div className={styles.list}>
        {Object.entries(sortActions).map(([key, value], index) => {
          return (
            <button
              key={index}
              className={`${styles.item} ${sortActions[sortKey] === sortActions[key] ? styles.selected : ""}`}
              onClick={() => dispatch(changeSortKey(key))}
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
