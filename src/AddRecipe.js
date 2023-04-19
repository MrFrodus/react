import React from "react";
import { useState, useContext } from "react";
import DataContext from "./context/DataContext";
import api from "./api/posts";

const AddRecipe = () => {

  const { recipes, setRecipes, categories, selectedCategory, setSelectedCategory} = useContext(DataContext);
  
  const [recipeName, setRecipeName] = useState("");
  const [recipeBody, setRecipeBody] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newRecipe = {
        name: recipeName,
        description: recipeBody,
        categoryId: selectedCategory,
      };
      const newRecipeId = await api.post("/recipes", newRecipe);
      const postedRecipe = await api.get(`/recipes/${newRecipeId.data}`);
      const allRecipes = [...recipes, postedRecipe.data];
      
      setRecipes(allRecipes);
      setRecipeName("");
      setRecipeBody("");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  
  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <h3>New recipe</h3>
      <div>
        <label htmlFor="addRecipeName"></label>
        <input
          type="text"
          id="addRecipeName"
          placeholder="Name"
          value={recipeName}
          required
          onChange={(e) => setRecipeName(e.target.value)}
        />
        <label htmlFor="category-name">Category</label>
        <select
          name="category-name"
          required
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option value={cat.id} key={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <label htmlFor="text" id="addRecipeDescription"></label>
      </div>
      <div>
        <textarea
          id="addRecipeDescription"
          placeholder="Description"
          required
          value={recipeBody}
          onChange={(e) => setRecipeBody(e.target.value)}
        />
        <button className="submitButton" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddRecipe;
