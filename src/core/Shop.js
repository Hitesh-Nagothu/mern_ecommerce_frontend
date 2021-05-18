import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Cards/ProductCard";

import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import { prices } from "./FixedPrices";
import RadioBox from "./RadioBox.js";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });

  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const [size, setSize] = useState(0);

  useEffect(() => {
    loadCategories();
    loadFilteredResults(skip, limit, myFilters);
  }, []);

  const loadFilteredResults = (newFilters) => {
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size)
        setSkip(0)
      }
    });
  };

  const loadMore = () => {

    let toskip = skip + limit

    getFilteredProducts(toskip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, data.data]);
        setSize(data.size)
        setSkip(0)
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size >0 && size>=limit && (
        <button onClick={loadMore} className="btn btn-warning mb-5">Load More</button>
      )
    )
  }

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const handleFilters = (filters, filterBy) => {
    const currentFilters = { ...myFilters };
    currentFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      currentFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(currentFilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];
    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  return (
    <Layout
      title="Shop Page"
      description="Start shopping here!!"
      className="container-fluid"
    >
      <div className="row">
        <h4>Filter By Categories</h4>
        <div className="col-4">
          <Checkbox
            categories={categories}
            handleFilters={(filters) => handleFilters(filters, "category")}
          />
        </div>

        <h4>Filter by price range</h4>
        <div>
          <RadioBox
            prices={prices}
            handleFilters={(filters) => handleFilters(filters, "price")}
          />
        </div>
      </div>
      <div className="col-8">
        <h2 className="mb-4">Products</h2>
        <div className="row">
          {filteredResults.map((p, i) => {
            return <Card key={i} product={p} />;
          })}
        </div>
        {loadMoreButton()}
      </div>
    </Layout>
  );
};

export default Shop;
