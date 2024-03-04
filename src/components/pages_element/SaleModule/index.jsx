import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import s from "./SaleModule.module.css";
import { useDispatch, useSelector } from "react-redux";
import AllProductsBtn from "../../UI/AllProductsBtn";
import { addItemToCart } from "../../../features/user/userSlice";

// import { fetchAllProducts } from "../../../asyncActions/products";
import { Link, useNavigate } from "react-router-dom";
import { ROOT_URL } from "../../..";
import FilterPanel from "../FilterPanel";
import { selectFilteredProducts } from "../../../features/products/productsSlice";
import Breadcrumbs from "../../UI/Breadcrumbs/Breadcrumbs";

export default function SaleModule({ showQuantitySaleItems, id }) {
  const productList = useSelector(selectFilteredProducts);
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);
  const navigate = useNavigate();

  let saleProducts = productList.filter((item) => item.discont_price !== null); // []

  if (showQuantitySaleItems) {
    saleProducts = saleProducts
      .sort((a, b) => {
        // Рассчитываем процент скидки для каждого товара
        const discountA = (a.discont_price / a.price) * 100;
        const discountB = (b.discont_price / b.price) * 100;
        // Сравниваем товары по проценту скидки
        return discountA - discountB;
      })
      .slice(0, showQuantitySaleItems);
  }

  const handleAddToCart = (event, product) => {
    event.stopPropagation();
    dispatch(addItemToCart({ ...product }));
    setIsAdded(true);
  };

  const handleClickCard = (id) => {
    navigate(`/products/${id}`);
  };

  //added
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsAdded(false);
    }, 1.5 * 1500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isAdded]);

  const buttonClassName = isAdded
    ? `${s.addToCartButton} ${s.added}`
    : s.addToCartButton;

  const breadcrumbs = [
    { label: "Main page", path: "/" },
    { label: "All sales", path: "/sales", active: true },
  ];
  return (
    <div className={`${s.wrapper} container`}>
      <div>
        {showQuantitySaleItems && (
          <div className={s.title_btn}>
            <h2 className={s.title}>Sale</h2>
            <div className={s.category_line_container}>
              <div className={s.categories_line}></div>
              <Link to="/sales">
                <AllProductsBtn buttonText="All sales" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {!showQuantitySaleItems && (
        <div className={s.title__discount_wrapper}>
          <div className={s.crumbs__container}>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          </div>
          <h2 className={s.title__discount}>Discounted items</h2>
          <FilterPanel hideCheckbox={true} />
        </div>
      )}

      <div className={s.category_container}>
        {saleProducts.map((product) => (
          <div
            onClick={() => handleClickCard(product.id)}
            className={s.category_wrapper}
            key={`${product.id}`}
          >
            <div className={s.image_container}>
              <img
                className={s.category_img}
                src={`${ROOT_URL}${product.image}`}
                alt={`${product.title} || ${product.id}`}
              />
              <button
                disabled={isAdded}
                className={buttonClassName}
                onClick={(event) => handleAddToCart(event, product)}
              >
                {/* Add to Cart */}
                {isAdded ? "Added" : "Add to cart"}
              </button>
              <span className={s.discount_label}>
                {`- ${(
                  (1 - product.discont_price / product.price) *
                  100
                ).toFixed(0)}%`}
              </span>
            </div>

            <div className={s.content_wrapper}>
              <p className={s.category_title} title={`${product.title}`}>
                {`${product.title}`}
              </p>
              <div className={s.price}>
                <span
                  className={s.discounted_price}
                >{`$${product.discont_price} `}</span>
                <span className={s.original_price}>{`$${product.price}`}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={s.btn__media}>
        <Link to="/sales">
          <AllProductsBtn buttonText="All sales" />
        </Link>
      </div>
    </div>
  );
}
