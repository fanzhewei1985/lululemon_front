import * as React from 'react';
import Box from '@mui/material/Box';
import Button from "react-bootstrap/Button";
import Modal from '@mui/material/Modal';
import {useDispatch, useSelector} from "react-redux";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import {useState} from "react";
import actions from "../actions";
import './EditButton.scss'
import {useNavigate} from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    height: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    padding:'0'
};

export default function EditButton(props) {
    const product = useSelector(state => state.productReducer.oneProduct)
    console.log(product)
    const [imageIndex, setImageIndex] = useState(0)
    const imageUrlList = product.images?.map((item, index) => {
        return {
            colorAlt: item?.colorAlt && item.colorAlt,
            colorId: item?.colorId && item.colorId,
            imageUrls: item?.mainCarousel && item.mainCarousel?.media && item.mainCarousel.media.split('|')
        }
    })
    const navigate=useNavigate()
    const [userChooseColor, setUserChooseColor] = useState(props.item.swatchAlt)
    const [chooseColorId, setChooseColorId] = useState(props.item.colorId)
    const [userChooseSize, setUserChooseSize] = useState(props.item.size)
    const [sizeIndex, setSizeIndex] = useState(props.item.sizeIndex)
    const [imgIndex, setImgIndex] = useState(0)
    const dispatch = useDispatch()
    const item=imageUrlList?.find(arr=>arr.colorId===chooseColorId)
    console.log(imageUrlList,chooseColorId)
    const imgUrlNew=item?.imageUrls[0]
    console.log(imgUrlNew)

    return (
        <div className='editButton'>
            <Modal
                {...props}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <>
                        <div className='edit'
                             style={{
                                 display: "flex",
                                 flexDirection: "row"
                             }}>
                            <div className='left'>
                                <div className='editImage'>
                                    {imageUrlList?.map((item) => {
                                        if (item.colorAlt === userChooseColor) {
                                            return <div>
                                                <div className='Left_Right_Arrow'>
                                                    {imageIndex !== 0 && <ChevronLeftOutlinedIcon
                                                        className='left-arrow arrow'
                                                        onClick={() => {
                                                            if (imageIndex > 0) {
                                                                setImageIndex(prevState => prevState - 1);
                                                            }
                                                        }}/>}
                                                    {imageIndex !== item.imageUrls.length - 1 && <ChevronRightOutlinedIcon
                                                        className='right-arrow arrow'
                                                        onClick={() => {
                                                            if (imageIndex < item.imageUrls.length - 1) {
                                                                setImageIndex(prevState => prevState + 1);
                                                            }
                                                            else {
                                                                setImageIndex(item.imageUrls.length - 1)
                                                            }
                                                        }}/>}
                                                </div>
                                                <img src={item.imageUrls[imageIndex]} alt=""/>
                                            </div>
                                        }
                                    })}
                                </div>
                            </div>
                            <div className='right'>
                                <h3>{product?.name}</h3>
                                <span>{product?.price}</span>
                                <span>Color:{userChooseColor}</span>
                                <div className='color'>
                                    {
                                    product.swatches && product.swatches.map((item, index) => {
                                        return <div
                                            className={index === imgIndex ? 'eachColor' : 'noColor'}>
                                            <img
                                                key={index}
                                                src={item.swatch}
                                                alt=""
                                                onClick={() => {
                                                    setImgIndex(index)
                                                    setUserChooseColor(item.swatchAlt)
                                                    setChooseColorId(item.colorId)
                                                }}
                                            />
                                        </div>
                                    })
                                }</div>
                                <p style={{marginBottom:'2px',fontWeight:'bold'}}>Size: </p>
                                <div className='sizes'>
                                    {product.sizes
                                        && product.sizes[0]?.details
                                        && product.sizes[0].details.map((size, index) => {
                                            return <div
                                                key={index}
                                                onClick={() => {
                                                    setSizeIndex(index)
                                                    setUserChooseSize(size)
                                                }}
                                                className={sizeIndex === index ? 'size_checked size' : 'size'}
                                            >{size}</div>
                                        })}
                                </div>
                                <button
                                    className='btn btn-danger btn-lg update'
                                    color="error"
                                    onClick={() => {
                                        dispatch(actions.updateItem(props.item.colorId,props.item.size, userChooseSize, userChooseColor, imgUrlNew, product.productId,chooseColorId,sizeIndex))
                                        props.onClose()
                                    }}
                                >Update Item
                                </button>
                               <p className='View' onClick={()=>navigate(`/${product.name.split(' ').join('-')}/${product.productId}/${chooseColorId}`)}> <u>View product details</u></p>
                            </div>
                        </div>
                    </>
                </Box>
            </Modal>
        </div>
    );
}

