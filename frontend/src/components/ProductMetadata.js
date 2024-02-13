import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { createProductReview } from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import Rating from "./Rating";
import { Link, useNavigate } from 'react-router-dom'

const ProductMetadata = ({product}) => {
//   const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
//   const productDetails = useSelector((state) => state.productDetails);
//   const { loading, error, product } = productDetails;

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;
//   console.log(product)
//   console.log(userInfo)
const deniedEntries = [
   "_id",
   "name",
   "price",
   "user",
   "image",
   "rating",
   "numReviews",
   "countInStock",
   "__v",
   "createdAt",
   "reviews",
   "new",
   "variation",
   "updatedAt",
   "description",
   "category",
   "tag",
   "discount"
 ];
 let entries={};
 let entriesCount=0;
 Object.entries(product).map(([key, val]) => {   
   if (deniedEntries.indexOf(key) > -1){}
   else{
      entries[`${key}`]=val;
      entriesCount++;
   }
})

// console.log(product)
// console.log(entries)
// console.log(entriesCount)

const searchTerm =(query) =>{
  //  navigate(`/`)
}

return (
   <div className="py-12 px-4 md:px-6 2xl:px-0 2xl:container 2xl:mx-auto flex justify-center items-center">
   <div className="flex flex-col justify-start items-start w-full space-y-8">
     <div className="flex flex-col justify-start items-start ">
       <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
         Product Details
       </p>
     </div>
     <div className="productDetails">
       <div className="fullDescription">
         <p>{product.description}</p>
         <div className="catList">
           <span>Categories: </span>
           {product.category.map((val, i, arr) => {
               return <span key={i} onClick={()=>searchTerm(val)} className="singleCat">{val}</span>;
            })}
         </div>
         <div className="catList">
           <span>Tags: </span>
           {product.tag.map((val, i, arr) => {
               return <span key={i} onClick={()=>searchTerm(val)} className="singleCat">{val}</span>;
           })}
         </div>
       </div>
       <div className="index-tableContainer">
         {Object.entries(entries).map(([key, val]) => {
           return (
               <div className={`index-row ${entriesCount>2?`dividerBorder`:``}`} key={key}>
                 <div className="index-rowKey">{key}</div>
                 <div className="index-rowValue">{val}</div>
               </div>
           );
         })}
       </div>
     </div>
   </div>
 </div>
   );
};

export default ProductMetadata;
