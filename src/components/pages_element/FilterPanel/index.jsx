import React, { useState } from "react";
import s from "./FilterPanel.module.css";
import { BsChevronDown } from "react-icons/bs";
import { useDispatch } from "react-redux";

import {
  // setSearchFilter,
  setCategoryFilters,
  setPriceRangeFilter,
  setSorting,
  getRelatedProducts,
  selectFilteredProducts,
} from "../../../features/products/productsSlice";
import Breadcrumbs from "../../UI/Breadcrumbs/Breadcrumbs";

export default function FilterPanel({ hideCheckbox }) {
  const dispatch = useDispatch();

  // const [searchInput, setSearchInput] = useState('');
  const [priceRange, setPriceRange] = useState({ min: null, max: Infinity });
  const [sortingOption, setSortingOption] = useState("default");
  const [categoryFilter, setCategoryFilter] = useState(false);

  //------
  // const handleSearchInputChange = (event) => {
  //   setSearchInput(event.target.value);
  // };

  // const handleSearch = () => {
  //   dispatch(setSearchFilter(searchInput));
  // };

  const handleCategoryToggle = () => {
    setCategoryFilter(!categoryFilter);
    dispatch(setCategoryFilters(!categoryFilter));
  };

  const handleRangeChange = (event) => {
    const { name, value } = event.target;
    setPriceRange({ ...priceRange, [name]: value ? Number(value) : null });

    const { min, max } = {
      ...priceRange,
      [name]: value ? Number(value) : null,
    };

    dispatch(
      setPriceRangeFilter({
        min: min ? Number(min) : null,
        max: max ? Number(max) : Infinity,
      })
    );
  };

  const handleSortingChange = (event) => {
    setSortingOption(event.target.value);
    dispatch(setSorting(event.target.value));
  };

  // uncontrolled
  // useRef() bad practice
  //

  return (
    <div className="container">
      {/* {!hideCheckbox && <Breadcrumbs />} */}
      <div className={s.filter_wrapper}>
        <div className={s.price_filter}>
          <span>Price</span>
          <form className={s.filter__form}>
            <input
              type="number"
              name="min"
              value={priceRange.min}
              onChange={handleRangeChange}
              placeholder="from"
            />
            <input
              type="number"
              name="max"
              value={priceRange.max}
              onChange={handleRangeChange}
              placeholder="to"
            />
          </form>
        </div>

        {!hideCheckbox && (
          <div className={s.checkbox}>
            <span>Discounted items</span>
            <label className={`${s.checkbox} ${s.style_c}`}>
              <input
                type="checkbox"
                checked={categoryFilter}
                onClick={handleCategoryToggle}
              />
              <div className={s.checkbox__checkmark}></div>
            </label>
          </div>
        )}

        <div className={s.sorter}>
          <span>Sorted</span>
          <select
            className={s.select_sorter}
            value={sortingOption}
            onChange={handleSortingChange}
          >
            <option value="default">by default</option>
            <option value="newest">newest</option>
            <option value="price-high-low">price: high-low</option>
            <option value="price-low-high">price: low-high</option>
          </select>
        
          <BsChevronDown className={s.sorter__check} />
        </div>
      </div>
    </div>
  );
}
