import styles from "./Modal.module.scss";
import Modal from "components/modal/Modal";
import Button from "components/button/Button";
import { ReactComponent as ShoppingBag } from "assets/icons/shopping-bag.svg";
import { useHistory } from "react-router-dom";

const AddedToCartModal = ({ isModalOpen, setIsModalOpen }) => {
  let history = useHistory();

  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <div className={styles.modal__content}>
        <div className={styles.icon__wrapper}>
          <ShoppingBag className={styles.icon} />
        </div>
        <div className={styles.subtitle}>Product added to your cart</div>
        <div className={styles.buttons__wrapper}>
          <div className={styles.button}>
            <Button invert wide onClick={() => setIsModalOpen(false)}>
              Continue shopping
            </Button>
          </div>
          <div className={styles.button}>
            <Button
              wide
              onClick={() => {
                setIsModalOpen(false);
                history.push("/order");
              }}
            >
              Go to the cart
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddedToCartModal;
