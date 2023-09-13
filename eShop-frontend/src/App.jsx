import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import PrivateRoutes from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import AddProducts from "./pages/AddProducts";
import NavBar from "./components/NavBar";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import EditProduct from "./pages/EditProduct";
import Requests from "./pages/Requests";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <NavBar />
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<HomePage />} exact />
              <Route path="products/">
                <Route index={true} element={<Products />} />
                <Route
                  index={false}
                  path="add/"
                  element={<AddProducts />}
                  exact
                />
                <Route index={false} path=":id/" element={<ProductDetails />} />
                <Route
                  index={false}
                  path="edit/:id/"
                  element={<EditProduct />}
                />
                <Route index={false} path="requests/" element={<Requests />} />
              </Route>
            </Route>
            <Route path="login/" element={<Login />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
