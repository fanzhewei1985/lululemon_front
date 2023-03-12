import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import './MyBag.scss'
import {useDispatch, useSelector} from "react-redux";
import actions from "../actions";
import {Payment} from "./Payment";
// import EditButton from "./EditButton";
import {Elements} from '@stripe/react-stripe-js';
import {Stripe} from './Stripe'
import {loadStripe} from "@stripe/stripe-js";

const PaymentPage = () => {
    const stripePromise = loadStripe('pk_test_51MWulfFfhF5AxI6F2rm66kCGPx4FN3QZIHinaLptwGH1vl2F8UwqgcO9gsnqIjQIc9Y9tTmnKI4DVBoMoOJalaI400vypzUUwL')
    const dispatch = useDispatch()
    const orderId=useSelector(state=>state.productReducer.orderId)
    const bagData = useSelector(state => state.productReducer.bagData)
    useEffect(()=>{localStorage.setItem('bagData',JSON.stringify(bagData))}
        ,[bagData])
    const totalPrice = bagData.reduce((current, next) => current * 1 + next.price?.match(/\d+/)[0] * next.quantity, 0)
    console.log(bagData)
    const orderSuccess=useSelector(state=>state.productReducer.orderSuccess)
    const token = useSelector(state => state.productReducer.token)
    const[paid,setPaid]=useState(false)
    const passData=(child)=>{
        setPaid(child)
    }
    // const [open,setOpen] = useState(false)
    // const [editItem, setEditItem] = useState('')
    return (
        <>
            <Elements stripe={stripePromise} >
            {/*{open && <EditButton open={open} item={editItem}  onClose={() => setOpen(false)}/>}*/}
            <div>
                <section className="h-100 gradient-custom">
                    <div className="container py-5">
                        <div className="row d-flex justify-content-center my-4">
                            <div className="col-md-8">
                                <div className="card mb-4">
                                    <div className="card-header py-3">
                                        <h5 className="mb-0">Order No: {orderId}</h5>
                                    </div>
                                    {bagData.map((arr, index) =>
                                        arr.quantity!==0 && <div className="card-body">
                                            {/*// <-- Single item -->*/}
                                            <div className="row">
                                                <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                                    {/*// <-- Image -->*/}
                                                    <div className="bg-image hover-overlay hover-zoom ripple rounded"
                                                         data-mdb-ripple-color="light">
                                                        <img
                                                            src={arr.imgUrl}
                                                            className="w-100" alt="Blue Jeans Jacket"/>
                                                        <a href="#!">
                                                            <div className="mask"
                                                                 style={{backgroundColor: 'rgba(251, 251, 251, 0.2)'}}></div>
                                                        </a>
                                                    </div>
                                                    {/*// <-- Image -->*/}
                                                </div>

                                                <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                                                    {/*// <-- Data -->*/}
                                                    <p><strong>{arr.name}</strong></p>
                                                    <p>Color: {arr.swatchAlt}</p>
                                                    <p>Size: {arr.size}</p>
                                                    <p>Free Shipping + Free Returns</p>
                                                    {/*// <!-- Data -->*/}
                                                </div>

                                                <div className="col-lg-4 col-md-6 mb-4 mb-lg-0" style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                                                    <p className="text-start text-md-center">
                                                        Item Price:
                                                        <strong>$ {arr.price.match(/\d+/)[0]}</strong>
                                                    </p>
                                                        <div className="form-outline">
                                                            <p className="text-start text-md-center">
                                                                Quantity:
                                                                <strong>{arr.quantity}</strong>
                                                            </p>

                                                        </div>

                                                    <p className="text-start text-md-center">
                                                        Total Price:
                                                        <strong>$ {arr.quantity * (arr.price.match(/\d+/)[0])}</strong>
                                                    </p>
                                                </div>
                                            </div>
                                            {/*// <!-- Single item -->*/}

                                            <hr className="my-4"/>
                                        </div>)}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card mb-4">
                                    <div className="card-header py-3">
                                        <h5 className="mb-0">Order Summary</h5>
                                    </div>
                                    <div className="card-body">
                                        <ul className="list-group list-group-flush">
                                            <li
                                                className="list-group-item d-flex justify-content-between align-items-center px-0 pb-0">
                                                Subtotal
                                                <span>$ {totalPrice}</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                                Shipping
                                                <span>FREE</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                                TAX
                                                <span>{(totalPrice*0.13).toFixed(2)}</span>
                                            </li>
                                            <li
                                                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                                <div>
                                                    <strong>Estimated Total</strong>
                                                </div>
                                                <span><strong>$ {(totalPrice*1.13).toFixed(2)}</strong></span>
                                            </li>
                                        </ul>
                                            <div>
                                            <Stripe amount={(totalPrice*1.13).toFixed(2)} orderId={orderId}/>
                                                <p style={{margin:'15px 0 1px 0',}}>or checkout quickly with</p>
                                            <Payment fun={passData} totalPrice={(totalPrice).toFixed(2)} subtotal={totalPrice} tax={(totalPrice*0.13).toFixed(2)}/></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            </Elements>
        </>
    );
};

export default PaymentPage;