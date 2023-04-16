import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "./context/DataContext";
import api from "./api/posts";

const LineRecipe = ({ recipe }) => {
  const { recipes, setRecipes } = useContext(DataContext);

  const handleDelete = async (id) => {
    try {
      console.log(id);
      await api.delete(`/recipes/${id}`);
      const recipesList = recipes.filter((recipe) => recipe.id !== id);
      setRecipes(recipesList);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <li className="recipe">
      <div className="recipe-content">
        <div>{recipe.name}</div>
        <div>{recipe.categoryName}</div>
        <div>{recipe.description}</div>
      </div>
      <div className="delete-button">
        <FaTrashAlt
          onClick={() => handleDelete(recipe.id)}
          role="button"
          tabIndex="0"
          aria-label={`Delete ${recipe.item}`}
        />
        <Link to={`/edit/${recipe.id}`}>
          <button className="editButton">Edit Recipe</button>
        </Link>
      </div>
    </li>
  );
};

export default LineRecipe;
