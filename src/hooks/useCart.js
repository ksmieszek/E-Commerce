import { useState, useEffect, createContext, useContext } from "react";
import { db } from "firebase";
import { getDoc, doc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { unauthAddToCart, unauthIncreaseQuantity, unauthDecreaseQuantity, unauthDeleteFromCart, unauthResetCart } from "store/unauthUserSlice";
import { useNonInitialEffect } from "./useNonInitialEffect";

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const dispatch = useDispatch();
  const unauthCart = useSelector((state) => state.unauthUser.cart);
  const [userCart, setUserCart] = useState([]);

  useEffect(() => {
    setUserCart(unauthCart);
  }, []);

  //update userCart when redux cart change
  useNonInitialEffect(() => {
    setUserCart(unauthCart);
  }, [unauthCart]);

  const addToCart = async (product) => {
    dispatch(unauthAddToCart(product));
  };

  const increaseQuantity = async (productCartId) => {
    dispatch(unauthIncreaseQuantity(productCartId));
  };

  const decreaseQuantity = async (productCartId) => {
    dispatch(unauthDecreaseQuantity(productCartId));
  };

  const deleteFromCart = async (productCartId) => {
    dispatch(unauthDeleteFromCart(productCartId));
  };

  const resetCart = async () => {
    dispatch(unauthResetCart());
  };

  const fetchAllCartProductsInfo = async () => {
    const cartCopy = [];
    await (async () => {
      await Promise.all(
        [...userCart].map(async (item) => {
          const querySnapshot = await getDoc(doc(db, "products", item.id));
          cartCopy.push({ ...querySnapshot.data(), ...item });
        })
      );
    })();
    return cartCopy;
  };

  const getCartValue = async () => {
    let cartValue = 0;
    await (async () => {
      await Promise.all(
        [...userCart].map(async (item) => {
          const querySnapshot = await getDoc(doc(db, "products", item.id));
          const { price } = querySnapshot.data();
          cartValue = cartValue + price * item.quantity;
        })
      );
    })();
    return cartValue.toFixed(2);
  };

  return (
    <CartContext.Provider
      value={{
        userCart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        deleteFromCart,
        resetCart,
        fetchAllCartProductsInfo,
        getCartValue,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
