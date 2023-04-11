import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
// import '../../styles.css';
// import RatingStars from './RatingStars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as farStar, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
// import 'path';
import Loading from './Loading';
import { generateAverage } from './HelperFunctions';
import Modal from './Modal';
import { ProductContext } from '../../contexts/ProductContext';
import Stars from './Stars';

function CardListEntry({
  relatedItem, noModal, removeCard, activeIndex, changeProdClick,
}) {
  const [thumbnail, setThumbNail] = useState('');
  const [numOfRatings, setNumOfRatings] = useState(0);
  const [rating, setRating] = useState(0);
  const [clicked, setClick] = useState(false);
  const [onSale, setSale] = useState(null);
  const [modal, setModal] = useState(false);
  const { product } = useContext(ProductContext);

  useEffect(() => {
    // console.log('related item id', relatedItem.id, 'prodId', product);
    axios
      .get(`/products/${relatedItem.id}/styles`, {
      // .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${relatedItem.id}/styles`, {
        headers: {
          Authorization: process.env.AUTH_TOKEN,
        },
      })
      .then(({ data }) => {
        // console.log('price and photo data', data);
        // console.log(data.results);
        const sale = data.results[0].sale_price;
        if (sale !== null) {
          setSale(sale);
        }
        const photo = data.results[0].photos[0].thumbnail_url;
        if (photo === null) {
          // console.log(__dirname);
          // setThumbNail(path.join(__dirname, 'assets/Image_not_available.png'));
          setThumbNail('./assets/Image_not_available.png');
        } else {
          setThumbNail(photo);
        }
      })
      .catch((err) => console.log(`Error ${err} in CardListEntry axios get request`));

    axios
      .get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta', {
        headers: {
          Authorization: process.env.AUTH_TOKEN,
        },
        params: {
          product_id: relatedItem.id,
        },
      })
      .then((results) => {
        // console.log('ratings data', results);
        // console.log(results.data.ratings);
        const avgRating = generateAverage(results.data.ratings);
        setNumOfRatings(avgRating[1]);
        setRating(avgRating[0]);
      })
      .catch((err) => console.log(`Error ${err} in CardListEntry axios get request`));
  }, []);

  return (
    <div>
      {thumbnail.length === 0 || rating.length === 0 ? <Loading />
        : (
          <div data-testid="cardListEntry" className="relative grid-cols-3 grid-rows-3 transition-transform" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            <div className="shrink-0 bg-[#EFE1CE] grid rounded-lg shadow-xl hover:shadow-[#926AA6] h-96 w-48">
              <div className="bg-white grid rounded-lg rounded-b-none h-60 w-48 content-center">
                <img src={thumbnail} alt="item thumbnail" className="rounded-lg max-h-56 w-40 justify-self-center content-center shadow-lg object-cover" />
              </div>
              <div className="ml-2 mr-2">
                <div data-testid="card-category" className="text-[#798EA4] text-lg">{relatedItem.category}</div>
                <div
                  data-testid="card-name"
                  role="button"
                  className="text-pastelBlack text-2xl hover:cursor-pointer flow-text whitespace-normal break-words"
                  onClick={() => {
                    changeProdClick(relatedItem.id);
                  }}
                  tabIndex={0}
                  onKeyPress={() => {
                    changeProdClick(relatedItem.id);
                  }}
                >
                  {relatedItem.name}
                </div>
                {onSale === null
                  ? <div data-testid="card-price" className="text-[#798EA4] text-sm">{`$${relatedItem.default_price}`}</div>
                  : (
                    <div data-testid="card-price">
                      <div className="text-red-500 line-through text-sm">
                        {relatedItem.default_price}
                      </div>
                      <div>{onSale}</div>
                    </div>
                  )}
                <div className="text-[#798EA4] text-sm">
                  <Stars rating={rating} numReviews={numOfRatings} color="EFE1CE" />
                </div>
              </div>
              {noModal === undefined && (
              <button
                data-testid="compare-button"
                className="absolute text-black hover:text-[#926AA6] hover:underline hover:cursor-pointer w-fit text-xs bottom-7 right-2"
                type="button"
                onClick={() => {
                  setModal(!modal);
                }}
              >
                Compare
              </button>
              )}
            </div>
            {noModal === undefined
              ? (
                <div>
                  {!clicked
                    ? (
                      <button
                        type="button"
                        onClick={() => {
                          setClick(!clicked);
                        }}
                        tabIndex={0}
                        onKeyPress={() => {
                          setClick(!clicked);
                        }}
                      >
                        <FontAwesomeIcon icon={faStar} style={{ color: '#ffffff' }} className="absolute top-2 right-2" />
                        <FontAwesomeIcon icon={farStar} style={{ color: '#000000' }} className="absolute top-2 right-2" />
                      </button>
                    )
                    : (
                      <button
                        type="button"
                        onClick={() => {
                          setClick(!clicked);
                        }}
                        tabIndex={0}
                        onKeyPress={() => {
                          setClick(!clicked);
                        }}
                      >
                        <FontAwesomeIcon icon={faStar} style={{ color: '#fff700' }} className="absolute top-2 right-2" />
                        <FontAwesomeIcon icon={farStar} style={{ color: '#000000' }} className="absolute top-2 right-2" />
                      </button>
                    )}
                </div>
              )
              : (
                <button
                  type="button"
                  onClick={() => {
                    removeCard(relatedItem);
                  }}
                  tabIndex={0}
                  onKeyPress={() => {
                    removeCard(relatedItem);
                  }}
                >
                  <FontAwesomeIcon icon={faCircleXmark} style={{ color: '#000000' }} className="absolute bottom-7 right-2" />
                </button>
              )}
          </div>
        )}
      <div className="">
        {noModal === undefined && modal && (
        <Modal
          data-testid="modal"
          relatedItem={relatedItem}
          modal={modal}
          setModal={setModal}
          prodFeatures={product.features}
          prod={product}
        />
        )}
      </div>
    </div>
  );
}

export default CardListEntry;
