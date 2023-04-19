import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import DataContext from "./context/DataContext";
import api from "./api/posts";
import useAxiosFetch from "./hooks/useAxiosFetch";

const Nav = () => {
  const [search, setSearch] = useState("");
  const { data } = useAxiosFetch(
    "http://localhost:3001/recipes/"
  );

  const { setRecipes, categorie, recipes } = useContext(DataContext);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await api.get("/recipes", { params: { like: search } });
      if (!response.data) {
      }
      setRecipes(response.data);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const clearSearch = () => {
    setRecipes(data);
    setSearch("");
  };

  return (
    <div className="Nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      <div className="searchForm">
        <form onSubmit={handleSearch}>

          <input
            id="search"
            type="text"
            autoComplete="off"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            className="resetButton"
            type="reset"
            onClick={() => clearSearch()}
          >
            X
          </button>

          <button className="searchButton" type="submit">
            Find
          </button>
        </form>
      </div>
    </div>
  );
};

export default Nav;
