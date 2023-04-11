import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import CardListEntry from './CardListEntry';

function CardList({ prod, changeProdClick }) {
  const prodId = prod.id;
  const [activeIndex, setActiveIndex] = useState(0);
  // set a state for the related items array
  const [relatedItems, setRelatedItems] = useState([]);
  // useEffect to make a get request for the relaed items
  useEffect(() => {
    // console.log('here');
    axios
      .get(`/products/${prodId}/related`, {
      // .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${prodId}/related`, {
        headers: {
          Authorization: process.env.AUTH_TOKEN,
        },
      })
      .then(({ data }) => {
        const uniqueId = [...new Set(data)];
        // console.log('related items id', data);
        const listOfRelatedItems = uniqueId.map((relatedId) => (
          axios
            .get(`/products/${relatedId}`, {
            // .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${relatedId}`, {
              headers: {
                Authorization: process.env.AUTH_TOKEN,
              },
            })
            .then((results) => results.data)
            .catch((err) => console.log(`Error ${err} when retrieving related items`))
        ));
        Promise.all(listOfRelatedItems)
          .then((result) => {
            // console.log('list of related items', result);
            setRelatedItems(result);
          });
      });
  }, [prodId]);

  const handleNext = () => {
    if (activeIndex === relatedItems.length - 1) {
      setActiveIndex(0); // set index back to first element
    } else {
      setActiveIndex(activeIndex + 1); // increment index
    }
  };

  const handlePrev = () => {
    if (activeIndex === 0) {
      setActiveIndex(relatedItems.length - 1); // set index to last element
    } else {
      setActiveIndex(activeIndex - 1); // decrement index
    }
  };

  return (
    <div className="h-[100%] relative flex flex-row space-x-5 max-w-[1100px] h-64 overflow-hidden" data-testid="clContainer">
      {/* map over the related items to create a card for each item */}
      {activeIndex === 0
        ? <div />
        : (
          <div className="absolute left-3 flex h-[28rem] w-24 z-50 bg-gradient-to-r from-[#EDF1FF] to-transparent">
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="absolute left-0 self-center ml-5"
              onClick={() => {
                handlePrev();
              }}
            />
          </div>
        )}
      {relatedItems.length > 0
        && (
        <div className="absolute right-0 flex h-[28rem] w-24 z-50 bg-gradient-to-l from-[#EDF1FF] to-transparent" data-testid="clRAContainer">
          <FontAwesomeIcon
            data-testid="clRightArrow"
            icon={faArrowRight}
            className="absolute right-0 self-center mr-5"
            onClick={() => {
              handleNext();
            }}
          />
        </div>
        )}
      {relatedItems.length === 0
        ? <h1 data-testid="riLoading" className="relative text-pastelBlack left-3"> No Related Items </h1>
        : (
          <div className="relative flex flex-row whitespace-nowrap overflow-hidden space-x-5 w-full h-full left-3" data-testid="cardList">
            {relatedItems.map((relatedItem, i) => (
              <CardListEntry
                key={i}
                relatedItem={relatedItem}
                activeIndex={activeIndex}
                changeProdClick={changeProdClick}
              />
            ))}
          </div>
        )}
    </div>
  );
}

export default CardList;
