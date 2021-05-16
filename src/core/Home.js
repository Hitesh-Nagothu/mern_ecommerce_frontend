import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getCategories } from "./apiCore";
import Card from "./Cards/ProductCard";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySold();
  }, []);

  const loadProductsBySold = () => {
    getCategories("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getCategories("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  return (
    <Layout title="Home Page" description="React App for Ecommerce" className="container-fluid">
      <h2 className="mb-4">Best Sellers</h2>
      <div className="row">
        {productsBySell.map((product, i) => {
          return <Card key={i} product={product} />;
        })}
      </div>

      <h2 className="mb-4">New Arrivals</h2>
      <div className="row">
        {productsByArrival.map((product, i) => {
          return <Card key={i} product={product} />;
        })}
      </div>

    </Layout>
  );
};

export default Home;
