const {default: axios} = require('axios');

const category_base_url =
  'https://www.themealdb.com/api/json/v1/1/categories.php';

const category_filter = value =>
  `https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`;

const single_recipe = id =>
  `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

const apiCall = async endpoint => {
  try {
    const response = axios.get(endpoint);
    return response;
  } catch (err) {
    return {isError: true, error: err};
  }
};

export const getCategory = () => {
  return apiCall(category_base_url);
};

export const getFilterCategory = search => {
  return apiCall(category_filter(search));
};

export const getRecipe = id => {
  return apiCall(single_recipe(id));
};
