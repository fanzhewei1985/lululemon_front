import React, {useEffect, useRef, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useReactToPrint} from "react-to-print";
import MoreOrders from "./MoreOrders";

const Success = () => {
    const orderId = useSelector(state => state.productReducer.orderId)
    // const orderId=1675646389667
    let navigate = useNavigate()
    console.log(orderId)
    const jumpTo = (path) => {
        navigate(path, {replace: true})
    }
    const [dataFromDb, setDataFromDb] = useState()
    let products
    let address
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`http://localhost:3001/order/${orderId}`);
            const json = await data.json();
            console.log(json)
            setDataFromDb(json.data)
            return json;
        }
        const result = fetchData()
            .catch(console.error);
    }, [])
    // useEffect(()=> { fetch(`http://localhost:3001/order/${orderId}`, {
    //            method: "GET"}).then(res=>res.json()).then(data=>setDataFromDb(data.data))
    //    },[orderId])
    // // console.log( dataFromDb.orderProducts)
    if (dataFromDb) {
        products = JSON.parse(dataFromDb?.orderProducts)
        console.log(products)
        address = JSON.parse(dataFromDb?.address)
    }
    // console.log(address)
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (<div>
        <div style={{display: "flex", padding: "40px 40px 0 0"}}>
            <div style={{
                width: "50%",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <img style={{marginBottom: '70px', width: "80%"}}
                     src='https://ruperhat.com/wp-content/uploads/2020/06/Paymentsuccessful21.png' alt=''/>

                <button onClick={() => jumpTo('/')} className='btn btn-success btn-lg'>Continue Shopping</button>
            </div>
            <div style={{width: "50%"}}>
                <div ref={componentRef} style={{padding:'15px'}}>
                    <h3 style={{marginBottom: "35px", fontWeight: "bold"}}>Your Order # is: {orderId}</h3>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <div style={{maxWidth: '25%'}}><h5 style={{fontWeight: "bold"}}>Product Name</h5></div>
                        <div style={{width: '10%'}}><h5 style={{fontWeight: "bold"}}>Size</h5></div>
                        <div style={{maxWidth: '25%'}}><h5 style={{fontWeight: "bold"}}>Color</h5></div>
                        <div style={{width: '10%'}}><h5 style={{fontWeight: "bold"}}>Quantity</h5></div>
                        <div style={{width: '10%'}}><h5 style={{fontWeight: "bold"}}>Price</h5></div>
                    </div>
                    {products && products.map(data=><div style={{display: "flex", justifyContent: 'space-between', width: "98%"}}>
                        <div style={{maxWidth: '25%'}}>
                            <p>{data?.name}</p></div>
                        <div style={{width: '10%'}}>
                            <p>{data?.size}</p></div>
                        <div style={{maxWidth: '25%'}}>
                            <p>{data?.swatchAlt}</p></div>
                        <div style={{width: '10%'}}>
                            <p>{data?.quantity}</p></div>
                        <div style={{width: '10%'}}>
                            <p>{data?.price}</p></div>

                    </div>)}
                    <hr/>
                    <div>
                        <div style={{display: "flex", justifyContent: "space-between"}}><h5
                            style={{fontWeight: "bold"}}>Subtotal : </h5><span>$ {dataFromDb?.totalPrice} CAD</span>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between"}}><h5
                            style={{fontWeight: "bold"}}>Tax :</h5>
                            <span>$ {(dataFromDb?.totalPrice * 0.13).toFixed(2)} CAD</span></div>
                        <div style={{display: "flex", justifyContent: "space-between"}}><h5
                            style={{fontWeight: "bold"}}>Total : </h5>
                            <span>$ {(dataFromDb?.totalPrice * dataFromDb?.taxRate).toFixed(2)} CAD</span></div>
                    </div>
                    <hr/>
                    <div>
                        <h5 style={{fontWeight: "bold"}}>Shipping Address</h5>
                        <p style={{marginBottom: "0"}}><span>{address?.first} </span> <span> {address?.last}</span></p>
                        <p>
                            <span>{address?.street} </span>, <span> {address?.city} </span>, <span> {address?.province} </span>, <span>{address?.zip}</span>
                        </p>
                    </div>
                </div>
                <button className='btn btn-outline-dark'   onClick={handlePrint}>Print Your Receipt</button>

            </div>

        </div>
            <MoreOrders/>
        </div>
    );
}

export default Success