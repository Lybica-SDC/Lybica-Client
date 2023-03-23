import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ProductContext from '../../../../contexts/ProductContext';
import ReviewForm from './ReviewForm';

function WriteReviewModal({ setShowModal, reviewsMeta }) {
  const [productName, setProductName] = useState('');
  const prodID = useContext(ProductContext);
  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${prodID}`, {
      headers: {
        Authorization: process.env.AUTH_TOKEN,
      },
    })
      .then((response) => {
        setProductName(response.data.name);
      });
  }, []);

  return productName !== '' ? (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-3/4 my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex flex-col items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-xl font-bold">Write Your Review</h3>
              <button
                onClick={() => setShowModal(false)}
                className="float-right text-2xl"
                type="button"
              >
                x
              </button>
              <h6 className="text-m">
                About the
                {' '}
                {productName}
              </h6>
            </div>
            <div className="relative p-4 flex-auto">
              <ReviewForm reviewsMeta={reviewsMeta} />
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black" />
    </>
  ) : null;
}

export default WriteReviewModal;
