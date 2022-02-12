import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useCart } from "hooks/useCart";
import { db } from "firebase";
import { collection, getDocs } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./Product.module.scss";
import ContentTemplate from "templates/contentTemplate/ContentTemplate";
import ImageSlider from "components/imageSlider/ImageSlider";
import Suggestions from "components/suggestions/Suggestions";
import RecentlyViewed from "components/recentlyViewed/RecentlyViewed";
import Button from "components/button/Button";
import AddedToCartModal from "components/modal/AddedToCartModal";
import { ReactComponent as Arrow } from "assets/icons/arrow.svg";

const schema = yup.object().shape({
  id: yup.string().trim().required(),
  size: yup.mixed().oneOf(["S", "M", "L", "XL"]).required(),
  quantity: yup.number().positive().integer().required().typeError("Quantity must be a digit"),
});

const Product = ({ match }) => {
  const { addToCart } = useCart();
  const { id: UrlProductId } = match.params;
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [sliderImages, setSliderImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hideRecentlyViewed, setHideRecentlyViewed] = useState(true);
  let history = useHistory();

  useEffect(() => {
    (async () => {
      const products = [];
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.forEach((doc) => products.push(Object.assign(doc.data(), { id: doc.id })));
      setProducts(products);
      const product = products.find((item) => item.id === UrlProductId);
      if (product === undefined) {
        history.push("/404");
        return;
      }
      setProduct(product);
      const { frontImage, backImage, images } = product;
      setSliderImages([frontImage, ...images, backImage]);
    })();
  }, [UrlProductId]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      id: UrlProductId,
      size: undefined,
      quantity: 1,
    },
  });

  const onSubmit = (data) => {
    addToCart(data);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful]);

  return (
    <ContentTemplate>
      <div className={styles.wrapper}>
        <div className={styles.categories__links}>
          <a href={`/products/${product?.collection}`}>{product?.collection}</a>
          <Arrow className={styles.arrow} />
          <a href={`/products/${product?.collection}/${product?.category}`}>{product?.category}</a>
          <Arrow className={styles.arrow} />
          <span>{product?.name}</span>
        </div>
        <main className={styles.product__wrapper}>
          <ImageSlider sliderImages={sliderImages} />
          <div className={styles.product__properties}>
            <p className={styles.product__name}>{product?.name}</p>
            <p className={styles.product__price}>{product?.price} PLN</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.sizes}>
                Size: {watch("size")}
                <div className={styles.sizes__list}>
                  {product?.sizes.map((item, index) => (
                    <div key={index} className={`${styles.size} ${watch("size") === item ? styles.active : ""}`}>
                      <input type="radio" name="size"></input>
                      <label onClick={() => setValue("size", item, { shouldValidate: true })}>{item}</label>
                    </div>
                  ))}
                </div>
                <p className={styles.invalid__message}>{errors?.size?.message}</p>
              </div>
              <div className={styles.final__row}>
                <input className={styles.quantity} type="number" {...register("quantity")} />
                <Button type="submit" wide>
                  Add to cart
                </Button>
              </div>
              <p className={styles.invalid__message}>{errors?.quantity?.message}</p>
            </form>
          </div>
        </main>
        <section className={styles.more__products}>
          <h2>Similar styles</h2>
          <Suggestions products={products} product={product} />
        </section>
        <section className={`${styles.more__products} ${hideRecentlyViewed ? styles.hide : ""}`}>
          <h2>Your recently viewed products</h2>
          <RecentlyViewed product={product} setHideRecentlyViewed={setHideRecentlyViewed} />
        </section>
      </div>
      {isModalOpen && <AddedToCartModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}></AddedToCartModal>}
    </ContentTemplate>
  );
};

export default Product;
