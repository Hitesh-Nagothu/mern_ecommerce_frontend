import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "../ProductImage";
import moment, { updateLocale } from "moment";
import { addItem, removeItem, updateItem } from "../cart/cartHelper";

const Card = ({
  product,
  showViewProduct = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveButton= false
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const handleChange = (productId) => (event) => {
    setCount(event.target.value < 1 ? 1 : event.target.value);

    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect tp="/cart" />;
    }
  };

  const showRemoveButtonCart= showRemoveButton => {
    return (
      showRemoveButton && (
        <button onClick={()=>removeItem(product._id)} className="btn btn-outline-danger mt-2 mb-2">
          Remove product
        </button>
      )
    )
  }

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  const showAddToCart = () => {
    return (
      showAddToCartButton && (
        <button
          onClick={addToCart}
          className="btn btn-outline-primary mt-2 mb-2"
        >
          Add To Cart
        </button>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span style={{ color: "blue", padding: "5px" }}>In Stock</span>
    ) : (
      <span style={{ color: "red", padding: "5px" }}>Out of Stock</span>
    );
  };

  return (
    <div className="col-4 mb-3">
      <div className="card">
        <div className="card-header">{product.name}</div>
        <div className="card-body">
          {shouldRedirect(redirect)}
          <ShowImage item={product} url="products" />
          <p className="lead mt-2">{product.description}</p>
          <p className="black-9">${product.price}</p>

          {showViewProduct && (
            <Link to={`/product/${product._id}`}>
              <button className="btn btn-outline-primary mt-2 mb-2">
                View Product
              </button>
            </Link>
          )}

          {showStock(product.quantity)}
          {showAddToCart()}
          {showCartUpdateOptions(cartUpdate)}
          {showRemoveButtonCart(showRemoveButton)}
          <p className="black-8">
            {" "}
            Added {moment(product.createdAt).fromNow()}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
