import React, {useEffect, useState} from 'react';
import './Products.scss'
import {useDispatch, useSelector} from "react-redux";
import SwatchesCarousel from "./SwatchesCarousel";
import actions from "../actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons/faChevronRight";


const Products = ({fun}) => {
    const [sortingId, setSortingId] = useState(1)
    const [page, setPage] = useState(1)
    const dispatch = useDispatch()
    const filter = useSelector(state => state.productReducer.filter)
    // console.log(filter)
    const totalProducts = useSelector(state => state.productReducer.totalProducts)
    useEffect(() => {
        filter && dispatch(actions.fetchFilteredData(filter, sortingId))
        filter && dispatch(actions.fetchItemNo(filter))
    }, [filter])
    const products = useSelector(state => state.productReducer.products)
    const women=useSelector(state=>state.productReducer.isWomen)
    const men=useSelector(state=>state.productReducer.isMen)
    // console.log(men,women)
    const [existingPro, setExistingPro] = useState([])
    const optionSelect = evt => {
        // console.log(filter)
        const value = evt.target.value
        if (value === 'Featured') {
            setSortingId(() => {
                let newState = 1
                dispatch(actions.fetchFilteredData(filter, newState))
                return newState
            })
        } else if (value === 'New Arrivals') {
            setSortingId(() => {
                let newState = 2
                dispatch(actions.fetchFilteredData(filter, newState))
                return newState
            })
        } else if (value === 'Top Rated') {
            setSortingId(() => {
                let newState = 3
                dispatch(actions.fetchFilteredData(filter, newState))
                return newState
            })
        } else if (value === 'High') {
            dispatch(actions.fetchRatedData(filter, sortingId))
        } else if (value === 'Low') {
            dispatch(actions.fetchLowData(filter, sortingId))
        }
    }
    const getPage = () => {
        let copyPro = [...products]
        setExistingPro(copyPro)
        setPage(prevState => {
            let newState = prevState + 1
            dispatch(actions.fetchPageData(filter, newState, sortingId, copyPro))
            return newState
        })
    }
    console.log(products)
    const btnArray = Object.keys(filter).map(key => filter[key].filter(arr => arr.isChecked))


    // console.log(btnArray,filter)
    const btns = btnArray.filter(arr => {
        if (arr.length !== 0) {
            return arr
        }
    })
    fun(btns.length)
// console.log(btns)
const closeBtn = arr => {
    // console.log(filter,arr)
        dispatch(actions.closeBtn(arr,filter))
    if(arr.name==='Women'){dispatch(actions.setWomen())}
    if(arr.name==='Men'){dispatch(actions.setMen())}
}
    return (
        <div className='Products'>
           
            <div className='products_top_container'>
                {women&&men?'':women &&  <img
                    src='https://images.lululemon.com/is/image/lululemon/na_dec22_wk4_W_OTM_CDP_Hero_D_WhatsNew?$cdp-hero$&wid=1970&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72'
                    alt=''/> || men && <img src="https://images.lululemon.com/is/image/lululemon/na_dec22_w4_M_OTM_CDP_Hero_D_MensWhatsNew?$cdp-hero$&wid=1970&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72" alt=""/>  }
                </div>
            <div className='products_mid'><p>Need it fast? Use <strong> Available Near You </strong> to buy and pick up
                in store.</p></div>
            <div className='products_bottom'>
                <div className='bottom_left'>
                    <div className='allItems'>All Items({totalProducts})</div>
                    <div className='nearBy'>
                        <span>Available Near You</span>
                     <span className='iconM'><FontAwesomeIcon icon={faChevronRight}/></span>
                    </div>
                </div>
                <div className='sortBy'>
                    Sort by
                    <select className='select' onChange={(evt) => optionSelect(evt)}>
                        <option value='Featured'>Featured</option>
                        <option value='New Arrivals'>New Arrivals</option>
                        <option value='Top Rated'>Top Rated</option>
                        <option value='High'>Price:High to Low</option>
                        <option value='Low'>Price:Low to High</option>
                    </select>
                </div>
            </div>
            {/*<hr/>*/}
            <div className='btnWithClose_container'>
                {btns.map(array => array.map(arr => <button className='btnWithClose'>
                    <span>{arr.name||arr.alt}</span>
                    <span onClick={()=>closeBtn(arr)}><FontAwesomeIcon icon={faXmark} className='closeBtn'/></span>
                </button>))}
            </div>
            <div className='carousel_container'>
                {products.map((arr, index) => <div className='carousel'>
                    <SwatchesCarousel key={index} productId={arr.productId} images={arr?.images}
                                      swatches={arr.swatches} price={arr.price} name={arr.name}/>
                </div>)}
            </div>
            <div className="addMore_Container">
                <p>Viewing {products.length} of {totalProducts}</p>
                <div className="addMore_Btn" onClick={getPage}><FontAwesomeIcon
                    icon={faPlus}/><span>View More Products</span></div>
            </div>
        </div>
    );
};

export default Products;