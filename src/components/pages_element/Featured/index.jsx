import React from 'react'
import s from './Featured.module.css'


export default function Featured({onClick}) {

 
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
      <h1>Amazing Discounts <br /> on Garden Products!</h1>
      {/* <Link to='/sales'><button className={s.btn}>Check out</button></Link> */}
        <button onClick={onClick} className={s.btn}>Check out</button>
      </div>
     
    </div>
  )
}


