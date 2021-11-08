import styles from "./Modal.module.scss";
import ReactDom from "react-dom";
import { useComponentPresence } from "hooks/useComponentPresence";
import CloseButton from "components/closeButton/CloseButton";
import { useEffect } from "react";
import { useNonInitialEffect } from "hooks/useNonInitialEffect";

const Modal = ({ isModalOpen, setIsModalOpen, children, title }) => {
  const { isComponentVisible, makeComponentVisible, makeComponentInvisible } = useComponentPresence();

  useEffect(() => {
    if (isModalOpen) makeComponentVisible();
    else makeComponentInvisible();

    return () => makeComponentInvisible();
  }, [isModalOpen]);

  useNonInitialEffect(() => {
    setIsModalOpen(isComponentVisible);
  }, [isComponentVisible]);

  return (
    <>
      {isComponentVisible &&
        ReactDom.createPortal(
          <div className={styles.wrapper}>
            <div className={styles.header}>
              <div>{title}</div>
              <CloseButton onClick={() => makeComponentInvisible()} />
            </div>
            <div>{children}</div>
          </div>,
          document.getElementById("modal-root")
        )}
    </>
  );
};

export default Modal;
