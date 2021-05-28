import React from "react";
import { Link } from "react-router-dom";
import ShowImage from '../ProductImage'
import moment from 'moment'

const Card = ({ product, showViewProduct }) => {

  const showAddToCart = () => {
      return <button className="btn btn-outline-primary mt-2 mb-2">
      Add To Cart
    </button>
  }

  const showStock = (quantity) => {
    return quantity > 0 ? <span style={{color:"blue", padding:"5px"}}>In Stock</span> : <span style={{color:"red",  padding:"5px"}}>Out of Stock</span>
  }

  return (
    <div className="col-4 mb-3">
      <div className="card">
        <div className="card-header">{product.name}</div>
        <div className="card-body">
          <ShowImage item={product} url="products" />  
          <p className="lead mt-2">{product.description}</p>
          <p className="black-9">${product.price}</p>
          
         {showViewProduct && <Link to={`/product/${product._id}`}>
            <button className="btn btn-outline-primary mt-2 mb-2">
              View Product
            </button>
          </Link> }
          
          {showStock(product.quantity)}
          {showAddToCart()}
          <p className="black-8"> Added {moment(product.createdAt).fromNow()} </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
