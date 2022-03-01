import { useState, useEffect, useRef } from "react";
import debounce from "lodash.debounce";
import { db } from "firebase";
import { doc, getDoc } from "firebase/firestore";
import { ReactComponent as Glass } from "assets/icons/magnifying-glass.svg";
import styles from "./Navigation.module.scss";

const Search = () => {
  const inputRef = useRef(null);
  const [suggestionsCollection, setSuggestionsCollection] = useState(undefined);
  const [mainCategoriesCollection, setMainCategoriesCollection] = useState(undefined);
  const [mainCategoriesResults, setMainCategoriesResults] = useState([]);
  const [suggestionsResults, setSuggestionsResults] = useState([]);
  const debouncedKeyupListener = debounce(handleSearch, 400);

  useEffect(() => {
    generateSearchCollections();
  }, []);

  useEffect(() => {
    if (suggestionsCollection === undefined || mainCategoriesCollection === undefined) return;
    const refCopy = inputRef.current;
    refCopy.addEventListener("keyup", debouncedKeyupListener);
    return () => refCopy.removeEventListener("keyup", debouncedKeyupListener);
  }, [suggestionsCollection, mainCategoriesCollection]);

  const generateSearchCollections = async () => {
    const relationsSnapshot = await getDoc(doc(db, "relations", "categoryPodcategory"));
    if (!relationsSnapshot.exists()) return;
    const relations = relationsSnapshot.data();

    const suggestionsObject = {};
    for (const [categoryKey, categoryValue] of Object.entries(relations)) {
      for (const [podcategoryKey, podcategoryValue] of Object.entries(categoryValue.podcategories)) {
        suggestionsObject[podcategoryKey] = {
          name: podcategoryValue,
          route: `/${categoryKey}?podcategory=${podcategoryKey}`,
        };
      }
    }

    const mainCategoriesArray = [];
    for (const [categoryKey, categoryValue] of Object.entries(relations)) {
      const podcategoriesOfCategory = [];
      for (const key of Object.keys(categoryValue.podcategories)) podcategoriesOfCategory.push(suggestionsObject[key]);
      mainCategoriesArray.push({
        category: {
          categoryName: `${categoryValue.name}`,
          route: `/${categoryKey}`,
          podcategories: podcategoriesOfCategory,
        },
        mainResults: [
          {
            name: "All categories",
            route: `/${categoryKey}`,
          },
          {
            name: "Men",
            route: `/men/${categoryKey}`,
          },
          {
            name: "Women",
            route: `/women/${categoryKey}`,
          },
        ],
      });
    }
    setSuggestionsCollection(suggestionsObject);
    setMainCategoriesCollection(mainCategoriesArray);
  };

  function handleSearch() {
    const searchValue = inputRef.current.value;
    if (searchValue.length === 0) {
      setMainCategoriesResults([]);
      setSuggestionsResults([]);
    }
    if (searchValue.length < 2) return;
    findMatches();
  }

  function findMatches() {
    const regex = new RegExp(inputRef.current.value, "gi");
    setMainCategoriesResults(mainCategoriesCollection.filter((item) => item.category.categoryName.match(regex)));
    setSuggestionsResults(Object.values(suggestionsCollection).filter((item) => item.name.match(regex)));
  }

  function displayMainResults(matches) {
    return matches.mainResults.map((item, index) => (
      <li key={index}>
        <a href={`/products${item.route}`}>
          {highlightMatchingString(matches.category.categoryName)}
          <span className={styles.category}>{item.name}</span>
        </a>
      </li>
    ));
  }

  function displayAllResults() {
    const allResults = new Map();
    suggestionsResults.forEach((item) => allResults.set(item.name, item.route));
    if (inputRef.current.value.length >= 4)
      mainCategoriesResults.map((item) => item.category.podcategories.map((podcategory) => allResults.set(podcategory.name, podcategory.route)));
    return Array.from(allResults).map(([name, route], index) => (
      <li key={index}>
        <a href={`/products${route}`}>{highlightMatchingString(name)}</a>
      </li>
    ));
  }

  function highlightMatchingString(string) {
    const regex = new RegExp(inputRef.current.value, "gi");
    const startIndex = string.search(regex);
    const endIndex = string.search(regex) + inputRef.current.value.length;
    return startIndex !== -1 ? (
      <>
        <span>{string.substring(0, startIndex)}</span>
        <span className={styles.bold}>{string.substring(startIndex, endIndex)}</span>
        <span>{string.substring(endIndex, string.length)}</span>
      </>
    ) : (
      <span>{string}</span>
    );
  }

  return (
    <form className={styles.search}>
      <input type="text" placeholder="Search" ref={inputRef} />
      <button type="submit" onClick={(e) => e.preventDefault()}>
        <Glass />
      </button>
      <div className={styles.search__results}>
        {mainCategoriesResults.length === 0 && suggestionsResults.length === 0 ? (
          <>
            <div className={styles.header}>Shortcuts</div>
            <ul>
              <li className={styles.shortcut}>
                <a href="/shipping">Shipping</a>
              </li>
              <li className={styles.shortcut}>
                <a href="/returns-and-refunds">Returns & Refunds</a>
              </li>
              <li className={styles.shortcut}>
                <a href="/faq">FAQs</a>
              </li>
            </ul>
          </>
        ) : (
          <>
            {mainCategoriesResults.length > 0 && inputRef.current.value.length >= 4 && (
              <>
                <div className={styles.header}>Search results in categories</div>
                {mainCategoriesResults.map((category, index) => (
                  <ul key={index}>{displayMainResults(category)}</ul>
                ))}
              </>
            )}
            {
              <>
                <div className={styles.header}>Suggestions</div>
                <ul>{displayAllResults()}</ul>
              </>
            }
          </>
        )}
      </div>
    </form>
  );
};

export default Search;
