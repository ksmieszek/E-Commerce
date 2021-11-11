import { useAuth } from "hooks/useAuth";
import { db } from "firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import styles from "./Orders.module.scss";
import ContentTemplate from "templates/contentTemplate/ContentTemplate";
import LackOfItemsInfo from "components/lackOfItemsInfo/LackOfItemsInfo";

const Orders = () => {
  const { uid, loading } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!uid) return;
    (async () => {
      const userOrdersIds = (await getDoc(doc(db, "users", uid))).data().orders;
      if (!userOrdersIds) return;
      const userOrders = [];
      await Promise.all(
        [...userOrdersIds].map(async (productId) => {
          const querySnapshot = await getDoc(doc(db, "orders", productId));
          const { id } = querySnapshot;
          const { date } = querySnapshot.data();
          const convertDate = new Date(date.seconds * 1000 + date.nanoseconds / 1000000);
          const [day, month, year] = [convertDate.getFullYear(), convertDate.getMonth() + 1, convertDate.getDate()];
          if (date !== undefined) userOrders.push({ ...querySnapshot.data(), date: `${day}/${month}/${year}`, id });
        })
      );
      setOrders(userOrders);
    })();
  }, [uid]);

  return (
    <ContentTemplate>
      <div className={styles.wrapper}>
        {uid ? (
          orders.length > 0 ? (
            <>
              <div className={styles.headers}>
                <div className={styles.header}>Date</div>
                <div className={styles.header}>Amount</div>
                <div className={styles.header}>Action</div>
              </div>
              <ul className={styles.list}>
                {orders.map((item, index) => (
                  <li className={styles.list__item} key={index}>
                    <div>{item.date}</div>
                    <div>{item.totalValue} PLN</div>
                    <div>
                      <a href={`order/${item.id}`}>Preview</a>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <LackOfItemsInfo text="You have not placed an order yet"></LackOfItemsInfo>
          )
        ) : (
          !loading && <Redirect to="/404" />
        )}
      </div>
    </ContentTemplate>
  );
};

export default Orders;
