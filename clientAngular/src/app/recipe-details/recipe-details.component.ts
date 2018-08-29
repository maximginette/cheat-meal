import { Component, OnInit } from '@angular/core';
import apiNode from '../api';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
})
export class RecipeDetailsComponent implements OnInit {
  recipe = {
    title: '',
  };
  id: string;
  update: boolean;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.showRecipe(this.id);
    });

  }
  showRecipe(id) {
    apiNode.getSingleRecipe(id).then(recipe => {
      this.recipe = recipe;
      console.log(recipe);
    });
  }
  showUpdate() {
    this.update = !this.update;
  }
  updateRecipe(id) {
    apiNode.updateRecipe(id, this.recipe).then(recipe => {
      this.recipe = recipe;
      console.log(recipe);
    });
  }
  deleteRecipe(id) {
    apiNode.removeRecipe(id).then(() => {
    });
  }
}
