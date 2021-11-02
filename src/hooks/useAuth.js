import { useState, useEffect, createContext, useContext } from "react";
import { db } from "firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { saveUser } from "store/authUserSlice";

const auth = getAuth();
const provider = new GoogleAuthProvider();
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const userId = useSelector((state) => state.authUser.userId);
  const dispatch = useDispatch();
  const [uid, setUid] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const findUser = await getDoc(doc(db, `users`, userId));
        if (findUser.exists()) {
          setUid(userId);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      } catch (err) {
        setUid(undefined);
        dispatch(saveUser(""));
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    })();
  }, [userId]);

  const SignIn = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // console.log("result", result);
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // console.log("token", token);
        // The signed-in user info.
        const user = result.user;
        const { uid, displayName, email } = user;
        //save to firestore
        const findUser = await getDoc(doc(db, `users`, uid));
        if (findUser.exists()) {
          dispatch(saveUser({ uid, displayName, email }));
          return;
        }
        //if user logs in first time
        if (!findUser.exists()) {
          try {
            await setDoc(doc(db, "users", uid), {
              displayName,
              email,
              cart: [],
              viewedProducts: [],
            });
            dispatch(saveUser({ uid, displayName, email }));
          } catch (err) {
            console.log(err);
          }
        }
      })
      .catch((error) => {
        // // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // // ...
      });
  };

  const SignOut = async () => {
    auth
      .signOut()
      .then(() => {
        dispatch(saveUser(""));
      })
      .catch((error) => {
        console.log("An error happened.");
      });
  };

  return <AuthContext.Provider value={{ uid, SignIn, SignOut, loading }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
