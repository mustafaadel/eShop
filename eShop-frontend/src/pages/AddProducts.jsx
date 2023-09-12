import Swal from "sweetalert2";
import "../css/AddProducts.css";
import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";
import { useNavigate } from "react-router-dom";

function AddProducts() {
  const navigate = useNavigate();
  const { user, userPermissions, logoutUser } = useContext(AuthContext);
  const admin = user.is_admin;
  let api = useAxios();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user.user_id);
    const product = {
      title: e.target.title.value,
      description: e.target.description.value,
      price: e.target.price.value,
      user: user.user_id,
    };
    api
      .post(`/create-product/`, product)
      .then((res) => {
        if (res.status === 201) {
          Swal.fire({
            title: "Product Added Successfully",
            icon: "success",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              title.value = "";
              description.value = "";
              price.value = "";
              navigate("/products");
            }
          });
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          Swal.fire({
            title: "Unauthorized",
            icon: "error",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              logoutUser();
            }
          });
        } else if (err.response.status === 403) {
          Swal.fire({
            title: "Forbidden",
            icon: "error",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              logoutUser();
            }
          });
        } else if (err.response.status === 400) {
          Swal.fire({
            title: "Bad Request",
            icon: "error",
            confirmButtonText: "Ok",
          });
        } else if (err.response.status === 500) {
          Swal.fire({
            title: "Internal Server Error",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      });
  };

  if (user && userPermissions.includes("api.can_add_product")) {
    return (
      <>
        <h1>Add Products</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Product Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter Product title"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Product Description
            </label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              placeholder="Enter Product Description"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Product Price
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              placeholder="Enter Product Price"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
        </form>
      </>
    );
  } else {
    return (
      <div>
        <h1>Unauthorized!</h1>
      </div>
    );
  }
}

export default AddProducts;
