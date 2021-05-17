import React from 'react'
import Link from "next/link";
import {getRecipeById, getAllRecipesDetails} from "../../mongo/recipes";
import styles from "../../styles/details.module.css";

export async function getStaticProps (context) {
  const {recipeId} = context.params;
  const recipe = await getRecipeById(recipeId)
  return {
    props: {recipe}
  }
}

export async function getStaticPaths(){
  const recipes = await getAllRecipesDetails();
  return {
    fallback: true,
    paths: recipes.map(recipe=>({
      params: {
        recipeId: `${recipe.id }`
      }
    })
    )
  }
}


function RecipeDetail(props) {
  const {recipe}=props;
  if (!recipe){
    return <><h1>Sin Datos</h1><Link href="/">Regregar</Link></>
  }
  return (
    <div>
      <h1>{recipe.title}</h1>
      <img src={recipe.image} className={styles.imageHeader}/>
      <div className={styles.detailsContainer}>
        <div>
          <h2>Instrucciones</h2>
          <p>
            {recipe.instructions}
          </p>
        </div>
        <div>
          <h2>Ingredientes</h2>
          {recipe.extendedIngredients.map(ingredient=>(
            <article className={styles.leaderboard__profile}>
              <img src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`} alt="Elizabeth Holmes" className={styles.leaderboard__picture}/>
              <span className={styles.leaderboard__name}>{ingredient.nameClean}</span>
              <span className={styles.leaderboard__value}>{ingredient.amount}<span>{ingredient.unit}</span></span>
            </article>
          ))}
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html:  recipe.summary }} />
      
    </div>
  )
}


export default RecipeDetail
