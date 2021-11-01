import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import styles from "./ProductsForm.module.scss";
import CloseButton from "components/closeButton/CloseButton";
import { useComponentPresence } from "hooks/useComponentPresence";
import Button from "components/button/Button";

const ProductsForm = ({ getSearchQueryValues, filteredProductsByPath }) => {
  let history = useHistory();
  const [podcategories, setPodcategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const formRef = useRef(null);
  const { isSidebarVisible, makeSidebarVisible, makeSidebarInvisible } = useComponentPresence();

  //get data to generate form
  useEffect(() => {
    setPodcategories(getProductsCategories("podcategory"));
    setColors(getProductsCategories("colors"));
    setSizes(getProductsCategories("sizes"));
  }, [filteredProductsByPath]);

  //update form inputs by search query values on render
  useEffect(() => {
    const { categoryArr, priceArr } = getSearchQueryValues();
    priceArr.forEach((item) => {
      formRef.current.querySelector(`input[data-category=${item[0]}]`).value = item[1];
    });
    formRef.current.querySelectorAll("input[type=checkbox]").forEach((checkbox) => {
      categoryArr.forEach((searchGroup) => {
        const categoryName = searchGroup[0];
        const categoryValues = [searchGroup[1].split(",")];
        categoryValues.forEach((categoryValue) => {
          if (categoryValue.find((query) => checkbox.dataset.category === categoryName && checkbox.dataset.query === query)) checkbox.checked = true;
        });
      });
    });
  }, [podcategories, sizes, colors]);

  function getProductsCategories(categoryArray) {
    const storeEntries = {};
    filteredProductsByPath.map((item) => {
      item[categoryArray].forEach((item) => {
        storeEntries[item] = (storeEntries[item] || 0) + 1;
      });
    });
    return Object.entries(storeEntries);
  }

  function updateURL(activeCheckboxes, priceRange) {
    const searchQueryParams = {};
    activeCheckboxes.forEach((item) => {
      searchQueryParams[item.dataset.category] = Array.isArray(searchQueryParams[item.dataset.category])
        ? [...searchQueryParams[item.dataset.category], item.dataset.query]
        : [item.dataset.query];
    });
    priceRange.forEach((item) => {
      searchQueryParams[item.dataset.category] = Array.isArray(searchQueryParams[item.dataset.category])
        ? [...searchQueryParams[item.dataset.category], item.value]
        : [item.value];
    });
    let searchQuery = "";
    for (const property in searchQueryParams) {
      searchQuery += `&${property}=${searchQueryParams[property]}`;
    }
    searchQuery = `?${searchQuery.slice(1)}`;
    history.push(searchQuery);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const activeCheckboxes = formRef.current.querySelectorAll("input[type=checkbox]:checked");
    const priceRange = [...formRef.current.querySelectorAll("input[data-category^=price]")].filter((item) => item.value !== "");
    if (activeCheckboxes.length === 0 && priceRange.length === 0) {
      history.push(`?`);
      return;
    }
    updateURL(activeCheckboxes, priceRange);
    makeSidebarInvisible();
  }

  function handleUnfold(e) {
    e.currentTarget.classList.toggle("unfold");
  }

  function generateCheckboxes(name, array, type, displayQuantity) {
    return (
      <div className={styles.filter}>
        <div className={styles.filter__name} onClick={(e) => handleUnfold(e)}>
          {name}
        </div>
        <div className={styles.filter__options}>
          {array.map((item, index) => (
            <div key={index} className={styles.category}>
              <label className={styles.category__name}>
                <span>
                  {item[0]}
                  {displayQuantity && <sup className={styles.category__quantity}>({item[1]})</sup>}
                </span>
                <input type="checkbox" data-category={type} data-query={item[0]} className={styles.category__checkmark} />
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <aside className={`${styles.products__form} ${isSidebarVisible ? styles.open : ""}`}>
      <div className={styles.openers}>
        <button className={styles.filter__opener} onClick={() => makeSidebarVisible()}>
          FILTERS
        </button>
        {/* <button>sort</button> */}
      </div>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.header__title}>Filters</div>
          <CloseButton onClick={() => makeSidebarInvisible()} hideOnWide />
        </div>

        <form onSubmit={handleFormSubmit} ref={formRef} className={styles.filters}>
          <div className={styles.filters__list}>
            <div className={styles.filter}>
              <div className={styles.filter__name} onClick={(e) => handleUnfold(e)}>
                Price
              </div>
              <div className={`${styles.filter__options} ${styles[`filter__options--price`]}`}>
                <input className={styles.price} type="text" data-category="price-from" placeholder="from" />
                -
                <input className={styles.price} type="text" data-category="price-to" placeholder="to" />
              </div>
            </div>
            {podcategories.length > 0 && <>{generateCheckboxes("Podcategories", podcategories, "type", true)}</>}
            {sizes.length > 0 && <>{generateCheckboxes("Sizes", sizes, "size")}</>}
            {colors.length > 0 && <>{generateCheckboxes("Colors", colors, "color")}</>}
          </div>

          <div className={styles.filters__button}>
            <Button wide rubik type="submit">
              Filter
            </Button>
          </div>
        </form>
      </div>
    </aside>
  );
};

export default ProductsForm;
