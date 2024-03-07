import React, { useEffect } from "react";
import s from "./ProductsPageByCategory.module.css";
import ProductItem from "../../components/pages_element/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getCategoryProducts,
  selectFilteredProductsByCategory,
} from "../../features/categoryProducts/categoryProductsSlice.js";
import Breadcrumbs from "../../components/UI/Breadcrumbs/Breadcrumbs.jsx";
import FilterPanelCopy from "../../components/pages_element/FilterPanel/indexcopy.jsx";
import { useBreadcrumbs } from "./hooks/useBreadCrumbs.js";

export default function ProductsPageByCategory() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { list, category, isLoading } = useSelector(
    selectFilteredProductsByCategory
  );

  useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(getCategoryProducts(id));
  }, [id]);

  console.log(
    `ProductsPageByCategory/index.jsx - line: 38 ->> category`,
    category
  );

  const breadcrumbs = useBreadcrumbs(category);

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

            {/* //TODO 
            /**
              * refactor to FilterPanel with props...
              **/}
            <FilterPanelCopy />

            {!isLoading && category && <h2>{category.title}</h2>}
          </div>
          <div className={s.category_container}>
            {list.length > 0 &&
              list.map((elem) => (
                <ProductItem
                  data={elem}
                  category={category}
                  key={elem.id + elem.title}
                />
              ))}
            {!isLoading && (!list || list.length === 0) && (
              <div>Sorry no products</div>
            )}
          </div>
        </div>
      </>
    );
}
