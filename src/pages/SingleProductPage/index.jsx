import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getSingleProduct } from "../../features/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { ROOT_URL } from "../..";
import s from "./SingleProductPage.module.css";
import { addItemToCart } from "../../features/user/userSlice";
import Breadcrumbs from "../../components/UI/Breadcrumbs/Breadcrumbs";
import { useBreadcrumbs } from "./hooks/useBreadcrumbs";

export default function SingleProductPage({ item, data }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true); //
    setTimeout(() => setIsClicked(false), 600);
  };
  const [showFullDescription, setShowFullDescription] = useState(false);
  const maxCharacters = 200;

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const { details, isLoading } = useSelector((state) => state.singleProduct);
  const title = details && details.length > 0 ? details.title : "";

  const { related, list } = useSelector(({ products }) => products);

  useEffect(() => {
    if (!data || !list.length) return;
    // dispatch(getRelatedProducts(data.category.id));

    dispatch(getSingleProduct(id));
  }, [data, dispatch, list.length, id]);

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  console.log(`SingleProductPage/index.jsx - line: 47 ->> details`, details);

  const breadcrumbs = useBreadcrumbs(details);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const addToCart = () => {
    dispatch(addItemToCart({ ...details[0], quantity: quantity }));
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  return (
    <>
      {Array.isArray(details) && details.length > 0 ? (
        <div key={details[0].id} className="container">
          <div className={s.crumbs__container}>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          </div>
          {details.map(
            ({ id, title, description, price, image, discont_price }) => (
              <div key={id} className={s.wrapper}>
                <div className={s.image}>
                  <img src={ROOT_URL + image} alt={title} className={s.image} />
                </div>
                <h2 className={s.title}>{title}</h2>
                <div className={s.price}>
                  {discont_price !== null ? (
                    <div className={s.discount__wrapper}>
                      <span
                        className={s.discounted_price}
                      >{`$${discont_price}`}</span>
                      <span className={s.original_price}>{`$${price}`}</span>
                      <span className={s.discount_percent}>
                        {`-${((1 - discont_price / price) * 100).toFixed(0)}%`}
                      </span>
                    </div>
                  ) : (
                    <span className={s.normal_price}>{`$${price}`}</span>
                  )}
                </div>
                <div className={s.counter__container}>
                  <div className={s.count__wrapper}>
                    <button className={s.count_btn} onClick={handleDecrement}>
                      -
                    </button>
                    <div className={s.count}>{quantity}</div>
                    <button className={s.count_btn} onClick={handleIncrement}>
                      +
                    </button>
                  </div>

                  <button
                    className={`${s.button} ${isClicked ? s.click : ""}`}
                    onClick={addToCart}
                  >
                    {" "}
                    Add to cart
                  </button>
                </div>

                <div className={s.description__wrapper}>
                  <p>
                    {showFullDescription
                      ? description
                      : description.length > maxCharacters
                      ? description.slice(0, maxCharacters) + "..."
                      : description}
                  </p>
                  {description.length > maxCharacters && (
                    <button
                      className={s.description__btn}
                      onClick={toggleDescription}
                    >
                      {showFullDescription ? "Read less" : "Read more"}
                    </button>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      ) : null}
    </>
  );
}
