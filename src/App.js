
import './App.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Footer from './components/global/Foot';
import Header from './components/global/Head';
import { Routes, Route } from 'react-router-dom'

import MainPage from './pages/MainPage';
import CategoriesPage from './pages/CategoriesPage';
import SingleProductPage from './pages/SingleProductPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';
import AllSales from './pages/AllSales';

import { getCategories } from './features/categories/categoriesSlice';
import productsSlice, { getProducts } from './features/products/productsSlice';
import { getSingleProduct } from './features/api/apiSlice';
import ProductsPageByCategory from './pages/ProductsPageByCategory';


//TODO 
/**
 * 
 * for single product
  * products/product/:id
  **/

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getProducts())
    dispatch(getSingleProduct())
    // dispatch(productsSlice())
  }, [dispatch])

  return (
    <div >
      <Header/>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/categories' element={<CategoriesPage/>}/>
        {/* <Route path='/categories/:id' element={<CategoriesPage/>}/> */}
        <Route path='/products/all' element={<ProductsPage/>}/>
        <Route path='/products/categories/:id' element={<ProductsPageByCategory/>}/>
        <Route path='/products/:id' element={<SingleProductPage />} />
        <Route path='/cart' element={<CartPage/>}/>
        {/* <Route path='/sales' element={<ProductsPage type='category'/>}/> */}
        <Route path='/sales' element={<AllSales type='category'/>}/>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
