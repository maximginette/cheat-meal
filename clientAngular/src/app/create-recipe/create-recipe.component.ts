import { Component, OnInit } from '@angular/core';
import apiNode from '../api';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
})
export class CreateRecipeComponent implements OnInit {
  error: string;
  recipeInfo = {
    title: 'maxi',
  }
  constructor() { }

  ngOnInit() {
  }
  createRecipe() {
    apiNode.createRecipe(this.recipeInfo).then(() => {}).catch(err => {
        this.error = err;
      });
  }

}
