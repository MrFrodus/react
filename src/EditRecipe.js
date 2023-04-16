import React from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import DataContext from "./context/DataContext";
import api from "./api/posts";

const EditRecipe = () => {
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const {
    recipes,
    setRecipes,
    categories,
    setSelectedCategory,
    selectedCategory,
  } = useContext(DataContext);
  const navigate = useNavigate();

  const handleEdit = async (id) => {
    try {
      const updatedRecipe = {
        name: editTitle,
        description: editBody,
        categoryId: selectedCategory,
      };

      const response = await api.patch(`/recipes/${id}`, updatedRecipe);
      setRecipes(
        recipes.map((recipe) =>
          recipe.id === id ? { ...response.data } : recipe
        )
      );
      setEditTitle("");
      setEditBody("");
      setSelectedCategory(categories[0].id);
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const { id } = useParams();

  const recipe = recipes.find((recipe) => recipe.id.toString() === id);
  console.log(recipe)

  useEffect(() => {
    if (recipe) {
      setEditTitle(recipe.name);
      setEditBody(recipe.description);
    }
  }, [recipe, setEditTitle, setEditBody]);

  return (
    <div>
      {recipe && (
        <>
          <form className="addForm" onSubmit={(e) => e.preventDefault()}>
            <div>Edit Post</div>
            <div>
              <label htmlFor="editRecipeName"></label>
              <input
                type="text"
                id="editRecipeName"
                placeholder="Edit name"
                value={editTitle}
                required
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <label htmlFor="category-name">Category</label>
              <select
                name="category-name"
                required
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option
                    value={cat.id}
                    key={cat.id}
                    selected={cat.id === recipe.categoryId}
                  >
                    {cat.name}
                  </option>
                ))}
              </select>
              <label htmlFor="text" id="editRecipeDescription"></label>
            </div>
            <div>
              <textarea
                id="editRecipeDescription"
                placeholder="Edit description"
                required
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
              />
              <button
                className="submitButton"
                type="submit"
                onClick={() => handleEdit(recipe.id)}
              >
                Submit
              </button>
            </div>
          </form>
        </>
      )}
      {!recipe && (
        <>
          <h2>Recipe Not Found</h2>
          <p>Well, that's disappointing.</p>
          <p>
            <Link to="/">Visit Our Homepage</Link>
          </p>
        </>
      )}
    </div>
  );
};

export default EditRecipe;
