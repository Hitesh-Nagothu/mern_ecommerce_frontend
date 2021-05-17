import React, {useState, useEffect} from 'react';
import Layout from './Layout'
import Card from "./Cards/ProductCard";
import {getCategories} from '../admin/apiAdmin'
import Checkbox from './Checkbox'

const Shop = () => {
    
    const [categories, setCategories] = useState([])
    const [myFilters, setMyFilters]= useState({
        filters : { category:[], price:[] }
    })

    const [error, setError] = useState(false)

    useEffect(()=>{
        loadCategories();
    }, [])

    const loadCategories =()=> {
        getCategories().then((data)=>{
            if (data.error){
                setError(data.error)
            }
            else {
                setCategories(data)
            }
        })
    }

    const handleFilters = (filters, filterBy) => {
        const currentFilters={...myFilters}
        currentFilters.filters[filterBy]=filters
        setMyFilters(currentFilters)
    }

    return (
        <Layout title="Shop Page" description="Start shopping here!!" className="container-fluid"> 
          <div className="row">
            <h4>Filter By Categories</h4>  
            <div className="col-4">
                <Checkbox categories={categories} handleFilters={ filters=> handleFilters(filters, 'category')} />
            </div>

            <div className="col-8">
                {JSON.stringify(myFilters)}
            </div>

          </div>
        </Layout>
      );
      
}

export default Shop;



