import { useEffect, useState } from "react";
import { useNonInitialEffect } from "hooks/useNonInitialEffect";
import { useLocation } from "react-router";
import products from "assets/data/products";
import styles from "./Products.module.scss";
import ContentTemplate from "templates/contentTemplate/ContentTemplate";
import ProductsList from "components/productsList/ProductsList";
import ProductsForm from "components/productsForm/ProductsForm";
import ProductsOverviewOptions from "components/productsOverviewOptions/ProductsOverviewOptions";

const Products = () => {
  let location = useLocation();
  const [filteredProductsByPath, setFilteredProductsByPath] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (location.pathname === "") return;
    const filteredByPath = filterByPathname();
    setFilteredProductsByPath(filteredByPath);
    filterBySearchQuery(filteredByPath);
  }, [location.pathname]);

  useNonInitialEffect(() => {
    filterBySearchQuery(filteredProductsByPath);
  }, [location.search]);

  function getSearchQueryValues() {
    let priceArr = [];
    let categoryArr = [];
    if (location.search.length === 0) return { categoryArr, priceArr };
    const searchString = location.search.slice(1);
    searchString.split("&").forEach((item) => {
      const splited = item.split("=");
      if (splited.length < 2) window.location = "/404";
      if (splited[0] === "priceFrom" || splited[0] === "priceTo") priceArr.push(splited);
      else categoryArr.push(splited);
    });
    return { categoryArr, priceArr };
  }

  function filterByPathname() {
    const categoriesToMatch = location.pathname.split("/").slice(2);
    return products.filter((product) => {
      const allCatMatches = categoriesToMatch.filter((category) => product.categories.find((prodCat) => prodCat === category));
      return allCatMatches.length === categoriesToMatch.length;
    });
  }

  function filterBySearchQuery(filteredByPath) {
    const { categoryArr, priceArr } = getSearchQueryValues();
    if (priceArr.length > 0) filteredByPath = filterByPrice(filteredByPath, priceArr);
    if (categoryArr.length > 0) filteredByPath = filterByCategory(filteredByPath, categoryArr);
    setFilteredProducts(filteredByPath);
  }

  function filterByPrice(filteredByPath, priceArr) {
    const prices = {};
    priceArr.forEach((item) => {
      prices[item[0]] = item[1];
    });
    return filteredByPath.filter((product) => {
      const hasPriceFrom = prices.hasOwnProperty("priceFrom");
      const hasPriceTo = prices.hasOwnProperty("priceTo");
      const productPrice = parseFloat(product.price);
      const priceFrom = parseFloat(prices["priceFrom"]);
      const priceTo = parseFloat(prices["priceTo"]);
      if (hasPriceFrom && hasPriceTo) return productPrice > priceFrom && productPrice < priceTo;
      if (hasPriceFrom) return productPrice > priceFrom;
      if (hasPriceTo) return productPrice < priceTo;
    });
  }

  function filterByCategory(filteredByPath, categoryArr) {
    return filteredByPath.filter((product) => {
      let numOfCat = categoryArr.length;
      let numOfCatFound = 0;
      return (
        categoryArr.filter((searchGroup) => {
          const categoryValues = searchGroup[1].split(",");
          categoryValues.find((categoryValue) =>
            product.categories.find((prodCat) => {
              if (categoryValue === prodCat) {
                numOfCatFound++;
                return true;
              }
              return false;
            })
          );
          if (numOfCatFound === numOfCat) return true;
          else return false;
        }).length !== 0
      );
    });
  }

  return (
    <ContentTemplate>
      <div className={styles.wrapper}>
        <ProductsForm getSearchQueryValues={() => getSearchQueryValues()} filteredProductsByPath={filteredProductsByPath} />
        <div>
          <ProductsOverviewOptions />
          <ProductsList filteredProducts={filteredProducts} />
        </div>
      </div>
    </ContentTemplate>
  );
};

export default Products;
