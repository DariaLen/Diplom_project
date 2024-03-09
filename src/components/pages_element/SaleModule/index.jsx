import s from "./SaleModule.module.css";
import { useSelector } from "react-redux";
import AllProductsBtn from "../../UI/AllProductsBtn";

import { Link } from "react-router-dom";

import FilterPanel from "../FilterPanel";
import { selectFilteredProducts } from "../../../features/products/productsSlice";
import Breadcrumbs from "../../UI/Breadcrumbs/Breadcrumbs";
import ProductItem from "../ProductItem";

export default function SaleModule({ showQuantitySaleItems, id }) {
  const productList = useSelector(selectFilteredProducts);
  let saleProducts = productList.filter((item) => item.discont_price !== null);

  if (showQuantitySaleItems) {
    saleProducts = saleProducts
      .sort((a, b) => {
        const discountA = (a.discont_price / a.price) * 100;
        const discountB = (b.discont_price / b.price) * 100;
        return discountA - discountB;
      })
      .slice(0, showQuantitySaleItems);
  }

  const breadcrumbs = [
    { label: "Main page", path: "/" },
    { label: "All sales", path: "/sales", active: true },
  ];

  const breadcrumbState = [{ label: "All products", path: "/products/all" }];
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
          <ProductItem
            key={product.id}
            data={product}
            breadcrumbState={breadcrumbState}
          />
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
