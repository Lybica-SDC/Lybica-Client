import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Overview from './Overview';
import RelatedItemsAndComparison from './RIC';
import QA from './QA';
import RatingsAndReviews from './RatingsAndReviews';
import { ProductContext } from '../contexts/ProductContext';
import Loading from './RIC/Loading';
import Navigation from './Navigation';

// const useFetchData = async (url, options) => {
//   const res = await axios.get(url, { headers: { Authorization: 'key'}, ...options});
//   return res.json()
// }

function App() {
  // const [product, setProduct] = useState({});
  const [itemsTotal, setItemsTotal] = useState(0);
  const {
    product, setProduct,
  } = useContext(ProductContext);

  useEffect(() => {
    axios
      .get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/40348', {
        headers: {
          Authorization: process.env.AUTH_TOKEN,
        },
      })
      .then((result) => {
        setProduct(result.data);
      })
      .catch((err) => {
        throw new Error('Error in getting data', err);
      });
  }, []);

  const changeProdClick = (prodId) => {
    setProduct({});
    axios
      .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${prodId}`, {
        headers: {
          Authorization: process.env.AUTH_TOKEN,
        },
      })
      .then((result) => {
        setProduct(result.data);
      })
      .catch((err) => {
        throw new Error('Error in changing product', err);
      });
  };

  const incrementCart = (e) => {
    e.preventDefault();
    setItemsTotal(itemsTotal + 1);
  };

  return (
    <div>
      {product.id === undefined
        ? <Loading />
        : (
          <div className="font-display">
            <div className="max-w-[100%] mb-[10px]">
              <Navigation itemsTotal={itemsTotal} />
            </div>
            <div className="max-w-[90%] mx-auto">
              <Overview incrementCart={incrementCart} />
              <div className="h-[7rem]" />
              <RelatedItemsAndComparison changeProdClick={changeProdClick} />
              <div className="h-[40rem]" />
              <QA />
              <div className="h-[2rem]" />
              <RatingsAndReviews />
            </div>
          </div>
        )}
    </div>
  );
}

export default App;
