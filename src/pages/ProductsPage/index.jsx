import React, { useEffect, useState } from "react";
import s from "./ProductsPage.module.css";
import ProductItem from "../../components/pages_element/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import FilterPanel from "../../components/pages_element/FilterPanel";
import productsSlice, {
  getProducts,
  selectFilteredProducts,
} from "../../features/products/productsSlice";
import Breadcrumbs from "../../components/UI/Breadcrumbs/Breadcrumbs";

export default function ProductsPage() {
  const productList = useSelector(selectFilteredProducts);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getProducts());
  // }, [dispatch]);
  const breadcrumbs = [
    { label: "Main page", path: "/" },
    { label: "All products", path: "/products/all", active: true },
  ];

  return (
    <div className={`${s.wrapper} container`}>
      <div className={s.crumbs__container}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      <div className={s.title}>
        <h2>All products</h2>
      </div>

      {/* <FilterPanel 
        actions={{1,2,3}}
      
      /> */}
      <FilterPanel />
      <div className={s.category_container}>
        {productList.length > 0 &&
          productList.map((elem) => (
            <ProductItem data={elem} key={elem.id + elem.title} />
          ))}
        {productList.length === 0 && <div>Sorry no products</div>}
      </div>
    </div>
  );
}
