import LineRecipe from "./LineRecipe";
import { useContext } from "react";
import DataContext from "./context/DataContext";
import SortBar from "./SortBar";

const RecipesList = () => {
  const { recipes } = useContext(DataContext);

  return (
    <>
      <SortBar />
      <ol>
        {recipes.map((recipe) => (
          <LineRecipe key={recipe.id} recipe={recipe} />
        ))}
      </ol>
    </>
  );
};

export default RecipesList;
