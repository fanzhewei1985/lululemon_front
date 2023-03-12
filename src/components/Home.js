import React from 'react';
import './Home.scss'
import Filter from "./Filter";
import Products from "./Products"
import { useState } from 'react';
const Home = () => {
    const[child, setChild]=useState()
const passData=(child)=>{
setChild(child)
}
    return (
        <div className='Home'>
           <Filter child={child}/>
           <Products fun={passData}/>
        </div>
    );
};

export default Home;