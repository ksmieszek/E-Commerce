import styles from "./Modal.module.scss";
import Modal from "components/modal/Modal";
import Button from "components/button/Button";
import { ReactComponent as Checkmark } from "assets/icons/checkmark.svg";

const CompletedOrderModal = ({ isModalOpen, setIsModalOpen }) => {
  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <div className={styles.modal__content}>
        <div className={styles.icon__wrapper}>
          <Checkmark className={styles.icon} />
        </div>
        <div className={styles.subtitle}>Order Complete!</div>
        <div className={styles.text}>Thank you! Your order has been approved.</div>
        <div className={styles.buttons__wrapper}>
          <Button onClick={() => (window.location = "/")}>Return to store</Button>
        </div>
      </div>
    </Modal>
  );
};

export default CompletedOrderModal;
