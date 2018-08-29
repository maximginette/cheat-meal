import { Component, OnInit } from '@angular/core';
import apiNode from '../api';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
})
export class RecipesComponent implements OnInit {
  recipes = [];
  constructor() { }
  ngOnInit() {
    this.showRecipes();
  }
  showRecipes() {
    apiNode.getRecipe().then(recipes => {
      this.recipes = recipes;
      console.log(this.recipes);

    });
  }
}
