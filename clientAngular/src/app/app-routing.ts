import { Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import {MyProfileComponent} from './my-profile/my-profile.component';

export const routes: Routes = [
  { path: '', component: RecipesComponent },
  { path: 'recipe/:id', component: RecipeDetailsComponent },
  { path: 'create', component: CreateRecipeComponent },
  { path: 'my-profile', component: MyProfileComponent },
  { path: '**', redirectTo: '' }
];
