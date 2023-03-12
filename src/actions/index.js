import axios from "axios";
import {url,mykey} from "../const";
import {actionType} from "../const";

const fetchAllFilters = () => async dispatch => {
    try {
        let res = await axios.get(url)
        res = res.data.rs
        // console.log(res)
        dispatch({
            type: actionType.FETCH_ALL_FILTERS,
            payload: res
        })
    } catch (e) {
        console.log('error is:', e)
    }
}

const filterItem = (name, key) => {
    return {
        type: actionType.FILTER_DATA,
        payload: {key, name}
    }
}
const fetchItemNo=(filter)=>async dispatch => {
    try {
        let res = await axios.post(`http://api-lulu.hibitbyte.com/product/allProducts?mykey=${mykey}`, filter)
        res = res.data.rs
        // console.log(res)
        dispatch({
            type: actionType.FETCH_ITEM_NO,
            payload: res.pageParams.totalProducts
        })
    } catch (e) {
        console.log('error is:', e)
    }
}

const fetchFilteredData = (filter,sortingId) => async dispatch => {
    try {
        let res = await axios.post(`http://api-lulu.hibitbyte.com/product/allProducts?sortingId=${sortingId}&page=1&mykey=${mykey}`, filter)
        res = res.data.rs
        // console.log(res)
        dispatch({
            type: actionType.FETCH_FILTERED_DATA,
            payload: res.products
        })
    } catch (e) {
        console.log('error is:', e)
    }
}
const fetchRatedData=(filter,sortingId)=>async dispatch => {
    try {
        let res = await axios.post(`http://api-lulu.hibitbyte.com/product/allProducts?sortingId=${sortingId}&page=1&mykey=${mykey}`, filter)
        res = res.data.rs
        // console.log(res)
        dispatch({
            type: actionType.FETCH_RATED_DATA,
            payload: res.products
        })
    } catch (e) {
        console.log('error is:', e)
    }}

const fetchLowData=(filter,sortingId)=>async dispatch => {
    try {
        let res = await axios.post(`http://api-lulu.hibitbyte.com/product/allProducts?sortingId=${sortingId}&page=1&mykey=${mykey}`, filter)
        res = res.data.rs
        // console.log(res)
        dispatch({
            type: actionType.FETCH_LOW_DATA,
            payload: res.products
        })
    } catch (e) {
        console.log('error is:', e)
    }}
const fetchPageData=(filter,page,sortingId,copyPro)=>async dispatch => {
    try {
        let res = await axios.post(`http://api-lulu.hibitbyte.com/product/allProducts?sortingId=${sortingId}&page=${page}&mykey=${mykey}`, filter)
        res = res.data.rs
        let combinedArr=copyPro.concat(res.products)
        // console.log(combinedArr)
        dispatch({
            type: actionType.FETCH_PAGE_DATA,
            payload: combinedArr
        })
    } catch (e) {
        console.log('error is:', e)
    }}

const closeBtn=(arr,filter)=>{
    let keyChecked= Object.keys(filter).find(key=>filter[key].includes(arr))
    let checkItem=filter[keyChecked].map(item=>{
        if(item.name&&item.name===arr.name){
            item.isChecked=false
        }
        else if(item.alt&&item.alt===arr.alt){
            item.isChecked=false
        }
        return item
    })
    let newFilters={...filter,[keyChecked]:checkItem}
    // console.log(newFilters)

    return {type:actionType.CLOSE_BUTTON_DATA,
payload:newFilters
}}

const setWomen=()=>{

return{
    type:actionType.SET_WOMEN,
}
}
const setMen=()=>{
    return{
        type:actionType.SET_MEN,
    }
}
const fetchProduct=(productId)=>async dispatch => {
    try {
        let res = await axios.get(`http://api-lulu.hibitbyte.com/product/${productId}?mykey=${mykey}`)
        res = res.data.rs
        // console.log(res)
        dispatch({
            type: actionType.FETCH_PRODUCT,
            payload: res
        })
    } catch (e) {
        console.log('error is:', e)
    }}

const dataCollection=(reviews)=>{
    return{
        type:actionType.DATA_COLLECTION,
        payload:reviews
    }
}

const sendDataToBag=(price,name,size,swatchAlt,imgUrl,quantity,productId,colorId,sizeIndex)=>{

    return{
type:actionType.ADD_TO_BAG,
        payload:{price,name,size,swatchAlt,imgUrl,quantity,productId,colorId,sizeIndex}
    }
}
const changeQty=(productId,size,swatchAlt,quantity)=>{
    return{
  type:actionType.CHANGE_QUANTITY,
        payload:{productId,size,swatchAlt,quantity}
    }
}

const submitLogin=input=>async dispatch=>{
   try{ const response=await axios.post(`http://api-lulu.hibitbyte.com/auth/login?mykey=${mykey}`,input)
    const token=response.data.data.token
   // localStorage.setItem('token',JSON.stringify(token))
  dispatch({
    type:actionType.SUBMIT_LOGIN,
    payload:token
})
  }catch (e) {
       console.log('error is:', e)
       dispatch({
           type:actionType.LOGIN_FAIL
       })
   }}

const signOut=()=>{
    localStorage.removeItem('token')
    return{
        type:actionType.SIGN_OUT
    }
}

 const orderSuccess=orderId=>{
    console.log(orderId)
    return{
        type:actionType.ORDER_SUCCESS,
        payload:orderId
    }
 }
const PaymentSuccess=()=>{
localStorage.removeItem('bagData')
    return{
    type:actionType.PAYMENT_SUCCESS
    }
}
const updateItem = (preColorId,preSize,size,swatchAlt,imgUrl,productId,colorId,sizeIndex) => {
    return {
        type:actionType.UPDATE_ITEM,
        payload:{preColorId,preSize,size,swatchAlt,imgUrl,productId,colorId,sizeIndex}
    }
}
export default {fetchAllFilters, filterItem, fetchFilteredData,fetchRatedData,
    fetchLowData,fetchPageData,fetchItemNo,closeBtn,setWomen,setMen,fetchProduct,
dataCollection,sendDataToBag,changeQty,submitLogin,signOut,orderSuccess,PaymentSuccess,updateItem}