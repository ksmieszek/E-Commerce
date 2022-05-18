import styles from "./Modal.module.scss";
import Modal from "components/modal/Modal";
import Button from "components/button/Button";
import { ReactComponent as ShoppingBag } from "assets/icons/shopping-bag.svg";
import { useHistory } from "react-router-dom";
import { useComponentVisible } from "hooks/useComponentVisible";

const AddedToCartModal = () => {
  let history = useHistory();
  const { makeComponentInvisible } = useComponentVisible();

  return (
    <Modal>
      <div className={styles.modal__content}>
        <div className={styles.icon__wrapper}>
          <ShoppingBag className={styles.icon} />
        </div>
        <div className={styles.subtitle}>Product added to your cart</div>
        <div className={styles.buttons__wrapper}>
          <div className={styles.button}>
            <Button invert wide onClick={() => makeComponentInvisible()}>
              Continue shopping
            </Button>
          </div>
          <Button
            wide
            onClick={() => {
              makeComponentInvisible();
              history.push("/order");
            }}
          >
            Go to the cart
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddedToCartModal;
