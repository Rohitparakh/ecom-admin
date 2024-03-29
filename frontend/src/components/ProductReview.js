import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createProductReview, updateProductReview } from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import Rating from "./Rating";
import EditReview from "./EditReview";

const ProductReview = () => {
  const [menu, setMenu] = useState(true);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [editReviewToggle, setEditReviewToggle] = useState(false);
  const [editReviewId, setEditReviewId] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
// console.log(userInfo)
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    );
  };

  const updateReview = (rating, comment)=>{
    var newReview = product.reviews.filter((val,i)=>{
      return val._id === editReviewId;
    })
    newReview = newReview[0];
    newReview = {...newReview,
                  rating: rating || newReview.rating,
                  comment: comment || newReview.comment
                }
                console.log(newReview)
    dispatch(
      updateProductReview(product._id,newReview)
    );
    setEditReviewToggle(false);
    window.location.reload();
  }
  const editReview = (id) => {
    setEditReviewToggle(true);
    setEditReviewId(id);
  }

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [successProductReview, dispatch]);
 
  useEffect(() => {
 if(editReviewToggle===true){
  document.getElementById("overlay").style.display = "block";
 }else{
  document.getElementById("overlay").style.display = "none";
 }
  }, [editReviewToggle]);
  return (
    <div className="py-12 px-4 md:px-6 2xl:px-0 2xl:container 2xl:mx-auto flex justify-center items-center">
      <div className="flex flex-col justify-start items-start w-full space-y-8">
        <div className="flex flex-col justify-start items-start ">
          <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
            Reviews
          </p>
        </div>
        {errorProductReview && (
          <p className="text-base font-medium leading-none text-gray-800">
            {errorProductReview}
          </p>
        )}
        {userInfo && (
          <form onSubmit={submitHandler} className="w-full">
            <div className="mb-4">
              <label
                htmlFor="rating"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Rating
              </label>
              <select
                id="rating"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-800 focus:border-blue-800 block w-full p-2.5 "
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value={5}>5 - Excellent</option>
                <option value={4}>4 - Very Good</option>
                <option value={3}>3 - Good</option>
                <option value={2}>2 - Fair</option>
                <option value={1}>1 - Poor</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Comment
              </label>
              <textarea
                id="message"
                rows="4"
                className=" block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Leave a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-4"
            >
              Add Your Review
            </button>
          </form>
        )}
        {product.reviews.length === 0 && (
          <p className="text-base font-medium leading-none text-gray-800">
            No Reviews Yet..
          </p>
        )}


        {product.reviews.map((review) => (
          
          <div
            className="w-full flex justify-start items-start flex-col bg-gray-50 p-8"
            key={review._id}
          >
        {editReviewToggle?<EditReview review={review} updateReview={updateReview} setEditReviewToggle={setEditReviewToggle}/>:<></>}
            <div className="flex flex-col md:flex-row justify-between w-full">
              <div className="cursor-pointer mt-2 md:mt-0">
                <Rating value={review.rating} />
              </div>
            </div>
            <div className={"md:block " + (menu ? "block" : "hidden")}>
              <div className="mt-6 flex justify-start items-center flex-row space-x-2.5">
                <div>
                  <img
                    src={`https://avatars.dicebear.com/api/initials/${review.name}.svg`}
                    alt
                    className="h-10 w-10 bg-gray-200 border rounded-full"
                  />
                </div>
                <div className="flex flex-col justify-start items-start space-y-2">
                  <p className="text-base font-medium leading-none text-gray-800">
                    {review.name}
                  </p>
                  <p className="text-sm leading-none text-gray-600">
                    {review.createdAt.substring(0, 10)}
                  </p>                  
                  {
                  review.user==userInfo?._id?(
                  <p class="editReview" onClick={()=>editReview(review._id)}>Edit Review</p>
                  ):null
                  }
                </div>
              </div>
              {/* <div className="flex flex-row justify-between items-start mt-2">
                                <p className="text-xl md:text-2xl font-medium leading-normal text-gray-800">Beautiful addition to the theme</p>
                            </div> */}
              <p className="mt-3 text-base leading-normal text-gray-600 w-full md:w-12/12 xl:w-5/6">
                {review.comment}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReview;
