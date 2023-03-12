import React, {useEffect, useRef, useState} from 'react';
import './Products.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
// import {faChevronRight} from "@fortawesome/free-solid-svg-icons/faChevronRight";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {Link} from 'react-router-dom'
import actions from "../actions";
import {useDispatch} from "react-redux";


const SwatchesCarousel = ({swatches, productId, images,price,name}) => {
    const [bgUrl, setBgUrl] = useState(images[0]?.mainCarousel?.media?.split('|')[0])
    const dispatch=useDispatch()
    const changePic = (colorId,index) => {
        setBgUrl(`http://api-lulu.hibitbyte.com/static/images/productImages/${productId}/${colorId}/${productId}_${colorId}_img${index}.jpg`)
    }
    useEffect(() => setBgUrl(images[0]?.mainCarousel?.media?.split('|')[0]), [images])
const [style,setStyle]=useState('')
    const eleDiv=useRef()
    // const position=eleDiv.current?.getBoundingClientRect()?.left
    const [pos,setPos]=useState(0)
    const length=Math.ceil(swatches.length/7)
    const [count,setCount]=useState(0)
    const [checkLeft,setCheckLeft]=useState(true)
    const [checkRight,setCheckRight]=useState(false)
    const[colID,setColID]=useState('')
    const moveLeft=()=>{
        if(count<length-1) {setPos((prevState)=>{let newState=prevState-280
setStyle(`${newState}px`)
return newState})
            setCount((prevState)=> {
                let newState = prevState + 1
                if (newState===length-1){setCheckRight(true)}
                return newState
            })
            setCheckLeft(false)}
        
    }

    const moveRight=()=>{
       if(count>0) {setPos((prevState)=>{let newState=prevState+280
            setStyle(`${newState}px`)
            return newState})
           setCount(prevState => {let newState=prevState-1
           if (newState===0) setCheckLeft(true)
           return newState})
           setCheckRight(false)}
       }
const changeBG=(evt,index)=>{let colorId=evt.target.src.split('_')[1]
    changePic(colorId,index)
    setColID(colorId)}
    return (
        <div className='SwatchesCarousel_Boss'>
            <Link to={`/${name.split(' ').join('-')}/${productId}/${colID}`} className='picContainer'><img onMouseEnter={(evt)=>changeBG(evt,1)}
                                                                                                           onMouseLeave={(evt)=>changeBG(evt,0)}
                                                                                                           onClick={()=>dispatch(actions.fetchProduct(productId))}
                className='productPic' src={bgUrl} alt=''/></Link>
            <div className='SwatchesCarousel_Sub_boss'>
                <div  className='SwatchesCarousel_3rd_Boss'>
                <div ref={eleDiv} style={{left:`${style}`}}  className='SwatchesCarousel'>
                    {swatches?.map((arr,index) => <Link to={`/${name.split(' ').join('-')}/${productId}/${arr.colorId}`} className='swatch_container'><img className='swatchPic'
                                                                                                                                                           onClick={()=>dispatch(actions.fetchProduct(productId))}
                                                                                 onMouseEnter={() =>changePic(arr?.colorId,0)}
                                                                                 src={arr?.swatch} key={index}/></Link>)}
                </div>
              
                </div>
               {length>1&&<div className='circlePlus'><FontAwesomeIcon icon={faPlus}/> </div>}
                {length>1 && <div className='car_btns'>
                    <button disabled={checkLeft} onClick={(evt)=>{moveRight(evt)}} className='car_btn left'>
                        {/* <FontAwesomeIcon icon={faChevronLeft}/> */}
                        <ArrowBackIosIcon/>
                    </button>
                    <button disabled={checkRight} className='car_btn right' onClick={(evt)=>{moveLeft(evt)}}>
                        {/* <FontAwesomeIcon icon={faChevronRight}/> */}
                        <ArrowForwardIosIcon/>
                    </button>
                </div>}
            </div>
            <div className='price_name'>
                <div className='productName'>{name}</div>
                <div className='productPrice'>{price.split('C')[0]}</div>
            </div>
            <p className='colorNumber'>{swatches.length} colours</p>
        </div>
    );
};

export default SwatchesCarousel;