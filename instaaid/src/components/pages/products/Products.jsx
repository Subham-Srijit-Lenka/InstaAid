import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import { useSelector } from "react-redux";
import axios from "axios";

const Products = () => {
  const user = useSelector((state) => state.auth.user);
  const [allProducts, setAllProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product");
      setAllProducts(data.products);
      console.log(data.products);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Layout>
      <div>
        {allProducts.map((product) => (
          <div key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Products;
