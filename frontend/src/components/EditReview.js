import React, { useState } from 'react'

const EditReview = ({review, updateReview, setEditReviewToggle}) => {

  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);

  const submitHandler = (e) => {
    e.preventDefault();
    updateReview(rating, comment)
  }
  return (
    <div className="editReviewHolder">
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
              className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full mt-4"
            >
              Update Review
            </button>

            <p className="cursor-pointer text-red bg-white-700 hover:bg-white-800 focus:ring-4 focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full mb-2 mt-2"
            onClick={()=>setEditReviewToggle(false)}>Close</p>

          </form>
          </div>
  )
}

export default EditReview