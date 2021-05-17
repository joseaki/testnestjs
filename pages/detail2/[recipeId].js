import React from 'react';
import Link from "next/link";
import Image from 'next/image'
import {getRecipeById} from "../../mongo/recipes";
import styles from "../../styles/details.module.css";

export async function getServerSideProps (context) {
  const {recipeId} = context.params;
  const recipe = await getRecipeById(recipeId)
  return {
    props: {recipe}
  }
}



function RecipeDetail(props) {
  const {recipe}=props;
  if (!recipe){
    return <><h1>Sin Datos</h1><Link href="/">Regresar</Link></>
  }
  return (
    <div>
      <h1>{recipe.title}</h1>
      <Image
        src={recipe.image} 
        alt="Picture of the author"
        width={700}
        height={500}
      />
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
            <article key={ingredient.id} className={styles.leaderboard__profile}>
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
