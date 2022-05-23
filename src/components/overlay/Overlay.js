import { useComponentVisible } from "hooks/useComponentVisible";
import styles from "./Overlay.module.scss";
import { useViewportWidth } from "hooks/useViewportWidth";

const Overlay = ({ hideOnWidth }) => {
  const { isComponentVisible, makeComponentInvisible } = useComponentVisible();
  const viewportWidth = useViewportWidth();

  if (isComponentVisible) {
    document.body.style.maxHeight = "100%";
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.maxHeight = "unset";
    document.body.style.overflowY = "unset";
  }

  return (
    <>
      {(hideOnWidth === undefined || viewportWidth <= hideOnWidth) && (
        <div className={`${styles.overlay} ${isComponentVisible ? styles.show : ""}`} onClick={() => makeComponentInvisible()}></div>
      )}
    </>
  );
};

export default Overlay;
