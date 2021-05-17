import styles from '../styles/Home.module.css'
import {useRouter} from "next/router";

function recipeList(props) {
const router = useRouter();

  const handleProductClick=(recipeId)=>{
    router.push(`/detail/${recipeId}`)
  }

  return (
    props.recipes.map(recipe=>(
      <div key={recipe.id} className={styles.card} onClick={()=>handleProductClick(recipe.id)}>
        <div className={styles.cardLeft}>
          <img className={styles.cardLeftImage} src={`https://spoonacular.com/recipeImages/${recipe.image}`} alt="" />
        </div>
        <div className={styles.cardRight}>
            <h3>{recipe.title}</h3>
            <span>Listo en {recipe.readyInMinutes} minutos</span>
            <hr/>
            <span>Porciones: {recipe.servings}</span>
        </div>
      </div>
    ))
    
  )
}

export default recipeList
