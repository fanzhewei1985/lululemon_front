import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import './MyBag.scss'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import {useDispatch, useSelector} from "react-redux";
import actions from "../actions";
import {Payment} from "./Payment";
import EditButton from "./EditButton";
import {Stripe} from './Stripe'
const MyBag = () => {
    const dispatch = useDispatch()
    const bagData = useSelector(state => state.productReducer.bagData)
    useEffect(()=>{localStorage.setItem('bagData',JSON.stringify(bagData))}
        ,[bagData])
    const totalPrice = bagData.reduce((current, next) => current * 1 + next.price?.match(/\d+/)[0] * next.quantity, 0)
    console.log(bagData)
    const minusQuantity = (productId, size, swatchAlt, quantity) => {
        if (quantity > 1) {
            quantity--
        }
        dispatch(actions.changeQty(productId, size, swatchAlt, quantity))

    }
    const addQuantity = (productId, size, swatchAlt, quantity) => {
        quantity++
        dispatch(actions.changeQty(productId, size, swatchAlt, quantity))
    }
    const removeItem = (productId, size, swatchAlt, quantity) => {
        quantity = 0
        dispatch(actions.changeQty(productId, size, swatchAlt, quantity))
    }
    const orderSuccess=useSelector(state=>state.productReducer.orderSuccess)
    const token = useSelector(state => state.productReducer.token)
    const[paid,setPaid]=useState(false)
    const passData=(child)=>{
        setPaid(child)
    }
    const [open,setOpen] = useState(false)
    const [editItem, setEditItem] = useState('')
    return (
        <>
            {open && <EditButton open={open} item={editItem}  onClose={() => setOpen(false)}/>}
        <div>
            <section className="h-100 gradient-custom">
                <div className="container py-5">
                    <div className="row d-flex justify-content-center my-4">
                        <div className="col-md-8">
                            <div className="card mb-4">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">My Bag ({bagData.length} items)</h5>
                                    <p><ShoppingBagOutlinedIcon/><span>Items in bag are not reserved. Checkout now to get your gear.</span>
                                    </p>
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
                                                <p  onClick={() => {
                                                    setOpen(true)
                                                    setEditItem(arr)
                                                    dispatch(actions.fetchProduct(arr.productId))
                                                }}><u style={{cursor:'pointer'}}>
                                                    Edit</u>
                                                </p>
                                                <p>Free Shipping + Free Returns</p>
                                                {/*// <!-- Data -->*/}
                                            </div>

                                            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                                <p className="text-start text-md-center">
                                                    Item Price:
                                                    <strong>$ {arr.price.match(/\d+/)[0]}</strong>
                                                </p>
                                                {/*// <!-- Quantity -->*/}
                                                <div className="d-flex mb-4"
                                                     style={{maxWidth: "300px", display: 'flex', alignItems: 'flex-end'}}>
                                                    <button className="btn btn-light px-2 me-2"
                                                            onClick={() => {
                                                                minusQuantity(arr.productId, arr.size, arr.swatchAlt, arr.quantity)
                                                            }}>
                                                        <RemoveOutlinedIcon/></button>

                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="form1">Quantity</label>
                                                        <input id="form1" min="0" name="quantity" value={arr.quantity}
                                                               type="number"
                                                               className="form-control"/>

                                                    </div>

                                                    <button className="btn btn-light px-2 ms-2"
                                                            onClick={() => {
                                                                addQuantity(arr.productId, arr.size, arr.swatchAlt, arr.quantity)
                                                            }}>
                                                        <AddOutlinedIcon/></button>

                                                </div>

                                                <p className="text-start text-md-center">
                                                    Total Price:
                                                    <strong>$ {arr.quantity * (arr.price.match(/\d+/)[0])}</strong>
                                                </p>
                                                <div className='save_remove_btn'><span>Save for Later</span> | <span onClick={() => {
                                                    removeItem(arr.productId, arr.size, arr.swatchAlt, arr.quantity)
                                                }}>Remove</span></div>
                                            </div>
                                        </div>
                                        {/*// <!-- Single item -->*/}

                                        <hr className="my-4"/>
                                    </div>)}
                            </div>
                            <div className="card mb-4">
                                <div className="card-body">
                                    <p><strong>Saved for Later</strong></p>
                                    <p className="mb-0">Sign in or create a member account to view your saved items.</p>
                                </div>
                            </div>
                            <div className="card mb-4 mb-lg-0">
                                <div className="card-body">
                                    <p><strong>We accept</strong></p>
                                    <img className="me-2" width="45px"
                                         src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                                         alt="Visa"/>
                                    <img className="me-2" width="45px"
                                         src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                                         alt="American Express"/>
                                    <img className="me-2" width="45px"
                                         src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                                         alt="Mastercard"/>
                                    <img className="me-2" width="45px"
                                         src="https://1000logos.net/wp-content/uploads/2017/05/PayPal-Logo-2007.png"
                                         alt="PayPal acceptance mark"/>
                                </div>
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
                                            <span>{orderSuccess?(totalPrice*0.13).toFixed(2):'Calculated at Checkout'}</span>
                                        </li>
                                        <li
                                            className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                            <div>
                                                <strong>Estimated Total</strong>

                                            </div>
                                            <span><strong>$ {orderSuccess?(totalPrice*1.13).toFixed(2):totalPrice}</strong></span>

                                        </li>
                                        <strong>
                                            <p className="mb-0">or 4 payments of $17.00 with</p>
                                        </strong>
                                    </ul>

                                    <Link type="button" className="btn btn-danger btn-lg btn-block"
                                          style={{width: '100%'}} to='/checkOut'>
                                        <img style={{width: '6%', objectFit: 'cover',marginBottom:'2px',marginRight:'5px'}}
                                             src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Lululemon_Athletica_logo.svg/2048px-Lululemon_Athletica_logo.svg.png"
                                             alt=""/>
                                        CHECKOUT
                                    </Link>
                                    {/*{ orderSuccess&&token && <div>*/}
                                    {/*    <p style={{margin:'15px 0 1px 0',}}>or checkout quickly with</p>*/}
                                    {/*    <Stripe style={{margin:'15px auto' }}/>*/}
                                    {/*    <br style={{margin:'15px auto' }}/>*/}
                                    {/*    <Payment style={{margin:'15px auto' }} fun={passData} totalPrice={(totalPrice*1.13).toFixed(2)} subtotal={totalPrice} tax={(totalPrice*0.13).toFixed(2)}/></div>}*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
            </>
    );
};

export default MyBag;