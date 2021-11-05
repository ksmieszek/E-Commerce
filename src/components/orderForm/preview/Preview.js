import { useAuth } from "hooks/useAuth";
import Cart from "components/orderForm/cart/Cart";
import RadioInput from "../radioInput/RadioInput";
import styles from "./Preview.module.scss";

const Preview = ({ cartValue, shipment, total, cartItems, deliveryInfo }) => {
  const { orderPersData } = useAuth();

  return (
    <div className={styles.wrapper}>
      <div className={styles.section}>
        <div className={styles.section__title}>Order products</div>
        <Cart cartItems={cartItems} />
      </div>
      <div className={styles.section}>
        <div className={styles.section__title}>Delivery address</div>
        <div>
          {deliveryInfo?.firstName || orderPersData.firstName} {deliveryInfo?.surname || orderPersData.surname}
        </div>
        <div>
          {deliveryInfo?.street || orderPersData.street} {deliveryInfo?.no || orderPersData.no}
        </div>
        <div>
          {deliveryInfo?.postalCode || orderPersData.postalCode} {deliveryInfo?.city || orderPersData.city}
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.section__title}>Shipping</div>
        <RadioInput editable={false} item={shipment} />
      </div>
      <div className={styles.section}>
        <div className={styles.section__title}>Costs</div>
        <div className={styles.row}>
          <div>Subtotal</div>
          <div>{cartValue} PLN</div>
        </div>
        <div className={styles.row}>
          <div>Shipping costs</div>
          <div>{shipment.price} PLN</div>
        </div>
        <hr></hr>
        <div className={`${styles.row} ${styles.total}`}>
          <div>Total</div>
          <div>{total} PLN</div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
