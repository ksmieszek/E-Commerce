import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useComponentVisible } from "hooks/useComponentVisible";
import CloseButton from "components/closeButton/CloseButton";
import styles from "./ProductsForm.module.scss";
import { useForm, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/button/Button";

const schema = yup.object().shape({
  priceFrom: yup
    .number()
    .positive()
    .min(0, '"Price from" must be greater than or equal to 0')
    .nullable()
    .notRequired()
    .transform(function (value, originalvalue) {
      return this.isType(value) ? value : null;
    }),
  priceTo: yup
    .number()
    .nullable()
    .notRequired()
    .min(yup.ref("priceFrom"), '"Price to" must be greater than or equal to "Price from"')
    .transform(function (value, originalvalue) {
      return this.isType(value) ? value : null;
    }),
});

const ProductsForm = ({ getSearchQueryValues, filteredProductsByPath }) => {
  let history = useHistory();
  const [productsPodcategories, setProductsPodcategories] = useState([]);
  const [productsColors, setProductsColors] = useState([]);
  const [productsSizes, setProductsSizes] = useState([]);
  const { isComponentVisible, makeComponentInvisible } = useComponentVisible();
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      priceFrom: null,
      priceTo: null,
    },
  });
  const { fields: colorsFields, append: colorsAppend, replace: replaceColors } = useFieldArray({ control, name: "colors" });
  const {
    fields: podcategoriesFields,
    append: podcategoriesAppend,
    replace: replacePodcategories,
  } = useFieldArray({ control, name: "podcategories" });
  const { fields: sizesFields, append: sizesAppend, replace: replaceSizes } = useFieldArray({ control, name: "sizes" });

  //get data to generate form
  useEffect(() => {
    setProductsPodcategories(getProductsCategories("podcategory"));
    setProductsColors(getProductsCategories("colors"));
    setProductsSizes(getProductsCategories("sizes"));
  }, [filteredProductsByPath]);

  //add form inputs
  useEffect(() => {
    if (productsColors.length === 0 && productsPodcategories.length === 0 && productsSizes.length === 0) return;
    productsColors.forEach(([name, quantity]) => colorsAppend({ name, quantity }));
    productsPodcategories.forEach(([name, quantity]) => podcategoriesAppend({ name, quantity }));
    productsSizes.forEach(([name, quantity]) => sizesAppend({ name, quantity }));
    updateFormInputsBySearchQuery();
  }, [productsColors, productsPodcategories, productsSizes]);

  function getProductsCategories(categoryArray) {
    const storeEntries = {};
    filteredProductsByPath.forEach((item) => {
      item[categoryArray].forEach((item) => {
        storeEntries[item] = (storeEntries[item] || 0) + 1;
      });
    });
    return Object.entries(storeEntries);
  }

  //update form inputs by search query values on render
  function updateFormInputsBySearchQuery() {
    const { categoryArr, priceArr } = getSearchQueryValues();
    const { colors, podcategories, sizes } = getValues();
    function updateFormInputs(array, fieldArray, replacementMethod) {
      categoryArr.forEach(([filterName, filterValues]) => {
        if (filterName === fieldArray) {
          filterValues.split(",").forEach((filterValue) => {
            const foundedIndex = array.findIndex((item) => item.name === filterValue);
            if (foundedIndex !== -1) array[foundedIndex].checkbox = "on";
          });
        }
      });
      replacementMethod(array);
    }
    updateFormInputs([...colors], "color", replaceColors);
    updateFormInputs([...podcategories], "podcategory", replacePodcategories);
    updateFormInputs([...sizes], "size", replaceSizes);
    priceArr.forEach((item) => setValue(item[0], item[1]));
  }

  function updateURL(pickedFilters) {
    if (Object.keys(pickedFilters).length === 0) {
      history.push(`?`);
      makeComponentInvisible();
      return;
    }
    const searchQueryParams = {};
    for (const [key, value] of Object.entries(pickedFilters)) {
      searchQueryParams[key] = Array.isArray(searchQueryParams[key]) ? [...searchQueryParams[key], value] : value;
    }
    let searchQuery = "";
    for (const property in searchQueryParams) {
      searchQuery += `&${property}=${searchQueryParams[property]}`;
    }
    searchQuery = `?${searchQuery.slice(1)}`;
    history.push(searchQuery);
    makeComponentInvisible();
  }

  const onSubmit = (data) => {
    const { colors, podcategories, sizes, priceFrom, priceTo } = data;
    const pickedFilters = {};
    function getPickedFilters(array, arrayName) {
      const filters = array.filter((item) => item.checkbox === "on").map((item) => item.name);
      if (filters.length > 0) pickedFilters[arrayName] = filters;
    }
    getPickedFilters([...colors], "color");
    getPickedFilters([...podcategories], "podcategory");
    getPickedFilters([...sizes], "size");
    if (priceFrom !== null) pickedFilters.priceFrom = priceFrom;
    if (priceTo !== null) pickedFilters.priceTo = priceTo;
    updateURL(pickedFilters);
  };

  function handleUnfold(e) {
    e.currentTarget.classList.toggle(styles.unfold);
  }

  function generateCheckboxes(name, array, type, displayQuantity) {
    return (
      <div className={styles.filter}>
        <button type="button" className={styles.filter__name} onClick={(e) => handleUnfold(e)}>
          {name}
        </button>
        <div className={styles.filter__options}>
          {array.map((field, index) => (
            <div key={field.id} className={styles.category}>
              <label className={styles.category__name}>
                <span>
                  {field.name}
                  {displayQuantity && <sup className={styles.category__quantity}>({field.quantity})</sup>}
                </span>
                <input type="checkbox" className={styles.category__checkmark} value="on" {...register(`${type}.${index}.checkbox`)} />
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <aside className={`${styles.products__form} ${isComponentVisible ? styles.open : ""}`}>
      <div className={styles.header}>
        <div className={styles.header__title}>Filters</div>
        <CloseButton onClick={() => makeComponentInvisible()} hideOnWide />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.filters}>
        <div>
          <div className={styles.filter}>
            <button type="button" className={styles.filter__name} onClick={(e) => handleUnfold(e)}>
              Price
            </button>

            <div className={`${styles.filter__options} ${styles[`filter__options--price`]}`}>
              <input
                className={`${styles.price} ${errors?.priceFrom !== undefined ? styles.invalid__input : ""}`}
                type="number"
                step="any"
                placeholder="from"
                {...register("priceFrom")}
              />
              -
              <input
                className={`${styles.price} ${errors?.priceTo !== undefined ? styles.invalid__input : ""}`}
                type="number"
                step="any"
                placeholder="to"
                {...register("priceTo")}
              />
            </div>
            <p className={styles.invalid__message}>{errors?.priceFrom?.message}</p>
            <p className={styles.invalid__message}>{errors?.priceTo?.message}</p>
          </div>
          {podcategoriesFields.length > 0 && <>{generateCheckboxes("Podcategories", podcategoriesFields, "podcategories", true)}</>}
          {sizesFields.length > 0 && <>{generateCheckboxes("Sizes", sizesFields, "sizes")}</>}
          {colorsFields.length > 0 && <>{generateCheckboxes("Colors", colorsFields, "colors")}</>}
        </div>
        <div className={styles.filters__button}>
          <Button wide rubik type="submit">
            Filter
          </Button>
        </div>
      </form>
    </aside>
  );
};

export default ProductsForm;
