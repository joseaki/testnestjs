import { MongoClient } from 'mongodb';

export const getRecipes=async()=>{
  const client = await MongoClient.connect(
    'mongodb+srv://nesxtjstest:GBrQb2swbyy47OlF@cluster0.erqi6.mongodb.net/food?retryWrites=true&w=majority'
  );
  const db = client.db();
  const recipesCollection = db.collection('recipes');
  const recipes = await recipesCollection.find().toArray();
  client.close();

  return recipes.map(recipe=>({
    ...recipe,
    _id: recipe._id.toString(),
  }));
}

export const getRecipeById=async(id)=>{
  const client = await MongoClient.connect(
    'mongodb+srv://nesxtjstest:GBrQb2swbyy47OlF@cluster0.erqi6.mongodb.net/food?retryWrites=true&w=majority'
  );
  const db = client.db();
  const recipesCollection = db.collection('recipe_details');
  const recipe = await recipesCollection.findOne({id: parseInt(id)})
  client.close();
  if(recipe){
    return {
      ...recipe,
      _id: recipe._id.toString(),
    };
  }else{
    return false;
  }
  
}

export const getAllRecipesDetails=async()=>{
  const client = await MongoClient.connect(
    'mongodb+srv://nesxtjstest:GBrQb2swbyy47OlF@cluster0.erqi6.mongodb.net/food?retryWrites=true&w=majority'
  );
  const db = client.db();
  const recipesCollection = db.collection('recipe_details');
  const recipesDetails = await recipesCollection.find().project({id:1, title: 1}).toArray();
  client.close();
  return recipesDetails;
}

export const saveRecipesDetails=async(recipeDetails)=>{
  const client = await MongoClient.connect(
    'mongodb+srv://nesxtjstest:GBrQb2swbyy47OlF@cluster0.erqi6.mongodb.net/food?retryWrites=true&w=majority'
  );
  const db = client.db();
  const recipesCollection = db.collection('recipe_details');
  await recipesCollection.insertOne(recipeDetails);
  client.close();
  return true;
}