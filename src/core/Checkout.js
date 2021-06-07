import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";


const Checkout = ({products}) => {

    const getTotal = () => {
        return products.reduce( (current, next)=> {
            return current + next.count*next.price
        }, 0)
    }

    return <div>
        <h2>
            Total : ${getTotal()}
        </h2>
    </div>

}

export default Checkout