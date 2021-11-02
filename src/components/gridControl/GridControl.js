import { useDispatch, useSelector } from "react-redux";
import { gridValues, setGridClass } from "store/gridSlice";
import styles from "./GridControl.module.scss";

const GridControl = () => {
  const dispatch = useDispatch();
  const gridClass = useSelector((state) => state.grid.gridClass);

  return (
    <div className={`${styles.wrapper} ${styles[gridClass]}`}>
      {gridValues.map((item, index) => (
        <div className={`${styles.gridIcon} ${styles[item.size]}`} key={index} onClick={() => dispatch(setGridClass(item.styles))}>
          {item.image}
        </div>
      ))}
    </div>
  );
};

export default GridControl;
