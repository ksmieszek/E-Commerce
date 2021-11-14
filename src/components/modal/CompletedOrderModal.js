import styles from "./Modal.module.scss";
import Modal from "components/modal/Modal";
import { ReactComponent as Checkmark } from "assets/icons/checkmark.svg";
import { useAuth } from "hooks/useAuth";
import Hyperlink from "components/button/Hyperlink";

const CompletedOrderModal = ({ isModalOpen, setIsModalOpen }) => {
  const { uid } = useAuth();

  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <div className={styles.modal__content}>
        <div className={styles.icon__wrapper}>
          <Checkmark className={styles.icon} />
        </div>
        <div className={styles.subtitle}>Order Complete!</div>
        <div className={styles.text}>Thank you! Your order has been approved.</div>
        <div className={styles.buttons__wrapper}>
          {uid !== undefined && (
            <div className={styles.button}>
              <Hyperlink href="/orders">Check your orders</Hyperlink>
            </div>
          )}
          <Hyperlink href="/" invert>
            Return to store
          </Hyperlink>
        </div>
      </div>
    </Modal>
  );
};

export default CompletedOrderModal;
