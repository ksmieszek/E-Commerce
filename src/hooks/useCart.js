import { useState, useEffect, createContext, useContext } from "react";
import { db } from "firebase";
import { updateDoc, getDoc, doc, setDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useAuth } from "./useAuth";
import { useDispatch, useSelector } from "react-redux";
import { unauthAddToCart, unauthIncreaseQuantity, unauthDecreaseQuantity, unauthDeleteFromCart, unauthResetCart } from "store/unauthUserSlice";
import { useNonInitialEffect } from "./useNonInitialEffect";

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { uid, loading } = useAuth();
  const unauthCart = useSelector((state) => state.unauthUser.cart);
  const [userCart, setUserCart] = useState([]);

  useEffect(() => {
    if (loading === false)
      if (uid === undefined) setUserCart(unauthCart);
      else
        (async () => {
          const firestoreCart = await fetchCart();
          setUserCart(firestoreCart);
        })();
  }, [uid, loading]);

  //update userCart when redux cart change
  useNonInitialEffect(() => {
    setUserCart(unauthCart);
  }, [unauthCart]);

  const fetchCart = async () => {
    const docSnap = await getDoc(doc(db, `users`, uid));
    return docSnap.data().cart;
  };

  const addToCart = async (product) => {
    if (uid === undefined) {
      dispatch(unauthAddToCart(product));
      return;
    }
    const { id, size, quantity } = product;
    const productIndexInCart = userCart.findIndex((item) => item.id === id && item.size === size);
    if (productIndexInCart !== -1) {
      const cartCopy = [...userCart];
      cartCopy[productIndexInCart].quantity = parseInt(cartCopy[productIndexInCart].quantity) + parseInt(quantity);
      updateDoc(doc(db, "users", uid), {
        cart: cartCopy,
      }).then(() => {
        setUserCart(cartCopy);
      });
    } else {
      const idCartProduct = Date.now();
      const newProduct = { idCartProduct, id, size, quantity: parseInt(quantity) };
      try {
        await setDoc(
          doc(db, "users", uid),
          {
            cart: arrayUnion(newProduct),
          },
          { merge: true }
        ).then(() => {
          setUserCart([...userCart, newProduct]);
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const increaseQuantity = async (productCartId) => {
    if (uid === undefined) {
      dispatch(unauthIncreaseQuantity(productCartId));
      return;
    }
    const productIndexInCart = userCart.findIndex((item) => item.idCartProduct === productCartId);
    const cartCopy = [...userCart];
    cartCopy[productIndexInCart].quantity += 1;
    updateDoc(doc(db, "users", uid), {
      cart: cartCopy,
    }).then(() => {
      setUserCart(cartCopy);
    });
  };

  const decreaseQuantity = async (productCartId) => {
    if (uid === undefined) {
      dispatch(unauthDecreaseQuantity(productCartId));
      return;
    }
    const productIndexInCart = userCart.findIndex((item) => item.idCartProduct === productCartId);
    if (userCart[productIndexInCart].quantity === 1) {
      deleteFromCart(productCartId);
    } else {
      const cartCopy = [...userCart];
      cartCopy[productIndexInCart].quantity -= 1;
      updateDoc(doc(db, "users", uid), {
        cart: cartCopy,
      }).then(() => {
        setUserCart(cartCopy);
      });
    }
  };

  const deleteFromCart = async (productCartId) => {
    if (uid === undefined) {
      dispatch(unauthDeleteFromCart(productCartId));
      return;
    }
    const productIndexInCart = userCart.findIndex((item) => item.idCartProduct === productCartId);
    updateDoc(doc(db, "users", uid), {
      cart: arrayRemove(userCart[productIndexInCart]),
    }).then(() => {
      const cartCopy = [...userCart];
      cartCopy.splice(productIndexInCart, 1);
      setUserCart(cartCopy);
    });
  };

  const resetCart = async () => {
    if (uid === undefined) {
      dispatch(unauthResetCart());
      return;
    }
    updateDoc(doc(db, "users", uid), {
      cart: [],
    }).then(() => {
      setUserCart([]);
    });
  };

  const fetchAllCartProductsInfo = async (items = userCart) => {
    const cartCopy = [];
    await (async () => {
      await Promise.all(
        [...items].map(async (item) => {
          const querySnapshot = await getDoc(doc(db, "products", item.id));
          cartCopy.push({ ...querySnapshot.data(), ...item });
        })
      );
    })();
    return cartCopy;
  };

  const getCartValue = async (items = userCart) => {
    let cartValue = 0;
    await (async () => {
      await Promise.all(
        [...items].map(async (item) => {
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
        fetchCart,
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
