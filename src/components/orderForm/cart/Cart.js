import { useEffect, useState } from "react";
import { useCart } from "hooks/useCart";
import styles from "./Cart.module.scss";
import { Link } from "react-router-dom";

const Cart = ({ editable = true, setDisableNextStep }) => {
  const { userCart, increaseQuantity, decreaseQuantity, deleteFromCart, fetchAllCartProductsInfo, getCartValue } = useCart();
  const [cartWithAllProdInfo, setCartWithAllProdInfo] = useState([]);
  const [cartValue, setCartValue] = useState(0);

  useEffect(() => {
    (async () => {
      const prodInfo = await fetchAllCartProductsInfo();
      setCartWithAllProdInfo(prodInfo);
      const cartValueInfo = await getCartValue();
      setCartValue(cartValueInfo);
    })();

    if (editable === false) return;
    if (userCart.length > 0) setDisableNextStep(false);
    else setDisableNextStep(true);
  }, [userCart]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.product__list}>
        {cartWithAllProdInfo.map(({ idCartProduct, id, frontImage, name, price, quantity, size }, index) => {
          return (
            <div key={index} className={styles.product}>
              <Link to={`/product/${id}`} className={styles.product__image}>
                <img src={frontImage} alt="" />
              </Link>
              <div className={`${styles.product__details} ${!editable ? styles.preview : ""}`}>
                <div className={styles[`product__section--top`]}>
                  <div className={styles.product__info}>
                    <Link to={`/product/${id}`} className={styles.product__name}>
                      {name}
                    </Link>
                    <div className={styles.product__size}>Size: {size}</div>
                  </div>
                  {editable && (
                    <button className={styles.product__remove} onClick={() => deleteFromCart(idCartProduct)}>
                      del
                    </button>
                  )}
                </div>
                <div className={`${styles[`product__section--bottom`]} ${!editable ? styles.preview : ""}`}>
                  <div className={styles.product__amount}>
                    {editable ? (
                      <>
                        <button className={styles[`product__quantity--subtract`]} onClick={() => decreaseQuantity(idCartProduct)}></button>
                        <div className={styles[`product__quantity--value`]}>{quantity}</div>
                        <button className={styles[`product__quantity--add`]} onClick={() => increaseQuantity(idCartProduct)}></button>
                      </>
                    ) : (
                      <>
                        <span className={styles.row__title}>Amount:</span>
                        {quantity}
                      </>
                    )}
                  </div>
                  <div>
                    {!editable && <span className={styles.row__title}>Price:</span>}PLN {(price * quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.subtotal}>
        <div>PRODUCTS PRICE:</div>
        <div className={styles.subtotal__value}>PLN {cartValue}</div>
      </div>
    </div>
  );
};

export default Cart;
