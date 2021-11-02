import { sortActions } from "store/sortSlice";
import { useState, useEffect } from "react";

export const useSort = (items, sortKey) => {
  const [sortedProducts, setSortedProducts] = useState(items || []);

  function handleSort() {
    switch (sortActions[sortKey]) {
      case sortActions.def:
        setSortedProducts(items);
        break;
      case sortActions.priceAsc:
        setSortedProducts([...items].sort((firstEl, secondEl) => (parseFloat(firstEl.price) > parseFloat(secondEl.price) ? 1 : -1)));
        break;
      case sortActions.priceDesc:
        setSortedProducts([...items].sort((firstEl, secondEl) => (parseFloat(firstEl.price) > parseFloat(secondEl.price) ? -1 : 1)));
        break;
      case sortActions.nameAsc:
        setSortedProducts([...items].sort((firstEl, secondEl) => (firstEl.name > secondEl.name ? 1 : -1)));
        break;
      case sortActions.nameDesc:
        setSortedProducts([...items].sort((firstEl, secondEl) => (firstEl.name > secondEl.name ? -1 : 1)));
        break;
      default:
        return;
    }
  }

  useEffect(() => {
    handleSort();
  }, [items, sortKey]);

  return sortedProducts;
};
