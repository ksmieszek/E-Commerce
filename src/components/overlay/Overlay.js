import { useComponentVisible } from "hooks/useComponentVisible";
import styles from "./Overlay.module.scss";

const Overlay = () => {
  const { isComponentVisible, makeComponentInvisible } = useComponentVisible();

  if (isComponentVisible) {
    document.body.style.maxHeight = "100%";
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.maxHeight = "unset";
    document.body.style.overflowY = "unset";
  }

  return <div className={`${styles.overlay} ${isComponentVisible ? styles.show : ""}`} onClick={() => makeComponentInvisible()}></div>;
};

export default Overlay;
