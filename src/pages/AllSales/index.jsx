import React, { useEffect } from "react";
import SaleModule from "../../components/pages_element/SaleModule";
import { useDispatch } from "react-redux";

export default function AllSales() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <SaleModule />;
}
