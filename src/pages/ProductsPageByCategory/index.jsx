import React, { useEffect } from "react";
import s from "./ProductsPageByCategory.module.css";
import ProductItem from "../../components/pages_element/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FilterPanel from "../../components/pages_element/FilterPanel";
import {
  getCategoryProducts,
  selectFilteredProductsByCategory,
} from "../../features/categoryProducts/categoryProductsSlice.js";
import Breadcrumbs from "../../components/UI/Breadcrumbs/Breadcrumbs.jsx";

export default function ProductsPageByCategory() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { list, category, isLoading } = useSelector(
    selectFilteredProductsByCategory
  );

  console.log(`ProductsPageByCategory/index.jsx - line: 20 ->> list`, list);

  useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(getCategoryProducts(id));
  }, [id]);

  const filteredProducts = list.filter((product) => product.categoryId === id);
  const breadcrumbs = [
    { label: "Main page", path: "/" },
    { label: "Categories", path: "/categories", active: true },
    category &&
      category.title && {
        label: category.title,
        path: `/products/categories/${id}`,
        active: true,
      },
    // {
    //   label: `${list.length && list[0].title}`,
    //   path: `/product/${id}`,
    //   active: true,
    // },
    ...filteredProducts.map((product) => ({
      label: product.title,
      path: `/product/${product.id}`,
      active: true,
    })),
  ].filter((crumb) => crumb && crumb.path);

  if (isLoading) {
    return <div> Loading ... </div>;
  }

  if (!isLoading)
    return (
      <>
        <div className={`${s.wrapper} container`}>
          <div className={s.title}>
            <div className={s.crumbs__container}>
              <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            <FilterPanel />

            {!isLoading && category && <h2>{category.title}</h2>}
          </div>
          <div className={s.category_container}>
            {list.length > 0 &&
              list.map((elem) => (
                <ProductItem data={elem} key={elem.id + elem.title} />
              ))}
            {!isLoading && (!list || list.length === 0) && (
              <div>Sorry no products</div>
            )}
          </div>
        </div>
      </>
    );
}
