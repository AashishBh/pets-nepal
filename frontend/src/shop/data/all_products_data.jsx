import CAT_PRODUCTS_DATA  from './cats_data';
import DOG_PRODUCTS_DATA  from './dogs_data';
import FISH_PRODUCTS_DATA  from './fish_data';
import OTHER_PETS_PRODUCTS_DATA  from './others_data';


const ALL_PRODUCTS_DATA = [
  {
    id: 1,
    title: "Cats",
    routeUrl: "cats/",
    categories: CAT_PRODUCTS_DATA
  },
  {
    id: 2,
    title: "Dogs",
    routeUrl: "dogs/",
    categories:DOG_PRODUCTS_DATA
  },
  {
    id: 3,
    title: "Fishes",
    routeUrl: "fish/",
    categories: FISH_PRODUCTS_DATA
  },
  {
    id: 4,
    title: "Others",
    routeUrl: "others/",
    categories: OTHER_PETS_PRODUCTS_DATA
  },
];

export default ALL_PRODUCTS_DATA;