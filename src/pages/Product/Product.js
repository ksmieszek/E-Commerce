import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { db } from "firebase";
import { collection, getDocs } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./Product.module.scss";
import ContentTemplate from "templates/contentTemplate/ContentTemplate";
import ImageSlider from "components/imageSlider/ImageSlider";
import Button from "components/button/Button";

const schema = yup.object().shape({
  id: yup.string().trim().required(),
  size: yup.mixed().oneOf(["S", "M", "L", "XL"]).required(),
  quantity: yup.number().positive().integer().required(),
});

const Product = ({ match }) => {
  const { id: UrlProductId } = match.params;
  const [product, setProduct] = useState(null);
  const [sliderImages, setSliderImages] = useState([]);
  let history = useHistory();

  useEffect(() => {
    (async () => {
      const products = [];
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.forEach((doc) => products.push(Object.assign(doc.data(), { id: doc.id })));
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

  const { register, handleSubmit, setValue, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      id: UrlProductId,
      size: undefined,
      quantity: 1,
    },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <ContentTemplate>
      <div className={styles.wrapper}>
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
                    <div
                      className={`${styles.size} ${watch("size") === item ? styles.active : ""}`}
                      key={index}
                      onClick={() => setValue("size", item)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.final__row}>
                <input className={styles.quantity} type="number" {...register("quantity")} />
                <Button type="submit" wide>
                  Add to cart
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </ContentTemplate>
  );
};

export default Product;
