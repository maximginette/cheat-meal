<template>
  <b-container class="b-container">
    <b-row class="justify-content-md-center">
      <b-col col lg="8">
        <div align="center">
          <h1 class="h1">Submit your recipe !</h1>
        </div>
        <br>
        <br>
        <form @submit.prevent="submitRecipe" id="form">
          <label for="title" class="label">Recipe title:</label>
          <input v-model="title" type="text" name="title" class="input is-medium">
          <br>
          <br>
          <br>
          <b-container fluid>
            <b-row>
              <b-col>
                <label for="type" class="label">Type</label>
                <select name="type" form="type" v-model="type" placeholder="Type" class="custom-select">
                  <option value="starter">starter</option>
                  <option value="main">main</option>
                  <option value="dessert">dessert</option>
                </select>
              </b-col>
              <b-col>
                <label for="difficulty" class="label">Difficulty</label>
                <select name="difficulty" form="difficulty" v-model="difficulty" class="custom-select">
                  <option value="easy">easy</option>
                  <option value="medium">medium</option>
                  <option value="hard">hard</option>
                </select>
              </b-col>
              <b-col>
                <label for="budget" class="label">Budget</label>
                <select name="budget" form="budget" v-model="budget" class="custom-select">
                  <option value="cheap">cheap</option>
                  <option value="medium">medium</option>
                  <option value="expensive">expensive</option>
                </select>
              </b-col>
            </b-row>
          </b-container>
          <br>
          <br>
          <div>
            <input disabled type="checkbox" id="veggie" name="veggie" value="veggie">
            <label for="veggie" class="tooltip label">Veggie meal
              <span class="tooltiptext">Wrong website, sorry</span>
            </label>
          </div>
          <br>
          <div id="ingredients-wrapper">
            <br>
            <span class="label">🧀 <span style="text-decoration:underline">Ingredients needed:</span></span>
            <br>
            <label v-for="(ingredient, i) in " :key=" +1" class="label">
              <b-row>
                <b-col>
                  <!--<label>Ingredient {{ i + 1}}</label>-->
                  <!--<input v-model="solo.ingredients[i].name" type="text" class="input">-->
                </b-col>
                <b-col>
                  <label class="label">Quantity</label>
                  <!--<input v-model="solo.ingredients[i].quantity" type="text" class="input">-->
                </b-col>
                <b-col>
                  <label class="label">Unit</label>
                  <!--<select name="unit" form="unit" v-model="solo.ingredients[i].unit" class="custom-select">-->
                    <option value="grams">grams</option>
                    <option value="centiliters">centiliters</option>
                    <option value="units">units</option>
                  <!--</select>-->
                </b-col>
              </b-row>
            </label>
          </div>
          <!-- <div id="ingredients-wrapper">
            <br>
            <span class="label">🧀
              <span style="text-decoration:underline">Ingredients needed:</span>
            </span>
            <br>
            <template v-for="(ingredient, i) in ingredients"> -->
              <!-- <input v-model="ingredients[i].name" type="text"> -->
              <!-- <b-row>
                <b-col>
                  <IngredientAutoComplete :label="`Ingredient ${i + 1}`" v-model="ingredients[i].name" :key="i" /> -->
                  <!-- <input v-model="ingredients[i].name" type="text" @change="myIngredientsAutoComplete.getResults"> -->
                <!-- </b-col>
                <b-col>
                  <span class="label">Quantity</span>
                  <input v-model="ingredients[i].quantity" type="text" class="input">
                </b-col>
                
                <b-col>
                  <span class="label">Quantity</span>
                  <input v-model="ingredients[i].quantity" type="text" class="input">
                </b-col>
                <b-col>
                  <label class="label">Unit</label>
                  <select name="unit" form="unit" v-model="ingredients[i].unit" class="custom-select">
                    <option value="grams">grams</option>
                    <option value="centiliters">centiliters</option>
                    <option value="units">units</option>
                  </select>
                </b-col>
                <br>
              </b-row>
            </template>
          </div> -->
          <a background="red" @click="addIngredient" value="Add More">Add another ingredient...</a>
          <!--<div id="step-wrapper">-->
            <!--<br>-->
            <!--<br>-->
            <!--<span class="label">👨🏽‍🍳-->
              <!--<span style="text-decoration:underline">Preparation:</span>-->
            <!--</span>-->
            <!--<br>-->
            <!--<label v-for="(step, i) in steps" :key="i" class="label">Step {{ i + 1}}:-->
              <!--<br>-->
              <!--<input v-model="steps[i]" type="text" class="input">-->
              <!--<br>-->
            <!--</label>-->
          <!--</div>-->
          <a id="more_fields" @click="addStep" value="Add More">Add another step...</a>
          <br>
          <br>
          <br>
          <label for="advisedDrink" class="label">Recommended drink:</label>
          <input v-model="advisedDrink" type="text" name="advisedDrink" class="input">
          <br>
          <br>
          <span class="label">Add a picture of your meal:</span>
          <b-upload v-model="files">
            <a class="button">
              <b-icon icon="upload"></b-icon>
              <span>Click to upload</span>
            </a>
          </b-upload>
          <div v-if="files && files.length">
            <span class="file-name">
              {{ files[0].name }}
            </span>
          </div>
          <br>
          <br>
          <div align="center">
            <button class="btn-success btn">Submit your recipe!</button>
          </div>
        </form>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import api from "../api";
export default {
  data() {
    return {
      title: "",
      type: "",
      difficulty: "",
      budget: "",
      steps: [""],
      ingredients: [{ name: "", quantity: "", unit: "" }],
      files: [],
      error: null,
      advisedDrink: "",
      count: 2
    };
  },
  methods: {
    submitRecipe() {
      this.error = null;
      api
        .submitRecipe({
          creator: this.$root.user.name,
          creatorId: this.$root.user.id,
          title: this.title,
          type: this.type,
          difficulty: this.difficulty,
          budget: this.budget,
          steps: this.steps,
          ingredients: this.ingredients,
          advisedDrink: this.advisedDrink,
          picture: this.files[0]
          // creator: this.creator
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch(err => {
          this.error = err;
        });
    },
    addStep() {
      this.steps.push("");
    },
    addIngredient() {
      this.ingredients.push({ name: "", quantity: "", unit: "" });
    },
    uploadPicture() {
      const formData = new FormData();
      formData.append("picture", this.picture);
      // you can add more information to the formdata
      formData.append("myMessage", "Hello");
      axios
        .post("http://localhost:3000/api/images/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          console.log(response.data);
        });
    }
  }
};
</script>
<style>
.tooltip {
  position: relative;
  display: inline-block;
  opacity: 1;
}
.tooltip .tooltiptext {
  visibility: hidden;
  width: 200px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
}
.tooltip:hover .tooltiptext {
  visibility: visible;
}
#totalCalories {
  border: solid;
  width: 15%;
  height: 50px;
}
.b-container {
  margin-top: 60px;
}
.h1 {
  font-family: "Pacifico", cursive;
}
</style>