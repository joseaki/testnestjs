import {useState} from "react";
import {getRecipes} from "../mongo/recipes";
import styles from "../styles/Home.module.css";
import RecipeList from "../components/recipeList";

export async function getStaticProps(){
  const recipes = await getRecipes();
  return ({props:{recipes}, revalidate: 10})
}

export default function Home(props) {
  const [loading, setLoading] = useState(false)
  const {recipes}=props;

  const syncRecipesDetails=async()=>{
    setLoading(true);
    await fetch("/api/syncList");
    setLoading(false);
  }

  return (
    <>
      <button className={styles.button} onClick={syncRecipesDetails} disabled={loading}>
        {loading?"Sincronizando":"Sincronizar"}
      </button>
      <RecipeList recipes={recipes}/>
    </>
  )
}
