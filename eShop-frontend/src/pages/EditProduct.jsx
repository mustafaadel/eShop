import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "../css/Products.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import useAxios from "../utils/useAxios";

export default function EditProduct() {
  const nav = useNavigate();
  let { id } = useParams();
  const [product, setProduct] = useState({});
  const { authTokens, logoutUser, user, userPermissions } =
    useContext(AuthContext);
  const api = useAxios();
  const getProduct = async () => {
    await api
      .get(`http://127.0.0.1:8000/api/view-product/${id}/`)
      .then((res) => {
        if (res.status === 200) {
          setProduct(res.data);
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
        }
      });
  };
  useEffect(() => {
    getProduct();
  }, []);

  const editProduct = async (e) => {
    e.preventDefault();
    const product = {
      title: e.target.title.value,
      description: e.target.description.value,
      price: e.target.price.value,
      user: user.user_id,
    };
    await api.put(`/edit-product/${id}/`, product).then((res) => {
      if (res.status === 200) {
        Swal.fire({
          title: "Product Updated Successfully",
          icon: "success",
          confirmButtonText: "Ok",
        })
          .then((result) => {
            if (result.isConfirmed) {
              // Navigate to the products page
              nav("/products");
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
      }
    });
  };

  return (
    <>
      <h1>Edit Product</h1>
      <form onSubmit={editProduct}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Product Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter Product title"
            defaultValue={product.title}
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
            defaultValue={product.description}
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
            step={0.01}
            defaultValue={product.price}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Product
        </button>
      </form>
    </>
  );
}
