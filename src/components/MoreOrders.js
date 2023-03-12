import React, {useState} from 'react';

const MoreOrders = () => {
    const [show, setShow] = useState(false)
    const [ordersFromDb, setOrdersFromDb] = useState()
    const fetchOrders = async () => {
        setShow(true)
        const data = await fetch('http://localhost:3001/order')
        const json = await data.json()
        setOrdersFromDb(json.data)
        console.log(json.data)
    }
    console.log(ordersFromDb)
// ordersFromDb && console.log(JSON.parse(ordersFromDb[0].orderProducts)[0].name)

    return (
        <div style={{padding: '0 40px 40px 40px'}}>
            <div><p onClick={fetchOrders} style={{textAlign: "right", cursor: "pointer"}}><u><strong>Check More
                Orders</strong></u></p></div>
            <div style={{background:'white'}}>
            {show && <div style={{width: "100%"}}>
                {ordersFromDb && ordersFromDb.map(data => <div style={{padding: '15px', textAlign:'center'}}>
                    <h3 style={{marginBottom: "35px", fontWeight: "bold",textAlign:'left'}}>Order :  {data.orderNo}</h3>
                        <div style={{display: "flex", justifyContent: 'space-between', width: "100%"}}>
                            <div style={{width: '12%'}}><h5 style={{fontWeight: "bold"}}>Order Date</h5>
                                <p>{data.createdAt.split('T')[0]}</p></div>
                        <div style={{width: '27%'}}><h5 style={{fontWeight: "bold"}}>Product Name</h5></div>
                        <div style={{width: '12%'}}><h5 style={{fontWeight: "bold"}}>Size</h5></div>
                        <div style={{width: '25%'}}><h5 style={{fontWeight: "bold"}}>Color</h5></div>
                        <div style={{width: '12%'}}><h5 style={{fontWeight: "bold"}}>Quantity</h5></div>
                        <div style={{width: '12%'}}><h5 style={{fontWeight: "bold"}}>Price</h5></div>
                    </div>
                    {JSON.parse(data.orderProducts).map(arr =>
                        <div style={{display: "flex", justifyContent: 'space-between', width: "100%"}}>
                            <div style={{width: '12%'}}></div>
                            <div style={{width: '27%'}}><p>{arr.name}</p></div>
                            <div style={{width: '12%'}}><p>{arr.size}</p></div>
                            <div style={{width: '25%'}}><p>{arr.swatchAlt}</p></div>
                            <div style={{width: '12%'}}><p>{arr.quantity}</p></div>
                            <div style={{width: '12%'}}><p>{arr.price}</p></div>
                        </div>)}
                    <hr/>
                    <div>
                        <div style={{display: "flex", justifyContent: "space-between"}}><h5
                            style={{fontWeight: "bold"}}>Subtotal : </h5><span>$ {data?.totalPrice} CAD</span>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between"}}><h5
                            style={{fontWeight: "bold"}}>Tax :</h5>
                            <span>$ {(data?.totalPrice * 0.13).toFixed(2)} CAD</span></div>
                        <div style={{display: "flex", justifyContent: "space-between"}}><h5
                            style={{fontWeight: "bold"}}>Total : </h5>
                            <span>$ {(data?.totalPrice * data?.taxRate).toFixed(2)} CAD</span></div>
                    </div>
                    <hr/>
                    <div style={{textAlign:'left'}}>
                        <h5 style={{fontWeight: "bold"}}>Shipping Address</h5>
                        <p style={{marginBottom: "0"}}><span>{(JSON.parse(data?.address)).first} </span>
                            <span> {(JSON.parse(data?.address)).last}</span></p>
                        <p>
                            <span>{(JSON.parse(data?.address)).street} </span>, <span> {(JSON.parse(data?.address)).city} </span>, <span> {(JSON.parse(data?.address)).province} </span>, <span>{(JSON.parse(data?.address)).zip}</span>
                        </p>
                    </div>
                    <hr/>
                    <hr/>
                </div>)}
            </div>}
            </div>
        </div>
    );
};

export default MoreOrders;