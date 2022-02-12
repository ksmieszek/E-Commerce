import { useState, useEffect } from "react";
import Swiper from "components/swiper/Swiper";

const Suggestions = ({ products, product }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (product === null) return;
    const { collection, category, podcategory } = product;
    const sameProducts = [];
    const similarProducts = [];
    products.forEach((item) => {
      if (item.category.includes(...category) && item.collection.includes(...collection) && item !== product) {
        if (item.podcategory.includes(...podcategory)) {
          sameProducts.push(item);
          return;
        }
        similarProducts.push(item);
      }
    });

    if (sameProducts.length >= 5) setSuggestions(sameProducts.slice(0, 5));
    else setSuggestions([...sameProducts.slice(0, sameProducts.length), ...similarProducts.slice(0, 5 - sameProducts.length)]);
  }, [products, product]);

  return <Swiper items={suggestions} />;
};

export default Suggestions;
