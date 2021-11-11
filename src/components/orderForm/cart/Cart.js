import { useEffect, useState } from "react";
import { useCart } from "hooks/useCart";
import styles from "./Cart.module.scss";
import { Link } from "react-router-dom";
import { ReactComponent as TrashCanIcon } from "assets/icons/trash-can.svg";

const Cart = ({ setDisableNextStep, cartItems }) => {
  const { userCart, increaseQuantity, decreaseQuantity, deleteFromCart, fetchAllCartProductsInfo, getCartValue } = useCart();
  const [cartWithAllProdInfo, setCartWithAllProdInfo] = useState([]);
  const [cartValue, setCartValue] = useState(0);

  useEffect(() => {
    const cart = cartItems || userCart;
    (async () => {
      const prodInfo = await fetchAllCartProductsInfo(cart);
      setCartWithAllProdInfo(prodInfo);
      const cartValueInfo = await getCartValue(cart);
      setCartValue(cartValueInfo);
    })();

    if (!setDisableNextStep) return;
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
              <div className={`${styles.product__details} ${!setDisableNextStep ? styles.preview : ""}`}>
                <div className={styles[`product__section--top`]}>
                  <div className={styles.product__info}>
                    <Link to={`/product/${id}`} className={styles.product__name}>
                      {name}
                    </Link>
                    <div className={styles.product__size}>Size: {size}</div>
                  </div>
                  {setDisableNextStep && (
                    <button className={styles.product__remove} onClick={() => deleteFromCart(idCartProduct)}>
                      <TrashCanIcon />
                    </button>
                  )}
                </div>
                <div className={`${styles[`product__section--bottom`]} ${!setDisableNextStep ? styles.preview : ""}`}>
                  <div className={styles.product__amount}>
                    {setDisableNextStep ? (
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
                    {!setDisableNextStep && <span className={styles.row__title}>Price:</span>}PLN {(price * quantity).toFixed(2)}
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
