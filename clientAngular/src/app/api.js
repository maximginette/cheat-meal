import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:3000/api'
});
const errHandler = err => {
  console.error(err.response.data);
  throw err.response.data;
};
export default {
  getRecipe() {
    return service
      .get('/recipes')
      .then(res => res.data)
      .catch(errHandler);
  },
  getSingleRecipe(id) {
    return service
      .get(`./recipe/${id}`)
      .then(res => res.data)
      .catch(errHandler);
  },
  createRecipe(recipeInfo) {
    return service
      .post("/create", recipeInfo)
      .then(res => res.data)
      .catch(errHandler);
  },
  removeRecipe(id) {
    return service
      .delete(`/recipe/${id}`)
      .then(res => res.data)
      .catch(errHandler);
  },
  updateRecipe(id, recipe) {
    return service
      .post(`/recipe/${id}`, recipe)
      .then(res => res.data)
      .catch(errHandler);
  },
}
