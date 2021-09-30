import categories from "assets/data/categories";

export const searchPodcategories = {
  trousers: {
    name: "Trousers",
    route: `/${categories.type.trousers}`,
  },
  jeans: {
    name: "Jeans",
    route: `/${categories.type.trousers}?type=${categories.type.jeans}`,
  },
  tracksuit: {
    name: "Tracksuit",
    route: `/${categories.type.trousers}?type=${categories.type.tracksuit}`,
  },
  suitTrousers: {
    name: "Suit Trousers",
    route: `/${categories.type.trousers}?type=${categories.type.suitTrouser}`,
  },
  basicSweatshirts: {
    name: "Basic sweatshirts",
    route: `/${categories.type.sweatshirts}?type=${categories.type.basicSweatshirt}`,
  },
  hoodie: {
    name: "hoodies",
    route: `/${categories.type.sweatshirts}?type=${categories.type.hoodie}`,
  },
  zipperSweatshirt: {
    name: "zipper sweatshirts",
    route: `/${categories.type.sweatshirts}?type=${categories.type.zipperSweatshirt}`,
  },
};

const searchCategories = {
  trousers: {
    categoryName: "Trousers",
    route: `/${categories.type.trousers}`,
    podcategories: [searchPodcategories.jeans, searchPodcategories.tracksuit, searchPodcategories.suitTrousers],
  },

  sweatshirts: {
    categoryName: "Sweatshirts",
    route: `/${categories.type.sweatshirts}`,
    podcategories: [searchPodcategories.basicSweatshirts, searchPodcategories.hoodie, searchPodcategories.zipperSweatshirt],
  },
};

export const searchResults = [
  {
    category: searchCategories.trousers,
    mainResults: [
      {
        name: "All categories",
        route: `/${categories.type.trousers}`,
      },
      {
        name: "Men",
        route: `/men/${categories.type.trousers}`,
      },
      {
        name: "Women",
        route: `/women/${categories.type.trousers}`,
      },
    ],
  },
  {
    category: searchCategories.sweatshirts,
    mainResults: [
      {
        name: "All categories",
        route: `/${categories.type.sweatshirts}`,
      },
      {
        name: "Men",
        route: `/men/${categories.type.sweatshirts}`,
      },
      {
        name: "Women",
        route: `/women/${categories.type.sweatshirts}`,
      },
    ],
  },
];
