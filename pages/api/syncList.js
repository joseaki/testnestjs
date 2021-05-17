// https://api.spoonacular.com/recipes/:id/information?includeNutrition=true&apiKey=28bfa6f5cf2c4a98ae1610c2ce5cac8d

import { getRecipes, getAllRecipesDetails, saveRecipesDetails } from "../../mongo/recipes"


export default async (req, res) => {
  const recipes = await getRecipes();
  const recipesDetails = await getAllRecipesDetails();
  const missingRecipeDetails = recipes.filter(recipe=>!recipesDetails.find(detail=>detail.id===recipe.id));
  
  for (let i = 0; i < missingRecipeDetails.length; i++) {
    const recipeToGet = missingRecipeDetails[i];
    const resp = await fetch(`https://api.spoonacular.com/recipes/${recipeToGet.id}/information?includeNutrition=true&apiKey=28bfa6f5cf2c4a98ae1610c2ce5cac8d`)
    const respJson = await resp.json();
    await saveRecipesDetails(respJson);
  }
  res.status(200).json({sync: true})
}