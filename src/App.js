import Content from "./Content";
import Header from "./Header";
import AddRecipe from "./AddRecipe";
import Nav from "./Nav";
import Missing from "./Missing";
import EditRecipe from "./EditRecipe";
import { Route, Routes } from "react-router-dom";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <div className="App">
      <Header />
      <DataProvider>
        <Nav />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AddRecipe />
                <Content />
              </>
            }
          ></Route>
          <Route path="edit/:id" element={<EditRecipe />}></Route>
          <Route path="*" element={<Missing />}></Route>
        </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
