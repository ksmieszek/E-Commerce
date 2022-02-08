import { useState, useEffect, createContext, useContext } from "react";
import { db } from "firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { saveUnauthPersOrderData } from "store/unauthUserSlice";

const auth = getAuth();
const provider = new GoogleAuthProvider();
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const unauthUser = useSelector((state) => state.unauthUser);
  const dispatch = useDispatch();
  const [uid, setUid] = useState(undefined);
  const [orderPersData, setOrderPersData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const observer = auth.onAuthStateChanged(async (user) => {
      if (user !== null) {
        const findUser = await getDoc(doc(db, `users`, user.uid));
        if (!findUser.exists()) {
          SignOut();
          return;
        }
        setUid(user.uid);
        setOrderPersData(findUser.data().orderPersData);
      } else {
        setUid(undefined);
        setOrderPersData(unauthUser.orderPersData);
      }
      setLoading(false);
    });
    return observer;
  }, []);

  const SignIn = () => {
    provider.setCustomParameters({ prompt: "select_account" });
    signInWithPopup(auth, provider).then(async (result) => {
      setLoading(true);
      const uid = result.user.uid;
      const findUser = await getDoc(doc(db, `users`, uid));
      //if user logs in first time
      if (!findUser.exists()) {
        await setDoc(doc(db, "users", uid), {
          cart: [],
          orderPersData: {},
          viewedProducts: [],
          orders: [],
          email: result.user.email,
          roles: { admin: false },
        });
        window.location = "/";
      } else {
        window.location = "/";
      }
    });
  };

  const SignOut = async () => {
    auth.signOut().then(() => (window.location = "/"));
  };

  const savePersonalOrderData = () => {
    if (uid === undefined) dispatch(saveUnauthPersOrderData(orderPersData));
    else
      updateDoc(doc(db, "users", uid), {
        orderPersData,
      });
  };

  return (
    <AuthContext.Provider value={{ uid, SignIn, SignOut, orderPersData, setOrderPersData, savePersonalOrderData, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
