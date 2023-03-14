import React, {useEffect, useRef, useState} from 'react';
import './Filter.scss'
import {useDispatch, useSelector} from "react-redux";
import actions from '../actions'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import AddIcon from '@mui/icons-material/Add';
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Filter = ({child}) => {
    useEffect(() => { dispatch(actions.fetchAllFilters())}, [])
    const filter = useSelector(state => state.productReducer.filter)
    const women = useSelector(state => state.productReducer.isWomen)
    const men = useSelector(state => state.productReducer.isMen)
    let refs = useRef([React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef()]);
    let rotateRefs = useRef([React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef()]);
    // console.log(women)
    // console.log(filter)
    const totalProducts=useSelector(state=>state.productReducer.totalProducts)
    const key = Object.keys(filter)
    const dispatch = useDispatch()
    const getChecked = (name, key) => {
        dispatch(actions.filterItem(name, key))
        if (name === 'Women') {
            dispatch(actions.setWomen())
        } else if (name === 'Men') {dispatch(actions.setMen())}
    }
    const contentTog = (index) => {
        refs.current.forEach((ref, i) => {
            if (i === index) {
                ref.current.classList.toggle('hide')
            }})
        rotateRefs.current.forEach((ref, i) => {
                if (i === index) {
//                     console.log(ref.current.className)
                    if (ref.current.className.includes('rotateBack')) {
                        ref.current.className = 'rotate'
                    } else if (!ref.current.className.includes('rotateBack')) {
                        ref.current.className = 'rotateBack'
                    }
                    //     ref.current.classList.toggle('rotate')
                }})
    }
    const [ind,setInd]=useState()
    const [spread,setSpread]=useState(false)
    const spreadMore=(evt,index)=>{
        setInd(index)
        setSpread(true)
    }
    const spreadLess=(evt,index)=>{
        setInd(index)
        setSpread(false)
    }
    const [slide,setSlide]=useState(false)
    const filterTranslate=()=>{
      setSlide(true)
    }
    const slideStyle=slide?'':'translateX(-100%)'
    return (
        <div>
            <h1 className='womenMen'>{women && men ? '' : women && "Women's" || men && "Men's"} What's New</h1>
         <button onClick={filterTranslate} className='filterBtn'>FILTER $ SORT({child})</button>
        <div className='Filter' style={{transform:`${slideStyle}`}}>
         <div className='filterH1'>
            <h1>{women && men ? '' : women && "Women's" || men && "Men's"} What's New</h1>
            <button onClick={()=>setSlide(false)}className='closeFilter'><FontAwesomeIcon icon={faXmark}/></button>
            </div>
            <hr/>
            {key.map((k, index) => {
                return (<div>
                    <div className='filter_header'>
                        <h3>{k}</h3>
                        <div className='lines' onClick={() => contentTog(index)}>
                            <div className='line1'><HorizontalRuleIcon/></div>
                            <div ref={rotateRefs.current[index]} className='rotateBack'><HorizontalRuleIcon/></div>
                        </div>
                    </div>
                    <div ref={refs.current[index]}>
                        <div className='Colour'>
                            {k === 'Colour' && filter[k].map(item => <div className='colour_container'>
                                <div className='swatch_container'><img onClick={(e) => getChecked(item.alt, k)}
                                                                       className='swatchPic' src={item.swatch}
                                                                       alt={item.alt}/></div>
                                <p>{item.alt}</p>
                            </div>)}
                        </div>
                        <div>
                            {k !== 'Colour' && filter[k].length < 6 && filter[k].map(item =><div
                                className='inputContainer'>
                                {/*<button>{item.isChecked?<FontAwesomeIcon icon={faSquareCheck} />:<FontAwesomeIcon icon={faSquare} />}</button>*/}
                                <input
                                    type="checkbox"
                                    name={item.name}
                                    checked={item.isChecked ? true : false}
                                    onChange={(e) => getChecked(item.name, k)}/>
                                <label className='' htmlFor={item.name}>{item.name}</label>
                            </div>)}
                            {k !== 'Colour' && filter[k].length > 6 && <div className={ind===index&&spread?'restFilters_show':'restFilters'}>
                                {filter[k].map(item => <div className='inputContainer'>
                                    <input
                                        type="checkbox"
                                        name={item.name}
                                        checked={item.isChecked ? true : false}
                                        onChange={(e) => getChecked(item.name, k)}/>
                                    <label className='' htmlFor={item.name}>{item.name}</label>
                                </div>)}
                            </div>}
                        </div>
                        {k !== 'Colour' && filter[k].length > 6 && <div className='viewMore'>
                            {ind===index&&spread? <div className='viewIcon'> <p onClick={(evt) => {spreadLess(evt,index)}}>View Less</p><HorizontalRuleIcon className='subIcons'/></div>:<div className='viewIcon'><p onClick={(evt) => {spreadMore(evt,index)}}>View More</p><AddIcon className='subIcons'/></div>}

                        </div>
                            }
                    </div>

                    <hr/>
                </div>)
            })}
              <button className='viewItemFilter' onClick={()=>setSlide(false)}>VIEW ITEMS ({totalProducts})</button>
        </div>
      
        </div>)
}


export default Filter;
