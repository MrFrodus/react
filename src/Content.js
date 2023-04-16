import RecipesList from "./RecipesList";
import { useContext } from "react";
import DataContext from "./context/DataContext";

const Content = () => {
  const { isLoading, fetchError, recipes } = useContext(DataContext);

  return (
    <main>
      {isLoading && (
        <p style={{ marginLeft: 30, marginTop: 10 }}>Loading recipes...</p>
      )}
      {!isLoading && fetchError && <p style={{ color: "red" }}>{fetchError}</p>}
      {!isLoading &&
        !fetchError &&
        (recipes.length ? (
          <RecipesList />
        ) : (
          <p style={{ marginLeft: 30, marginTop: 10 }}>Your list is empty</p>
        ))}
    </main>
  );
};

export default Content;
