import { ReactComponent as Glass } from "assets/icons/magnifying-glass.svg";

const Search = () => (
  <form className="search">
    <input type="text" placeholder="Szukaj" />
    <button type="submit">
      <Glass />
    </button>
  </form>
);

export default Search;
