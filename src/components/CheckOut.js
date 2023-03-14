import React, {useState} from 'react';
import './CheckOut.scss'
import {Link, useNavigate} from "react-router-dom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import actions from "../actions";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {actionType, mykey} from "../const";
import MyModal from "./MyModal";
import MyModalLogin from "./MyModalLogin";

const CheckOut = () => {

    const [myModalOpen, setMyModalOpen] = useState(false);
    // console.log(myModalOpen)
    const [show, setShow] = useState(false)
    const [input, setInput] = useState({email: '', password: ''})
    const [submit, setSubmit] = useState(false)
    const [checkedBox,setCheckedBox]=useState(false)
    const [shipInfo,setShipInfo]=useState({first:'',last:'',phone:'',street:'',city:'',province:'',zip:''})
//     console.log(shipInfo)
    const dispatch = useDispatch()
    const token = useSelector(state => state.productReducer.token)
    localStorage.setItem('token',JSON.stringify(token))
//     console.log(token)
    const loginFail=useSelector(state=>state.productReducer.logInFail)
    const loginSuccess=useSelector(state=>state.productReducer.logInSuccess)
    const bagData = useSelector(state => state.productReducer.bagData)
    const orderItems = bagData.map(arr => ({
        quantity: arr.quantity,
        productId: arr.productId,
        colorId: arr.colorId,
        size: arr.size
    }))
//     console.log(JSON.stringify(shipInfo))
    const [orderId]=useState(new Date().getTime())
    const totalPrice = bagData.reduce((current, next) => current * 1 + next.price?.match(/\d+/)[0] * next.quantity, 0)
    const [orderSuc, setOrderSuc] = useState({})
    const navigate = useNavigate()

    async function placeOrder() {
        if (!token) {
            setMyModalOpen(true);
        } else {
            // const data = {
            //     taxRate: 1.13,
            //     isActive: true,
            //     isDelete: false,
            //     orderItems: orderItems
            // };
            // const config = {
            //     headers: {
            //         authorization: `bear ${token}`,
            //     },
            // };
            try {
                const response= await fetch("http://localhost:3001/order", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userEmail:'mark2win@info123.com',
                        totalPrice:Math.round(totalPrice),
                        taxRate:1.13,
                        orderProducts:JSON.stringify(bagData),
                            // bagData.map(arr=>JSON.stringify(arr)),
                        orderNo:orderId,
                        address:JSON.stringify(shipInfo)
                    })

                // const response = await axios.post(`http://api-lulu.hibitbyte.com/order?mykey=${mykey}`, data, config)
                // // console.log(response.data.data)
                // if (response.data.status === 'success') {
                //     setOrderSuc(response.data.data)
                //     dispatch(actions.orderSuccess(response.data.data))
                //     navigate('/payment')

            })
            }catch (e) {
                console.log('error is:', e)
                 alert(e)
                // navigate('/logIn')
            }
            dispatch(actions.orderSuccess(orderId))
               navigate('/payment')
        }


    }

    return (

        <div className="maincontainer">

            <MyModalLogin show={myModalOpen}
                     onHide={() => setMyModalOpen(false)}
            ></MyModalLogin>
            <div className="title">
                <h2>Checkout</h2>
                <p className='title_alert'><WarningAmberIcon/> To protect your personal information, your session has
                    automatically timed out. Please begin checkout again.</p>
            </div>
            <div className="row">
                <div className="col-md-4 order-md-2 mb-4 rightPart">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <h3>Order Summary</h3>
                    </h4>
                    <div className='flexBox topBox'>
                        <div><ShoppingBagOutlinedIcon/><span>{bagData.length} items</span></div>
                        <p>$ {(totalPrice * 1.13).toFixed(2)}</p>
                    </div>
                    <hr/>
                    <div className="list-group mb-3">
                        <div>{bagData && bagData.map(arr => <div className="dataInCheckout">
                            <img src={arr.imgUrl}/>
                            <div className='productInfo'>
                                <h6>{arr.name}</h6>
                                <p>{arr.swatchAlt}</p>
                                <p>size: {arr.size}</p>
                                <div className='price'><p>Quantity: {arr.quantity}</p>
                                    <p>$ {arr.price.match(/\d+/)[0] * arr.quantity}</p>
                                </div>
                            </div>
                        </div>)}
                            <hr/>
                        </div>
                        <div className='flexBox'><p>Subtotal</p><p>$ {totalPrice}</p></div>
                        <div className='flexBox'><p>Shipping</p><p>Free</p></div>
                        <div className='flexBox'><p>Tax</p><p>$ {(totalPrice * 0.13).toFixed(2)}</p></div>
                        <hr/>
                        <div className='flexBox'><h4>Order total</h4><h4>CAD ${(totalPrice * 1.13).toFixed(2)}</h4>
                        </div>
                    </div>

                </div>
                <div className="col-md-8 order-md-1">
                    {loginFail&& <div className="alert alert-danger" role="alert">Something's not right with your email address
                            or password</div>}

                    {token? <div>
                        <p className="alert alert-success" role="alert"><span><FavoriteBorderIcon/> </span> Welcome dear
                            customer!</p>
                    </div> : <div className="general">
                        <h3>Have an account</h3>
                        <p onClick={() => setShow(!show)} className='logIn_controller'><strong><u>Log in</u></strong> to
                            checkout more quickly and easily<span><KeyboardArrowDownIcon/></span></p>
                        {show && <form onSubmit={(evt) => {
                            evt.preventDefault()
                            setSubmit(true)
                        }}>
                            <div className='logIn_input'>
                                <div className="form-outline  mb-3">
                                    <label className="form-label label" htmlFor="email">Email address</label>
                                    <input onChange={(evt) => {
                                        setInput(pre => ({
                                            ...pre, [evt.target.name]: evt.target.value
                                        }))
                                    }} type="email" name='email' className="form-control"/>
                                </div>
                                <div className="form-outline mb-3">
                                    <label className="form-label label" htmlFor="password">Password</label>
                                    <input onChange={(evt) => {
                                        setInput(pre => ({
                                            ...pre, [evt.target.name]: evt.target.value
                                        }))
                                    }} type="password" name='password' className="form-control"/>
                                </div>
                            </div>
                            <div className="row mb-4 ">
                                <div className='remember'>
                                    <div style={{width: '50%'}} className="form-check">
                                        <input className="form-check-input" type="checkbox" value=""
                                               id="form2Example31" checked/>
                                        <label className="form-check-label" htmlFor="form2Example31"> Remember
                                            me </label>
                                    </div>
                                    <div className="col" style={{width: '50%', transform: 'translateX(10%)'}}>
                                        <a href="#!">Forgot password?</a>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" onClick={() => {
                                // setSubmit(true)
                                dispatch(actions.submitLogin(input))
                            }} style={{width: '100%', marginTop: '0', height: '45px'}}
                                    className="btn btn-danger btn-block mb-4">Sign in
                            </button>
                            <div className="text-center ">
                                <p className='register'>Not a member? <Link to='/login'>Register</Link></p>
                            </div>
                        </form>}

                    </div>}
                    <form onSubmit={(evt) => {
                        evt.preventDefault()
                        placeOrder()
                    }} className="mb-3 shipInfo" style={{position: 'relative'}}>
                        <div className='general'>
                            <h3>Contact information </h3>
                            <label htmlFor="email">Email address<span
                                className="text-muted">(for order notification)</span></label>
                            <input type="email" className="form-control" id="email" required
                                   placeholder="you@example.com"/>
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="save-info"
                                       style={{marginTop: '15px', marginRight: '10px'}}/>
                                <label className="custom-control-label" htmlFor="save-info">Sign me up for lululemon
                                    emails (you can unsubscribe at any time). See our privacy policy for
                                    details.</label>
                            </div>
                            <div className="invalid-feedback">
                                Please enter a valid email address for shipping updates.
                            </div>
                        </div>
                        <div className='general'>
                            <h3 className="mb-3">Shipping address</h3>
                            <div className="needs-validation" noValidate>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="firstName">First name</label>
                                        <input onChange={(evt)=>setShipInfo(pre=>({...pre,[evt.target.name]:evt.target.value}))} type="text" className="form-control" name="first" placeholder=""
                                               required/>
                                        <div className="invalid-feedback">
                                            Valid first name is required.
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="lastName">Last name</label>
                                        <input type="text" className="form-control" name="last" placeholder=""
                                               onChange={(evt)=>setShipInfo(pre=>({...pre,[evt.target.name]:evt.target.value}))}     required/>
                                        <div className="invalid-feedback">
                                            Valid last name is required.
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address2">Phone Number </label>
                                    <input type="text" className="form-control" name="phone" onChange={(evt)=>setShipInfo(pre=>({...pre,[evt.target.name]:evt.target.value}))}/>
                                    <p>This will be only used for delivery related issues.</p>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="address">Address</label>
                                    <input type="text" className="form-control" name="street"
                                           placeholder="1234 Main St"
                                           onChange={(evt)=>setShipInfo(pre=>({...pre,[evt.target.name]:evt.target.value}))}
                                           required/>
                                    <div className="invalid-feedback">
                                        Please enter your shipping address.
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="zip">City</label>
                                        <input type="text" className="form-control" name='city' placeholder=""
                                               onChange={(evt)=>setShipInfo(pre=>({...pre,[evt.target.name]:evt.target.value}))} required/>
                                        <div className="invalid-feedback">
                                            Zip code required.
                                        </div>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="state">Province</label>
                                        <select className="custom-select d-block w-100 form-select " name="province"
                                                onChange={(evt)=>setShipInfo(pre=>({...pre,[evt.target.name]:evt.target.value}))}
                                                style={{height: '40px'}} required>
                                            <option value="">Select...</option>
                                            <option value='Ontario'>Ontario</option>
                                            <option value='Quebec'>Quebec</option>
                                        </select>
                                        <div className="invalid-feedback">
                                            Please provide a valid state.
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="zip">Postal Code</label>
                                        <input type="text" className="form-control" name="zip" placeholder=""
                                               onChange={(evt)=>setShipInfo(pre=>({...pre,[evt.target.name]:evt.target.value}))}
                                               required/>
                                        <div className="invalid-feedback">
                                            Zip code required.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='general'>
                            <label htmlFor="" style={{fontSize:"20px"}}>
                                <input type='radio' checked={checkedBox} onClick={()=>setCheckedBox(!checkedBox)}/>    Billing address is the same as my shipping address</label>
                        </div>
                        {!checkedBox && <div className='general'>
                            <h3 className="mb-3">Billing address</h3>
                            <div className="needs-validation" noValidate>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="firstName">First name</label>
                                        <input type="text" className="form-control" id="firstName" placeholder=""
                                               required/>
                                        <div className="invalid-feedback">
                                            Valid first name is required.
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="lastName">Last name</label>
                                        <input type="text" className="form-control" id="lastName" placeholder=""
                                               required/>
                                        <div className="invalid-feedback">
                                            Valid last name is required.
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address2">Phone Number </label>
                                    <input type="text" className="form-control" id="phone number"/>
                                    <p>This will be only used for delivery related issues.</p>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="address">Address</label>
                                    <input type="text" className="form-control" id="address"
                                           placeholder="1234 Main St"
                                           required/>
                                    <div className="invalid-feedback">
                                        Please enter your shipping address.
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="zip">City</label>
                                        <input type="text" className="form-control" placeholder="" required/>
                                        <div className="invalid-feedback">
                                            Zip code required.
                                        </div>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="state">Province</label>
                                        <select className="custom-select d-block w-100 form-select " id="state"
                                                style={{height: '40px'}} required>
                                            <option value="">Select...</option>
                                            <option>Ontario</option>
                                            <option>Quebec</option>
                                        </select>
                                        <div className="invalid-feedback">
                                            Please provide a valid state.
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="zip">Postal Code</label>
                                        <input type="text" className="form-control" id="zip" placeholder=""
                                               required/>
                                        <div className="invalid-feedback">
                                            Zip code required.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}
                        <div className='general'>
                            <h3>Shipping & gift options </h3>
                            <p>2-10 business days</p>
                            <p>Standard Shipping (FREE)</p>
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="save-info"/>
                                <label className="custom-control-label" htmlFor="save-info">This is a gift, add a
                                    message.</label>
                            </div>
                            <div className="invalid-feedback">
                                Please enter a valid email address for shipping updates.
                            </div>
                        </div>
                        <div className='checkoutBtn'>
                            <button type="submit"
                                // dispatch(actions.placeOrder(orderItems,token))}
                                    className="btn btn-danger btn-lg btn-block continueBtn">Place Order
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
        ;
};

export default CheckOut;
