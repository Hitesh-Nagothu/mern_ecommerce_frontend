import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isLoggedIn } from "../auth";
import { Link } from "react-router-dom";
import { createProduct, getCategories } from "./apiAdmin";

const AddProduct = () => {
  const { user, token } = isLoggedIn();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
        console.log(categories);
      }
    });
  };
  useEffect(() => {
    init();
  }, []);

  const handleChange = (objectName) => (event) => {
    const value =
      objectName === "photo" ? event.target.files[0] : event.target.value;

    formData.set(objectName, value);

    setValues({ ...values, [objectName]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();

    setValues({ ...values, error: "", loading: true });

    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          price: "",
          quantity: "",
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };

  const newProductForm = () => {
    return (
      <form className="mb-3" onSubmit={clickSubmit}>
        <h4>Product Photo</h4>
        <div className="form-group">
          <label className="btn btn-secondary">
            <input
              onChange={handleChange("photo")}
              type="file"
              name="photo"
              accept="image/*"
            />
          </label>
        </div>

        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            onChange={handleChange("name")}
            type="text"
            className="form-control"
            value={name}
          ></input>
        </div>

        <div className="form-group">
          <label className="text-muted">Description</label>
          <textarea
            onChange={handleChange("description")}
            type="text"
            className="form-control"
            value={description}
          ></textarea>
        </div>

        <div className="form-group">
          <label className="text-muted">Price</label>
          <input
            onChange={handleChange("price")}
            type="number"
            className="form-control"
            value={price}
          ></input>
        </div>

        <div className="form-group">
          <label className="text-muted">Category</label>
          <select onChange={handleChange("category")} className="form-control">
            <option>Select Category</option>

            {categories &&
              categories.map((c, idx) => {
                return (
                  <option key={idx} value={c._id}>
                    {c.name}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="form-group">
          <label className="text-muted">Quantity</label>
          <input
            onChange={handleChange("quantity")}
            type="number"
            className="form-control"
            value={quantity}
          ></input>
        </div>

        <div className="form-group">
          <label className="text-muted">Shipping</label>
          <select onChange={handleChange("shipping")} className="form-control">
            <option>Shipping Home?</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        <button className="btn btn-outline-primary">Create Product</button>
      </form>
    );
  };

  const showError = () => {
      return (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
        {error}
    </div>
      );
      
  }

  const showSuccess = () => {
      return (
        <div className="alert alert-info" style= {{dislayp: createdProduct ? '':'none'}}>
        <h2>{`${createdProduct}`} is created</h2>
    </div>
      );
     
  }

  return (
    <Layout
      title="Add a new product"
      description={`G'day ${user.name}, ready to add a new product?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
            {showError()}    
            {showSuccess()}
            {newProductForm()}
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
