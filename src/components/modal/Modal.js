import styles from "./Modal.module.scss";
import CloseButton from "components/closeButton/CloseButton";
import { useComponentVisible } from "hooks/useComponentVisible";

const Modal = ({ children, title }) => {
  const { makeComponentInvisible } = useComponentVisible();

  return (
    <>
      ReactDom.createPortal(
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div>{title}</div>
          <CloseButton onClick={() => makeComponentInvisible()} />
        </div>
        <div>{children}</div>
      </div>
      , document.getElementById("modal-root") )
    </>
  );
};

export default Modal;
