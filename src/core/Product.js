 import React, {useState, useEffect} from 'react';
 import Layout from './Layout'
 import {getProducts, read} from './apiCore'
 import Card from './Cards/ProductCard'

 const Product = (props) => {

    const [product, setProduct] = useState({})
    const [error, setError]= useState(false)

    const loadProduct = productId => {
        read(productId).then(data=>{
            if (data.error) {
                setError(data.error)
            }
            else{
                setProduct(data)
            }
        })
    }

    useEffect(() => {
        const productId= props.match.params.productId
        loadProduct(productId)
       
    }, [])

     return (
        <Layout
        title={product && product.name}
        description={product && product.description && product.description.substring(0,100)}
        className="container-fluid">
            <h2 className="mb-4">Product Details</h2>
            <Card product={product} showViewProduct={false}></Card>
        </Layout>
     )
 }

 export default Product;
