import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
const MyModal = (props) => {
    const bagData=useSelector(state=>state.productReducer.bagData)
    const totalPrice = bagData.reduce((current, next) => current * 1 + next.price?.match(/\d+/)[0] * next.quantity, 0)
    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <div style={{lineHeight:'35px',fontSize:'33px',fontFamily:'Calibre_Bold',marginTop:'20px'}}>We Love It Too
                        <ShoppingBagOutlinedIcon style={{fontSize:'40px',marginLeft:'10px',transform:'translateY(-15%)'}}/><span style={{fontSize:'20px'}}>{bagData.length} items</span></div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{display:'flex'}}>
                    <div style={{display:'flex',width:'60%',justifyContent:'space-between',borderRight:'1px solid lightgray',paddingRight:'20px'}}>
                    <img src={props.url} style={{width:'150px',height:'170px',marginRight:'20px'}}/>
                    <div style={{fontSize:'19px',display:'flex',flexDirection:'column',justifyContent:'space-between'}} >
                        <h3 style={{fontSize:'23px'}}>{props.name}</h3>
                        <p>Size:{props.size}</p>
                        <p>{props.price}</p>
                    </div>
                    </div>
                   <div style={{width:'40%',padding:'0 20px',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                       <div style={{display:'flex',justifyContent:'space-between',fontSize:'19px'}}>
                           <p>Subtotal</p>
                           <p>$ {totalPrice} CAD</p>
                       </div>
                      <Link to='/myBag'> <Button variant="contained" className='btn btn-danger' style={{width:'100%'}}>VIEW BAG & CHECKOUT</Button></Link>
                       <Link to='/'  style={{fontFamily:'Calibre_Bold'}}>CONTINUE SHOPPING<TrendingFlatIcon style={{color:'red',marginLeft:'10px'}}/></Link>
                   </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn btn-danger' onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MyModal;