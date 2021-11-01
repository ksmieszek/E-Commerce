import { useOverlayContext } from "providers/OverlayProvider";
import styles from "./Overlay.module.scss";

const Overlay = () => {
  const { isOverlayVisible, makeOverlayInvisible } = useOverlayContext();

  if (isOverlayVisible) {
    document.body.style.maxHeight = "100%";
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.maxHeight = "unset";
    document.body.style.overflowY = "unset";
  }

  return <div className={`${styles.overlay} ${isOverlayVisible ? styles.show : ""}`} onClick={() => makeOverlayInvisible()}></div>;
};

export default Overlay;
