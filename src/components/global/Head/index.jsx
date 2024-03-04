import logo from "../../media/logo.png";
import cart from "../../media/icon.png";
import st from "./Header.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTotalItemCount } from "../../../features/user/userSlice";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

export default function Header() {
  const totalItem = useSelector(selectTotalItemCount);
  const [nav, setNav] = useState(true);

  return (
    <header className={st.container__header}>
      <nav
        onClick={() => setNav(!nav)}
        className={`${st.header_wrapper} container`}
      >
        <Link to="/">
          <img className={st.header_logo} src={logo} alt="logo" />
        </Link>
        <div className={st.header_nav_menu}>
          <ul
            className={`${st.menu} ${nav ? st.active : ""}`}
            onClick={() => setNav(!nav)}
          >
            <li className={st.list__item}>
              <Link to="/">Main Page</Link>
            </li>
            <li className={st.list__item}>
              {" "}
              <Link to="/categories">Categories</Link>
            </li>
            <li className={st.list__item}>
              {" "}
              <Link to="/products/all">All products</Link>
            </li>
            <li className={st.list__item}>
              <Link to="/sales">All sales</Link>
            </li>
          </ul>
        </div>
        <Link to="/cart">
          <img className={st.header_img_cart} src={cart} alt="cart" />
          {totalItem > 0 && <div className={st.item__count}>{totalItem}</div>}
        </Link>

        <div className={st.mobile__btn} onClick={() => setNav(!nav)}>
          {nav ? <AiOutlineMenu size={32} /> : <AiOutlineClose size={32} />}
        </div>
      </nav>
    </header>
  );
}
