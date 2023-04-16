import { createContext, useState, useEffect } from "react";
import api from "../api/posts";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3001/recipes/"
  );

  useEffect(() => {
    setRecipes(data);
  }, [data]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/category");
        setCategories(response.data);
        setSelectedCategory(response.data[0].id);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };

    fetchCategories();
  }, []);

  return (
    <DataContext.Provider
      value={{
        recipes,
        setRecipes,
        categories,
        selectedCategory,
        setSelectedCategory,
        isLoading,
        fetchError,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
