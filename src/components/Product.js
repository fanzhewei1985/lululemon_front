import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleDot, faHeart, faSearch, faShop} from "@fortawesome/free-solid-svg-icons";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {Link,  useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import actions from "../actions";
import './Product.scss'
import Reviews from "./Reviews";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import Button from '@mui/material/Button';
import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';

import MyModal from "./MyModal";
const Product = () => {
    let product = useSelector(state => state.productReducer.oneProduct)
    const women = useSelector(state => state.productReducer.isWomen)
    const men = useSelector(state => state.productReducer.isMen)
    console.log(women, men)
    const objPro = useParams()
    const [colorId, setColorId] = useState(objPro.colorId)
    // let colorId = objPro.colorId;
    // console.log(swatch)
const [swatchAlt,setSwatchAlt]=useState()

    const productId = objPro.productId
    useEffect(() => {
        dispatch(actions.fetchProduct(productId))
    }, [])

    useEffect(() => {
        if (product) {
            let swatch=product.swatches?.find(arr=>arr.colorId===colorId)
            swatch=swatch?.swatchAlt
            setSwatchAlt(swatch)
        }
    }, [product])
    const dispatch = useDispatch()
     const [reviewNo, setReviewNo]=useState(0)
    const dataPassFunc=(child)=>{
       setReviewNo(child)
    }

    console.log(product)
    const category = product?.name?.split(' ').pop()
    const products = useSelector(state => state.productReducer.products)
    const relatedProducts = products.filter(arr => arr.name.includes(category))
    const relates = relatedProducts.map(arr => ({
        url: arr?.images[0]?.mainCarousel?.media?.split('|')[0],
        name: arr.name
    }))

    const getItem = (colorId,swatchAlt) => {
        // dispatch(actions.fetchProduct(productId))
        setColorId(colorId)
        setSwatchAlt(swatchAlt)
    }
    const [index, setIndex] = useState(0)
    const [sizeIndex, setSizeIndex] = useState('')
    const [size,setSize]=useState('')
    const Right_Arrow = () => {
        if (index < listItem?.mainCarousel.media?.split('|').length - 1) {
            setIndex((prevState) => prevState + 1);
        } else {
            setIndex(0)
        }
    }
    const Left_Arrow = () => {
        if (index === 0) {
            setIndex(listItem?.mainCarousel.media?.split('|').length - 1)
        } else {
            setIndex(prevState => prevState - 1)
        }
    }

    let listItem = product?.images?.find(arr => arr.mainCarousel.media.includes(colorId))
    const imgUrl = listItem?.mainCarousel.media?.split('|')[index]
    const reviewUrl = listItem?.mainCarousel.media?.split('|')[0]
    const whyUrl = product?.images?.find(arr => arr.colorId === colorId)?.whyWeMadeThis
    // console.log(whyUrl)
    // const[toggle,setToggle]=useState(false)
    const[toggleInd,setToggleInd]=useState('')
    const featureToggle=(evt,index)=>{
        // setToggle(!toggle)
        setToggleInd(index)

    }
    const [chooseShipItToMe, setChooseShipItToMe] = useState(false)
    const [choosePickUpInStore, setPickUpInStore] = useState(false)
    const Ship = () => {
        setPickUpInStore(false)
        setChooseShipItToMe(true)
    }
    const PickUp = () => {
        setChooseShipItToMe(false)
        setPickUpInStore(true)
    }
    const [showAlert,setShowAlert]=useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [quantity,setQuantity]=useState(1)
    const addToBag=()=>{
        if(!size){setShowAlert(true)}
        if (size){setModalShow(true)
            // setQuantity(quantity+1)
        dispatch(actions.sendDataToBag(product.price,product.name,size,swatchAlt,reviewUrl,quantity,productId,colorId,sizeIndex))}
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (
        <div className='Product'>
            <div className='Product_Top'>
                <div className='top_Left'>
                    <div className='Product_img'>
                        <img className='list_Picture' src={imgUrl} alt=""/>
                        <div className='Left_Right_Arrow'>
                            <ChevronLeftOutlinedIcon
                                className='arrow'
                                onClick={() => Left_Arrow()}
                            />
                            <ChevronRightOutlinedIcon
                                className='arrow'
                                onClick={() => Right_Arrow()}
                            />
                        </div>
                        <div className='arrow glass'><ZoomInOutlinedIcon className=' glasses'/></div>
                    </div>

                    <div className='carousel_Container'>
                        {
                            listItem?.mainCarousel?.media?.split('|').map((arr,index) => <div className='swatchPic_Container'>
                                <img
                                    onClick={()=>setIndex(index)}
                                    src={arr} alt=""/></div>)
                        }
                    </div>
                </div>
                <div className='top_Middle'>
                <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><span>{men && "Men's" || women && "Women's"} Clothes</span>
                            </li>
                            <li className="breadcrumb-item"><span>{category}</span></li>
                            {/*<li className="breadcrumb-item active" aria-current="page">Tank Tops</li>*/}
                        </ol>
                </nav>
                    <h1>{product?.name}</h1>
                    <p className='productPrice'>{product?.price}</p>
                    <p style={{marginBottom:'2px'}}><span style={{marginRight:'10px',fontWeight:'bold',fontSize:'17px'}}>Colour</span>{swatchAlt}</p>
                    <div className='SwatchesCarousel'>{product?.swatches?.map(arr => <Link
                        to={`/${product.name.split(' ').join('-')}/${productId}/${arr.colorId}`}
                        className={arr.colorId === colorId ? 'swatch_container_border' : 'swatch_container'}><img
                        className='swatchPic' onClick={() => getItem(arr.colorId,arr.swatchAlt)} src={arr.swatch}
                        alt={arr.swatchAlt}/>
                    </Link>)}</div>
                    {showAlert&&<div className="alert alert-danger" role="alert">
                        Please select a size!
                    </div>}
                    <div className='sizes'>
                        <div style={{display:'flex',justifyContent:'space-between'}}>
                        <h3>{product?.sizes && product.sizes[0].title}</h3>
                        <h3><u>Size Guide</u></h3>
                        </div>
                        <div className='all_Sizes'>
                            {product?.sizes && product.sizes[0].details.map((size, index) => {
                                return <div
                                    key={index}
                                    onClick={(evt) =>{setSize(size)
                                        setShowAlert(false)
                                        setSizeIndex(index)}}
                                    className={sizeIndex === index ? 'size size_Checked' : 'size'}
                                >{size}</div>
                            })}
                            {product?.sizes && product.sizes[0].details.length===0&&<p onClick={(evt) =>{setSize(1)
                                setShowAlert(false)}}
                                className='size size_Checked'>One Size</p>}
                        </div>
                        <h3 style={{marginTop:'10px'}}>Size sold out?Select size to get notified</h3>
                    </div>

                    <div className='btnsContainer'>
                        <p><span className='tIcon'>T</span><u>What's my size</u></p>
                        <div
                            className={chooseShipItToMe ? 'Ship_it_to_me choose_ship_it_to_me' : 'Ship_it_to_me'}
                            onClick={() => Ship()}>
                            <div className='title'>
                                <div className='circle'>
                                <FontAwesomeIcon icon={faCircleDot}/>
                            </div>
                            <h3>Ship it to me</h3>
                            </div>
                                <p>Free shipping and returns</p>
                        </div>
                        <div
                            className={choosePickUpInStore ? 'Pick_up_in_store choose_pick_up_in_store' : 'Pick_up_in_store'}
                            onClick={() => PickUp()}>
                            <div className='Shop'>
                                <FontAwesomeIcon icon={faShop}/>
                                <h3>Pick up in-store</h3>
                            </div>
                            <div className='title'>
                                <FontAwesomeIcon icon={faPlus} className='plus'/>
                            </div>

                        </div>
                        <div className='addToBag_boss'>
                            {/*<button className='Add_To_Bag'><span>ADD TO BAG</span></button>*/}
                            <Button onClick={()=>{addToBag()}} variant="contained"  className='Add_To_Bag' color='error'>
                                Add TO BAG
                            </Button>
                            <MyModal name={product.name} price={product.price} size={size} url={reviewUrl}
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                            />
                        </div>
                    </div>

                    <div className='options'>
                        <div className='wish_list'>
                            <FavoriteBorderIcon/>
                            <span>Add to Wish List</span>
                        </div>
                        <div className='reviews'><StarBorderIcon/><span>Reviews({reviewNo})</span></div>
                    </div>
                    <div className='details'>
                        <h3>Details</h3>
                        {product?.featureTitles?.map((item,index) => {
                            return <div key={index} className='details_information'>
                                <img src={item.iconPath} alt=""/>
                                <span>{item.title}</span>
                            </div>
                        })}
                    </div>
                </div>
                <div className='top_Right'>
                    <h5>You may like</h5>
                    {relates[0] && <div><img src={relates[0].url} alt=""/><p>{relates[0].name}</p></div>}
                    {relates[1] && <div><img src={relates[1].url} alt=""/><p>{relates[1].name}</p></div>}
                    {relates[2] && <div><img src={relates[2].url} alt=""/><p>{relates[2].name}</p></div>}
                    {relates[3] && <div><img src={relates[3].url} alt=""/><p>{relates[3].name}</p></div>}

                </div>
            </div>
            <div className='Product_Mid'>
                <div className='Product_Mid_top'>
                    <div style={{maxWidth: "32%"}}>
                        <h1>Why we made this</h1>
                        <p>{product?.whyWeMadeThis}</p>
                    </div>
                    {whyUrl?.map(arr => <img src={arr} alt=''/>)}
                </div>
                <div className='Product_Mid_mid'>
                    {product.featurePanels && product.featurePanels.map((arr,index) => <div>
                        <div className='feature_Container'>
                            <div className='feature_Container_icon'>
                                <img src={arr.iconPath} alt=''/>
                                <h2>{arr.title.split('(')[0]}</h2>
                            </div>

                            {arr.isPanel &&<div className='lines' onClick={(evt) => {featureToggle(evt,index)
                            }}>
                                <div className='line1'><HorizontalRuleIcon/></div>
                                <div className={toggleInd===index?'rotate':'rotateBack'}><HorizontalRuleIcon/></div>
                            </div>}

                        </div>
                        {toggleInd===index && arr.content && <div>{arr.content.map(cons => <button
                            style={{width: '30%', fontSize: '22px', padding: '30px', margin: '20px', textAlign: 'left'}}
                            className="btn btn-light">{cons}</button>)}</div>}
                        <hr/>
                    </div>)}
                </div>
                <div className='alsoLike'>
                    <h2>You may also like</h2>
                    <div className='relatePic_container'>
                        {relates[0] && <div><img src={relates[0].url} alt=""/><p>{relates[0].name}</p></div>}
                        {relates[1] && <div><img src={relates[1].url} alt=""/><p>{relates[1].name}</p></div>}
                        {relates[2] && <div><img src={relates[2].url} alt=""/><p>{relates[2].name}</p></div>}
                        {relates[3] && <div><img src={relates[3].url} alt=""/><p>{relates[3].name}</p></div>}
                    </div>
                    <hr/>
                </div>
            </div>
            <Reviews id='review' productId={productId} url={reviewUrl} name={product.name} fun={dataPassFunc}/>
        
        </div>
    );
};

export default Product;


// let product = useSelector(state => state.productReducer.oneProduct)
// product=product.data?.rs
// console.log(product)