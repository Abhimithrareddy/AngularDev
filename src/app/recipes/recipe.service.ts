import {Recipe, } from './recipe.model';
import { Injectable  } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';


@Injectable()
export class RecipeService {
recipesChanged = new Subject<Recipe[]>();

private  recipes: Recipe[] = [new
    Recipe(
      'Tasty Schnitzel',
     'A super-tasty Schnitzel - just',
'https://www.foodiecrush.com/wp-content/uploads/2018/10/Pork-Schnitzel-foodiecrush.com-016-683x1024.jpg',
     [
       new Ingredient('Meat', 1),
       new Ingredient('French Fries', 20)
     ]),
     new Recipe(
       'Big Fat Burger',
       'What else can be better than a burger',
       'https://www.seriouseats.com/recipes/images/2015/07/20150728-homemade-whopper-food-lab-35-1500x1125.jpg',
        [
          new Ingredient('Bread', 2),
          new Ingredient('Meat', 2),
          new Ingredient('lettuce', 1)
        ])
      ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    console.log(this.recipes, 'recipes');
    return this.recipes[index];
  }
  constructor(private slService: ShoppingListService) {}

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());

  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());

  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
