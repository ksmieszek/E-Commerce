import { useAuth } from "hooks/useAuth";
import { db } from "firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import styles from "./PreviousOrder.module.scss";
import ContentTemplate from "templates/contentTemplate/ContentTemplate";
import Preview from "components/orderForm/preview/Preview";

const PreviousOrder = ({ match }) => {
  const { id: orderId } = match.params;
  const { uid } = useAuth();
  const [order, setOrder] = useState({});

  useEffect(() => {
    if (!uid) return;
    (async () => {
      const userOrdersIds = (await getDoc(doc(db, "users", uid))).data().orders;
      const findOrder = userOrdersIds.find((item) => item === orderId);
      if (!findOrder) window.location = "/404";
      const querySnapshot = await getDoc(doc(db, "orders", orderId));
      setOrder(querySnapshot.data());
    })();
  }, [uid]);

  return (
    <ContentTemplate>
      {Object.keys(order).length && (
        <div className={styles.wrapper}>
          <Preview
            cartItems={order.cart}
            shipment={order.shipment}
            cartValue={order.cartValue}
            total={order.totalValue}
            deliveryInfo={order.deliveryInfo}
          />
        </div>
      )}
    </ContentTemplate>
  );
};

export default PreviousOrder;
