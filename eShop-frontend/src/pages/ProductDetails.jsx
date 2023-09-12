import { useParams } from "react-router-dom";
import "../css/Products.css";
import { useEffect, useState } from "react";
import useAxios from "../utils/useAxios";

export default function ProductDetails() {
  const [product, setProduct] = useState({});
  let { id } = useParams();

  const api = useAxios();
  const getProduct = async () => {
    await api.get(`/view-product/${id}/`).then((res) => {
      if (res.status === 200) {
        setProduct(res.data);
      }
    });
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    // Display the product details here
    <>
      <h1>Product Details {id}</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{product.price}</h6>
          {/* <img src={product.image} alt={product.title} /> */}
          <p className="card-text">{product.description}</p>
        </div>
      </div>
    </>
  );
}
