import categories from "assets/data/categories";

import wb1front from "assets/images/wb1front.webp";
import wb1back from "assets/images/wb1back.webp";
import wb2front from "assets/images/wb2front.webp";
import wb2back from "assets/images/wb2back.jpg";

import wh1front from "assets/images/wh1front.webp";
import wh1back from "assets/images/wh1back.webp";
import wh2front from "assets/images/wh2front.webp";
import wh2back from "assets/images/wh2back.webp";
import wh3front from "assets/images/wh3front.webp";
import wh3back from "assets/images/wh3back.webp";
import wh4front from "assets/images/wh4front.jpg";
import wh4back from "assets/images/wh4back.jpg";

import wz1front from "assets/images/wz1front.webp";
import wz1back from "assets/images/wz1back.webp";
import wz2front from "assets/images/wz2front.webp";
import wz2back from "assets/images/wz2back.webp";

import wj1front from "assets/images/wj1front.webp";
import wj1back from "assets/images/wj1back.webp";
import wt1front from "assets/images/wt1front.webp";
import wt1back from "assets/images/wt1back.webp";

import mb1front from "assets/images/mb1front.webp";
import mb1back from "assets/images/mb1back.webp";
import mzh1front from "assets/images/mzh1front.webp";
import mzh1back from "assets/images/mzh1back.webp";

import mj1front from "assets/images/mj1front.jpg";
import mj1back from "assets/images/mj1back.webp";
import mj2front from "assets/images/mj2front.jpg";
import mj2back from "assets/images/mj2back.webp";
import mj3front from "assets/images/mj3front.jpg";
import mj3back from "assets/images/mj3back.jpg";

import mt1front from "assets/images/mt1front.webp";
import mt1back from "assets/images/mt1back.webp";
import mt2front from "assets/images/mt2front.webp";
import mt2back from "assets/images/mt2back.webp";

import ms1front from "assets/images/ms1front.jpg";
import ms1back from "assets/images/ms1back.jpg";
import ms2front from "assets/images/ms2front.jpg";
import ms2back from "assets/images/ms2back.jpg";

const products = [
  {
    name: "Wide leg jeans",
    price: "39.99",
    frontImage: wj1front,
    backImage: wj1back,
    sex: [categories.sex.women],
    category: [categories.type.trousers],
    podcategory: [categories.type.jeans],
    colors: [categories.color.blue],
    sizes: [categories.size.m, categories.size.l],
    get categories() {
      return [...this.sex, ...this.category, ...this.podcategory, ...this.colors, ...this.sizes];
    },
  },
  {
    name: "Joggers",
    price: "14.99",
    frontImage: wt1front,
    backImage: wt1back,
    sex: [categories.sex.women],
    category: [categories.type.trousers],
    podcategory: [categories.type.tracksuit],
    colors: [categories.color.white, categories.color.gray],
    sizes: [categories.size.s, categories.size.xl],
    get categories() {
      return [...this.sex, ...this.category, ...this.podcategory, ...this.colors, ...this.sizes];
    },
  },
  {
    name: "Suit trousers - regular fit - stretch",
    price: "39.99",
    frontImage: ms1front,
    backImage: ms1back,
    sex: [categories.sex.men],
    category: [categories.type.trousers],
    podcategory: [categories.type.suitTrouser],
    colors: [categories.color.black],
    sizes: [categories.size.s, categories.size.xl],
    get categories() {
      return [...this.sex, ...this.category, ...this.podcategory, ...this.colors, ...this.sizes];
    },
  },
  {
    name: "Mix-and-match suit trousers",
    price: "29.99",
    frontImage: ms2front,
    backImage: ms2back,
    sex: [categories.sex.men],
    category: [categories.type.trousers],
    podcategory: [categories.type.suitTrouser],
    colors: [categories.color.gray],
    sizes: [categories.size.m, categories.size.l],
    get categories() {
      return [...this.sex, ...this.category, ...this.podcategory, ...this.colors, ...this.sizes];
    },
  },
  {
    name: "Joggers",
    price: "14.99",
    frontImage: mt1front,
    backImage: mt1back,
    sex: [categories.sex.men],
    category: [categories.type.trousers],
    podcategory: [categories.type.tracksuit],
    colors: [categories.color.violet, categories.color.darkblue],
    sizes: [categories.size.l, categories.size.xl],
    get categories() {
      return [...this.sex, ...this.category, ...this.podcategory, ...this.colors, ...this.sizes];
    },
  },
  {
    name: "Joggers - organic cotton",
    price: "19.99",
    frontImage: mt2front,
    backImage: mt2back,
    sex: [categories.sex.men],
    category: [categories.type.trousers],
    podcategory: [categories.type.tracksuit],
    colors: [categories.color.gray],
    sizes: [categories.size.s, categories.size.m],
    get categories() {
      return [...this.sex, ...this.category, ...this.podcategory, ...this.colors, ...this.sizes];
    },
  },
  {
    name: "Regular jeans",
    price: "44.99",
    frontImage: mj1front,
    backImage: mj1back,
    sex: [categories.sex.men],
    category: [categories.type.trousers],
    podcategory: [categories.type.jeans],
    colors: [categories.color.black],
    sizes: [categories.size.m, categories.size.xl],
    get categories() {
      return [...this.sex, ...this.category, ...this.podcategory, ...this.colors, ...this.sizes];
    },
  },
  {
    name: "Slim jeans",
    price: "39.99",
    frontImage: mj2front,
    backImage: mj2back,
    sex: [categories.sex.men],
    category: [categories.type.trousers],
    podcategory: [categories.type.jeans],
    colors: [categories.color.blue],
    sizes: [categories.size.s, categories.size.l],
    get categories() {
      return [...this.sex, ...this.category, ...this.podcategory, ...this.colors, ...this.sizes];
    },
  },
  {
    name: "Straight jeans",
    price: "24.99",
    frontImage: mj3front,
    backImage: mj3back,
    sex: [categories.sex.men],
    category: [categories.type.trousers],
    podcategory: [categories.type.jeans],
    colors: [categories.color.blue],
    sizes: [categories.size.s, categories.size.m, categories.size.l, categories.size.xl],
    get categories() {
      return [...this.sex, ...this.category, ...this.podcategory, ...this.colors, ...this.sizes];
    },
  },
  {
    name: "Zip - through sweatshirt with hood",
    price: "22.99",
    frontImage: mzh1front,
    backImage: mzh1back,
    sex: [categories.sex.men],
    category: [categories.type.sweatshirts],
    podcategory: [categories.type.zipperSweatshirt, categories.type.hoodie],
    colors: [categories.color.green],
    sizes: [categories.size.s, categories.size.xl],
    get categories() {
      return [...this.sex, ...this.category, ...this.podcategory, ...this.colors, ...this.sizes];
    },
  },
  {
    name: "Sweatshirt - cotton",
    price: "11.99",
    frontImage: mb1front,
    backImage: mb1back,
    sex: [categories.sex.men],
    category: [categories.type.sweatshirts],
    podcategory: [categories.type.basicSweatshirt],
    colors: [categories.color.blue],
    sizes: [categories.size.m, categories.size.l],
    get categories() {
      return [...this.sex, ...this.category, ...this.podcategory, ...this.colors, ...this.sizes];
    },
  },
  {
    name: "Sweatshirt - organic cotton",
    price: "12.99",
    frontImage: wb1front,
    backImage: wb1back,
    sex: [categories.sex.women],
    category: [categories.type.sweatshirts],
    podcategory: [categories.type.basicSweatshirt],
    colors: [categories.color.blue],
    sizes: [categories.size.m, categories.size.l],
    get categories() {
      return [...this.sex, ...this.category, ...this.podcategory, ...this.colors, ...this.sizes];
    },
  },
  {
    name: "Sweatshirt",
    price: "12.99",
    frontImage: wb2front,
    backImage: wb2back,
    sex: [categories.sex.women],
    category: [categories.type.sweatshirts],
    podcategory: [categories.type.basicSweatshirt],
    colors: [categories.color.gray],
    sizes: [categories.size.s, categories.size.xl],
    get categories() {
      return [...this.sex, ...this.category, ...this.podcategory, ...this.colors, ...this.sizes];
    },
  },
  {
    name: "Hoodie - organic cotton - recycled",
    price: "19.99",
    frontImage: wh1front,
    backImage: wh1back,
    sex: [categories.sex.women],
    category: [categories.type.sweatshirts],
    podcategory: [categories.type.hoodie],
    colors: [categories.color.cream],
    sizes: [categories.size.m, categories.size.xl],
    get categories() {
      return [...this.sex, ...this.category, ...this.podcategory, ...this.colors, ...this.sizes];
    },
  },
  {
    name: "Hoodie",
    price: "19.99",
    frontImage: wh2front,
    backImage: wh2back,
    sex: [categories.sex.women],
    category: [categories.type.sweatshirts],
    podcategory: [categories.type.hoodie],
    colors: [categories.color.blue],
    sizes: [categories.size.s, categories.size.l],
    get categories() {
      return [...this.sex, ...this.category, ...this.podcategory, ...this.colors, ...this.sizes];
    },
  },
  {
    name: "Hoodie - organic cotton",
    price: "14.99",
    frontImage: wh3front,
    backImage: wh3back,
    sex: [categories.sex.women],
    category: [categories.type.sweatshirts],
    podcategory: [categories.type.hoodie],
    colors: [categories.color.pink],
    sizes: [categories.size.l, categories.size.xl],
    get categories() {
      return [...this.sex, ...this.category, ...this.podcategory, ...this.colors, ...this.sizes];
    },
  },
  {
    name: "Fleece jacket - recycled",
    price: "17.99",
    frontImage: wz1front,
    backImage: wz1back,
    sex: [categories.sex.women],
    category: [categories.type.sweatshirts],
    podcategory: [categories.type.basicSweatshirt, categories.type.zipperSweatshirt],
    colors: [categories.color.gray, categories.color.black],
    sizes: [categories.size.s, categories.size.m],
    get categories() {
      return [...this.sex, ...this.category, ...this.podcategory, ...this.colors, ...this.sizes];
    },
  },
  {
    name: "Sweatshirt",
    price: "19.99",
    frontImage: wz2front,
    backImage: wz2back,
    sex: [categories.sex.women],
    category: [categories.type.sweatshirts],
    podcategory: [categories.type.basicSweatshirt, categories.type.zipperSweatshirt],
    colors: [categories.color.gray],
    sizes: [categories.size.s, categories.size.l, categories.size.xl],
    get categories() {
      return [...this.sex, ...this.category, ...this.podcategory, ...this.colors, ...this.sizes];
    },
  },
  {
    name: "Zip-trough sweatshirt with hood - organic cotton",
    price: "17.99",
    frontImage: wh4front,
    backImage: wh4back,
    sex: [categories.sex.women],
    category: [categories.type.sweatshirts],
    podcategory: [categories.type.hoodie, categories.type.zipperSweatshirt],
    colors: [categories.color.pink],
    sizes: [categories.size.m, categories.size.l, categories.size.xl],
    get categories() {
      return [...this.sex, ...this.category, ...this.podcategory, ...this.colors, ...this.sizes];
    },
  },
];

export default products;
