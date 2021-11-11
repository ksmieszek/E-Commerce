import { useState, useEffect } from "react";
import { db } from "firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import Swiper from "components/swiper/Swiper";
import { useDispatch, useSelector } from "react-redux";
import { updateViewedProducts } from "store/unauthUserSlice";
import { useAuth } from "hooks/useAuth";

const RecentlyViewed = ({ product }) => {
  const [viewedProducts, setViewedProducts] = useState([]);
  const { uid, loading } = useAuth();
  const unauthUser = useSelector((state) => state.unauthUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (product === null || loading) return;
    (async () => {
      let viewedProductsIds;
      if (uid === undefined) viewedProductsIds = unauthUser.viewedProducts;
      else viewedProductsIds = (await getDoc(doc(db, "users", uid))).data().viewedProducts;
      //get products details
      (async () => {
        const viewedProductsDetails = [];
        await Promise.all(
          [...viewedProductsIds].map(async (productId) => {
            const querySnapshot = await getDoc(doc(db, "products", productId));
            const { frontImage, name, price } = querySnapshot.data();
            const productInfo = { id: productId, frontImage, name, price };
            //if we are on the product page that was already in, dont display that product
            if (productId !== product.id) viewedProductsDetails.push(productInfo);
          })
        );
        //limimt to 5 items
        setViewedProducts(viewedProductsDetails.slice(0, 5));
      })();

      //add product to viewed products
      //search for repetition
      const repetitionIndex = viewedProductsIds.findIndex((item) => item === product.id);
      //delete if exists
      if (repetitionIndex !== -1) viewedProductsIds.splice(repetitionIndex, 1);
      //add to table
      viewedProductsIds.unshift(product.id);
      //send data and limit to 6 elements in case we enter product page that was already in
      if (uid === undefined) dispatch(updateViewedProducts(viewedProductsIds.slice(0, 6)));
      else setDoc(doc(db, "users", uid), { viewedProducts: viewedProductsIds.slice(0, 6) }, { merge: true });
    })();
  }, [product, uid, loading]);

  return <Swiper items={viewedProducts} />;
};

export default RecentlyViewed;
