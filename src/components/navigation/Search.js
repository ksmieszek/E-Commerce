import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";
import { searchResults, searchPodcategories } from "assets/data/searchResults";
import { ReactComponent as Glass } from "assets/icons/magnifying-glass.svg";

const Search = () => {
  const inputRef = useRef(null);
  const [categoriesResults, setCategoriesResults] = useState([]);
  const [suggestionsResults, setSuggestionsResults] = useState([]);
  const debouncedKeyupListener = debounce(handleSearch, 400);

  useEffect(() => {
    const refCopy = inputRef.current;
    refCopy.addEventListener("keyup", debouncedKeyupListener);
    return () => refCopy.removeEventListener("keyup", debouncedKeyupListener);
  }, []);

  function handleSearch() {
    const searchValue = inputRef.current.value;
    if (searchValue.length === 0) {
      setCategoriesResults([]);
      setSuggestionsResults([]);
    }
    if (searchValue.length < 2) return;
    findMatches();
  }

  function findMatches() {
    const regex = new RegExp(inputRef.current.value, "gi");
    setCategoriesResults(searchResults.filter((item) => item.category.categoryName.match(regex)));
    setSuggestionsResults(Object.values(searchPodcategories).filter((item) => item.name.match(regex)));
  }

  function displayMainResults(matches) {
    return matches.mainResults.map((item, index) => (
      <li key={index}>
        <Link to={`/products${item.route}`}>
          {highlightMatchingString(matches.category.categoryName)}
          <span className="category">{item.name}</span>
        </Link>
      </li>
    ));
  }

  function displayAllResults() {
    const allResults = new Map();
    suggestionsResults.forEach((item) => allResults.set(item.name, item.route));
    if (inputRef.current.value.length >= 4)
      categoriesResults.map((item) => item.category.podcategories.map((podcategory) => allResults.set(podcategory.name, podcategory.route)));
    return Array.from(allResults).map(([name, route], index) => (
      <li key={index}>
        <Link to={`/products${route}`}>{highlightMatchingString(name)}</Link>
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
        <span className="bold">{string.substring(startIndex, endIndex)}</span>
        <span>{string.substring(endIndex, string.length)}</span>
      </>
    ) : (
      <span>{string}</span>
    );
  }

  return (
    <form className="search">
      <input type="text" placeholder="Search" ref={inputRef} />
      <button type="submit" onClick={(e) => e.preventDefault()}>
        <Glass />
      </button>
      <div className="search__results">
        {categoriesResults.length === 0 && suggestionsResults.length === 0 ? (
          <>
            <div className="header">Shortcuts</div>
            <ul>
              <li className="shortcut">
                <Link to="">Shipping</Link>
              </li>
              <li className="shortcut">
                <Link to="">Returns & Refunds</Link>
              </li>
              <li className="shortcut">
                <Link to="">FAQs</Link>
              </li>
            </ul>
          </>
        ) : (
          <>
            {categoriesResults.length > 0 && inputRef.current.value.length >= 4 && (
              <>
                <div className="header">Search results in categories</div>
                {categoriesResults.map((category, index) => (
                  <ul key={index}>{displayMainResults(category)}</ul>
                ))}
              </>
            )}
            {
              <>
                <div className="header">Suggestions</div>
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
