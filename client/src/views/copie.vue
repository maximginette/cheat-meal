<template>
  <div class="container">
     <h1 class="title">Submit your recipe</h1>
    
    <form @submit.prevent="submitRecipe" id="form" action="/recipe" method="POST">

    <label for="title" >Recipe title:</label>
    <input v-model="title" type="text" name="title">

    <br><br>
<b-row>
        <b-col>
          <b-field>
            <b-select name="type" form="type" v-model="type" placeholder="Type">
                <option value="starter">starter</option>
                <option value="main">main</option>
                <option value="dessert">dessert</option>
            </b-select>
        </b-field>
   
    
    </b-col>
        <b-col>
          
    <label for="difficulty">Difficulty</label>
    <select name="difficulty" form="difficulty" v-model="difficulty">
    <option value="very easy">very easy</option>
    <option value="easy">easy</option>
    <option value="medium">medium</option>
    <option value="hard">hard</option>
    </select>
    
    </b-col>
        <b-col>
    <label for="budget">Budget</label>
    <select name="budget" form="budget" v-model="budget">
    <option value="cheap">cheap</option>
    <option value="medium">medium</option>
    <option value="expensive">expensive</option>
    </select>
    
    </b-col>
    </b-row>
    

    

   <div>
    <input disabled type="checkbox" id="veggie" name="veggie" value="veggie">
    <label for="veggie">Veggie meal</label>
  </div>

  <br>

    <div id="ingredients-wrapper">
    
    <br>
        
    <span>Ingredients needed:</span>

    <br>

    <label v-for="(ingredient, i) in ingredients" :key="i">Ingredient {{ i + 1}}:
      <input v-model="ingredients[i].name" type="text">
      <span>Quantity:</span>
      <input v-model="ingredients[i].quantity" type="text">
      <select name="unit" form="unit" v-model="ingredients[i].unit">
      <option value="grams">grams</option>
      <option value="centiliters">centiliters</option>
      <option value="units">units</option>
    </select>

    <br>
    
    </label>

    </div>

   <a background="red" @click="addIngredient" value="Add More">Add another ingredient</a>

   

    <div id="step-wrapper">
    
    <br>
    
    <span>Preparation:</span>

    <br>
    
    <label v-for="(step, i) in steps" :key="i">Step {{ i + 1}}:
     <br> <input v-model="steps[i]" type="text"> <br>
      
    
    </label>


    </div>

     <a id="more_fields" @click="addStep" value="Add More">Add another step</a>
    <br><br>


    <label for="advisedDrink">Advised drink:</label>
    <input v-model="advisedDrink" type="text" name="advisedDrink">

    <br><br>

      <span>Upload a picture of your meal:</span>
    <b-field> 
      
         <b-upload v-model="files">
            <a class="button is-primary">
                <b-icon icon="upload"></b-icon>
                <span>Click to upload</span>
            </a>
        </b-upload> 
        <div v-if="files && files.length">
            <span class="file-name">
                {{ files[0].name }}
            </span>
        </div>
      </b-field>

    <br><br>

    <button class="button is-primary">Submit recipe</button>

    </form>

  </div>
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      title: "",
      type: "",
      recommendedDrink: "",
      difficulty: "",
      budget: "",
      steps: [],
      ingredients: [{ name: "", quantity: "", unit: "" }],
      files: [],
      error: null,
      ingredients: [],
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


