import { useOverlayContext } from "providers/OverlayProvider";
import "./Overlay.scss";

const Overlay = () => {
  const { isOverlayVisible, makeOverlayInvisible } = useOverlayContext();

  if (isOverlayVisible) {
    document.body.style.maxHeight = "100%";
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.maxHeight = "unset";
    document.body.style.overflowY = "unset";
  }

  return <div className={`overlay ${isOverlayVisible ? `show` : ``}`} onClick={() => makeOverlayInvisible()}></div>;
};

export default Overlay;
