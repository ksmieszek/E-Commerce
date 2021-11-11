import { useDispatch, useSelector } from "react-redux";
import { gridValues, setGridClass } from "store/gridSlice";
import styles from "./GridControl.module.scss";

const GridControl = () => {
  const dispatch = useDispatch();
  const gridClass = useSelector((state) => state.grid.gridClass);

  return (
    <div className={`${styles.wrapper} ${styles[gridClass]}`}>
      {gridValues.map((grid, index) => (
        <button className={`${styles.grid__button} ${styles[grid.size]}`} key={index} onClick={() => dispatch(setGridClass(grid.styles))}>
          <grid.icon className={styles.grid__icon} />
        </button>
      ))}
    </div>
  );
};

export default GridControl;
