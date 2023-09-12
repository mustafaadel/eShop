import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../css/Products.css";
import { useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import useAxios from "../utils/useAxios";
function Products() {
  const [products, setProducts] = useState([]);
  const { logoutUser, user, userPermissions } = useContext(AuthContext);
  const api = useAxios();
  const getProducts = async () => {
    await api
      .get("/view-products/")
      .then((res) => {
        if (res.status === 200) {
          setProducts(res.data);
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

  const deleteProduct = async (id) => {
    await api
      .delete(`/delete-product/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          Swal.fire({
            title: "Product Deleted Successfully",
            icon: "success",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              getProducts();
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

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <h1>Products</h1>
      <br />
      {user && userPermissions.includes("api.can_add_product") && (
        <Link to={"add/"} className="btn btn-success mt-3">
          Add Product
        </Link>
      )}
      <table className="table table-striped-columns mt-5 products-table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Product Description</th>
            <th>Product Price</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>
                  <Link
                    to={`${product.id}`}
                    className="btn btn-info btn-sm mb-2"
                  >
                    View
                  </Link>
                  {user && userPermissions.includes("api.can_edit_product") && (
                    <Link
                      className="btn btn-primary btn-sm mb-2"
                      to={`edit/${product.id}`}
                    >
                      Edit
                    </Link>
                  )}
                  {user &&
                    userPermissions.includes("api.can_delete_product") && (
                      <button
                        className="btn btn-danger btn-sm mb-2"
                        onClick={() => {
                          deleteProduct(product.id);
                        }}
                      >
                        Delete
                      </button>
                    )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>{" "}
    </>
  );
}
export default Products;
