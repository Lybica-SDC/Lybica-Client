import axios from 'axios';
import React, {
  useContext, createContext, useState, useEffect,
} from 'react';
import ProductInfo from './ProductInfo';
import ProductOverview from './ProductOverview';
import StyleSelector from './StyleSelector';
import AddToCart from './AddToCart';
import Gallery from './Gallery';
import { ProductContext } from '../../contexts/ProductContext';
import Features from './Features';
import { generateAverage } from '../RIC/HelperFunctions';
import Stars from '../RIC/Stars';
import ExpandedView from './ExpandedView';

export const CurrentProduct = createContext(null);

function Overview() {
  const { setReviewsMeta, product } = useContext(ProductContext);
  const [dataRetrieved, setDataRetrieved] = useState(true);
  const [styles, setStyles] = useState([]);
  const [features, setFeatures] = useState(product.features);
  const [currentStyle, setCurrentStyle] = useState({});
  const [inventory, setInventory] = useState({});
  const [styleID, setStyleID] = useState(0);
  const [styleName, setStyleName] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [stylePhotos, setStylePhotos] = useState([]);
  const [rating, setRating] = useState(0);
  const [numOfRatings, setNumOfRatings] = useState(0);
  const [normalView, setNormalView] = useState(true);

  // useEffect(() => {
  //   axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${product.id}`, {
  //     headers: { Authorization: process.env.AUTH_TOKEN },
  //   })
  //     .then((response) => {
  //       setDataRetrieved(true);
  //       setFeatures(response.data.features);
  //     })
  //     .catch((err) => {
  //       console.log('cant get prod details: ', err);
  //     });
  // }, [product.id]);

  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${product.id}/styles`, {
      headers: { Authorization: process.env.AUTH_TOKEN },
    })
      .then((response) => {
        setStyles(response.data.results);
        const IDnumber = response.data.results[0].style_id;
        setStyleID(IDnumber);
        setCurrentStyle(response.data.results[0]);
        // console.log('current Style', response.data.results[0].skus);
        setInventory(response.data.results[0].skus);
        setStyleName(response.data.results[0].name);
        setMainImage(response.data.results[0].photos[0].url);
        setStylePhotos(response.data.results[0].photos);
      })
      .catch((err) => {
        console.log('error getting prod styles: ', err);
      });
  }, [product.id]);

  useEffect(() => {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta', {
      headers: {
        Authorization: process.env.AUTH_TOKEN,
      },
      params: {
        product_id: product.id,
      },
    })
      .then((results) => {
        setReviewsMeta(results.data);
        const avgRating = generateAverage(results.data.ratings);
        setNumOfRatings(avgRating[1]);
        setRating(avgRating[0]);
      })
      .catch((err) => {
        console.log('err getting metadata: ', err);
      });
  }, [product.id]);

  const changeStyle = (elementID) => {
    setStyleID(Number(elementID));
    const newStyle = styles.filter((style) => style.style_id === Number(elementID));
    setStyleName(newStyle[0].name);
    setCurrentStyle(newStyle[0]);
    setMainImage(newStyle[0].photos[0].url);
    setStylePhotos(newStyle[0].photos);
  };
  const changeMain = (newMainURL) => {
    setMainImage(newMainURL);
  };
  const changeView = () => {
    setNormalView(!normalView);
  };
  if (!dataRetrieved) {
    return (<div>Retrieving data</div>);
  }

  if (!normalView) {
    return (
      <div className="">
        <div className="w-[100%] max-h-[100%] rounded-md">
          <ExpandedView
            styleID={styleID}
            stylePhotos={stylePhotos}
            mainImage={mainImage}
            changeMain={changeMain}
            changeView={changeView}
          />
        </div>

        <div className="flex flex-row w-[100%] justify-center mt-[10px]">
          <ProductOverview slogan={product.slogan} description={product.description} />
          <Features features={features} />
        </div>
      </div>
    );
  }
  return (
    <div className="justify-center content-center">
      <div className="mx-auto place-self-center flex flex-row justify-end flex-wrap max-w-[90%] h-[650px]">
        <div className="w-[55%] max-h-[100%] mr-[10px] rounded-md">
          <Gallery
            styleID={styleID}
            stylePhotos={stylePhotos}
            mainImage={mainImage}
            normalView={normalView}
            changeMain={changeMain}
            changeView={changeView}
          />
        </div>
        <div className="flex flex-col w-[40%] mt-[10px]">
          {numOfRatings
            ? (
              <div>
                <Stars rating={rating} numReviews={numOfRatings} color="EDF1FF" />
                <a className="underline scroll-auto" href="#RR">
                  Read all
                  {' '}
                  {numOfRatings}
                  {' '}
                  Reviews!
                </a>
              </div>
            )
            : null}
          <ProductInfo
            currentStyle={currentStyle}
            category={product.category}
            name={product.name}
          />
          <StyleSelector
            styles={styles}
            styleName={styleName}
            changeStyle={changeStyle}
            styleID={styleID}
          />
          <AddToCart
            inventory={inventory}
          />
        </div>
      </div>
      <div className="flex flex-row w-[100%] justify-center mt-[10px]">
        <ProductOverview slogan={product.slogan} description={product.description} />
        <Features features={features} />
      </div>
    </div>
  );
}

export default Overview;
