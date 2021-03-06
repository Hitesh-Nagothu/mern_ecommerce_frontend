import React from "react";
import { API } from "../config";

const ShowImage = ({ item, url }) => {
  return (
      
    <div className="product-img">
        {console.log(item)}
      <img
        src={`${API}/${url}/photo/${item._id}`}
        alt={item.name}
        className="mb-3"
        style={{
            'maxHeight':"100%",
            'maxWidth':"100%"
        }}
      ></img>
    </div>
  );
};

export default ShowImage;