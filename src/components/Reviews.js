import React, {useEffect, useState} from 'react';
import {Box, Button, Typography} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './Reviews.scss'
import {Rating} from "@mui/lab";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import {useDispatch, useSelector} from "react-redux";
import actions from "../actions";
import StarIcon from '@mui/icons-material/Star';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ForumIcon from '@mui/icons-material/Forum';
import {Rate} from 'antd';
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import AddIcon from "@mui/icons-material/Add";

const Reviews = ({url, productId,name,fun}) => {

    const [tabIndex, setTabIndex] = useState(1)
    const dispatch = useDispatch()
    const [reviews, setReviews] = useState({
        productId: productId,
        star: 0,
        title: '',
        review: '',
        purchaseSize: '',
        usualSize: '',
        fit: '',
        name: '',
        email: '',
        image: ''
    })
    const [writeRev, setWriteRev] = useState(false)
    const getStars = evt=> setReviews(prevState => {
            return {
                ...prevState, star: evt.target.value
            }
        })

// const [size,setSize]=useState({small:0,large:0,true:0})
//     const [sizeDes,setSizeDes]=useState('')
    const getSelect = (evt) => {
        const {name, value} = evt.target
        // console.log(name, value)
        setReviews(prevState => {
            return {
                ...prevState, [name]: evt.target.value
            }
        })
        // if(evt.target.name==='fit'){
        //   setSize(pre=>({
        //       ...pre,[evt.target.value]:size[evt.target.value]+1
        //   }))
        //     let Sorted = Object.entries(size).sort((prev, next) => prev[1] - next[1])
        //      let max=Sorted.pop()
        //     setSizeDes(max[0])
        // }
    }

    const handleTabChange = (k) => {
        setTabIndex(k)
    }
    const passData = () => {
        const date = new Date().getTime()
        const copyReviews = {...reviews, date: date}
        console.log(copyReviews)
        dispatch(actions.dataCollection(copyReviews))
    }
    const allReviews = useSelector(state => state.productReducer.allReviews)

    localStorage.setItem('reviews',JSON.stringify(allReviews))
    const items = allReviews.filter(arr => arr.productId === productId)
    let s=[0,0,0,0,0]
    s[1]=items.filter(arr=>arr.star*1===1).length
    s[2]=items.filter(arr=>arr.star*1===2).length
    s[3]=items.filter(arr=>arr.star*1===3).length
    s[4]=items.filter(arr=>arr.star*1===4).length
    s[5]=items.filter(arr=>arr.star*1===5).length
    console.log(s)
    const currentT = new Date().getTime()
    // console.log(currentT, typeof currentT)
    // console.log(allReviews)
fun(items.length)
    const totalStar = items.reduce((prev, newV) => prev + newV.star * 1, 0)
    const aveStar =items.length>0? (totalStar / items.length).toFixed(1):0
    const [open,setOpen]=useState(false)
    const [show,setShow]=useState(false)
    const[wordCount,setWordCount]=useState(0)
    const [comment,setComment]=useState(0)
    const [ind, setInd] = useState([])
    const[showComs,setShowComs]=useState({})
    const [filter, setFilter] = useState([])
    useEffect(() => setFilter(items), [allReviews])
    const getValue = (evt) => {
        const filteredData = items.filter(arr => arr.star === evt.target.value)
        if (evt.target.checked) {
            setFilter(filteredData)
        } else if (!evt.target.checked) {
            setFilter(items)
        }
    }
    const filterImg=(evt)=>{
    const imgComments=items.filter(arr=>arr.image)
        if (evt.target.checked) { setFilter(imgComments)}
        else {
            setFilter(items)
    }}
    const getInput=(evt)=>{
        const searchWord=evt.target.value
        const wordFilter=items.filter(arr=>arr.review.includes(searchWord))
        searchWord.length>0&&setFilter(wordFilter)
        searchWord.length===0&&setFilter(items)
    }
    const loadImg = evt => setReviews(pre => ({...pre, image: evt.target.files[0]}))
    const handleSubmit = (event) => {
        event.preventDefault()
        setReviews(pre => ({
            ...pre, image: '', usualSize: '', purchaseSize: '', fit: '',title: '',
            review: ''
        }))
    }
    const changeOption=(type)=>{
       const types={
           recent: { keyF: (obj) => obj['date'], 'isDes': true},
           helpful:{ keyF: (obj) => obj['review'].length, 'isDes': true},
           highest:{ keyF: (obj) => obj['star'], 'isDes': true},
           lowest:{ keyF: (obj) => obj['star'], 'isDes': false},
       }
       const sortProperty=types[type]
        const sorted=items.sort((a,b)=> {
            const diff = sortProperty.keyF(b)-sortProperty.keyF(a);
            return sortProperty.isDes === true ? diff : -1 * diff;
        });
        setFilter(sorted)
    }
    return (
        <div>
            <div className='Product_Reviews'>
                <div className='reviews_Top'>
                    <div className='box_left'>
                        <h2>Reviews</h2>
                        <p className='filter_review'>Filter Reviews</p>
                    </div>
                    <div className='boxes'>
                        <div className='box'>
                            <div>
                                <div className='aveStars'>
                                    <h3>{aveStar} </h3>
                                    <div><Rate allowHalf value={aveStar * 1}
                                               style={{color: 'black', fontSize: '13px'}}/></div>
                                </div>
                                <p>Based on {items.length} reviews</p>
                            </div>
                            <div className='Showing'>Showing {items.length} to {items.length} results</div>
                        </div>
                        <div className='box'>
                            <h3>Fits True to Size</h3>
                            <div>Smaller
                                <label className='radio_container'>
                                    <input className='radio' name='size' value='small' type="radio"/>
                                </label>
                                <label className='radio_container'>
                                    <input className='radio' name='size' value='true' type="radio"/>
                                </label>
                                <label className='radio_container'>
                                    <input className='radio' name='size' value='large' type="radio"/>
                                </label>
                                Larger
                            </div>
                        </div>
                        <div className='box'>
                            <Button onClick={() => {setWriteRev(true)
                            document.body.classList.add('modal-open')
                            //     document.body.style.position = 'fixed';
                            //     document.body.style.top = `-${window.scrollY}px`
                            } } variant="contained">WRITE A REVIEW</Button>
                            <div className='selections'>
                                <span>Sort by:</span>
                                <select onChange={(evt)=>{changeOption(evt.target.value)}}>
                                    <option value='recent'>Most Recent</option>
                                    <option value='helpful'>Most Helpful</option>
                                    <option value='highest'>Highest to Lowest Rating</option>
                                    <option value='lowest'>Lowest to Highest Rating</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='reviews_Container'>
                    <div className='review_Left'>
                        <div className="input-group col-md-4">
                            <FontAwesomeIcon icon={faSearch} className='searchIcon'/>
                            <input onChange={(evt)=>{getInput(evt)}}
                                style={{width: '400px',cursor:'pointer'}} className=" py-2 border-right-0 border"
                                   placeholder='Search Reviews'
                                   id="example-search-input"/>
                        </div>
                        <div className='Rating'>
                            <p>Rating</p>
                            <div>
                                <input style={{cursor:'pointer'}} onClick={(evt) => getValue(evt)} type="checkbox" value='5' name='5'/>
                                <label htmlFor="5">5 Stars<span> {s[5]}</span></label>
                            </div>
                            <div>
                                <input  style={{cursor:'pointer'}} onClick={(evt) => getValue(evt)} type="checkbox" value='4' name='5'/>
                                <label htmlFor="5">4 Stars<span> {s[4]}</span></label>
                            </div>
                            <div>
                                <input  style={{cursor:'pointer'}} onClick={(evt) => getValue(evt)} type="checkbox" value='3' name='5'/>
                                <label htmlFor="5">3 Stars<span> {s[3]}</span></label>
                            </div>
                            <div>
                                <input  style={{cursor:'pointer'}} onClick={(evt) => getValue(evt)} type="checkbox" value='2' name='2'/>
                                <label htmlFor="5">2 Stars<span> {s[2]}</span></label>
                            </div>
                            <div>
                                <input  style={{cursor:'pointer'}} onClick={(evt) => getValue(evt)} type="checkbox" value='1' name='1'/>
                                <label htmlFor="5">1 Stars<span> {s[1]}</span></label>
                            </div>
                            <hr/>
                            <p>Photos</p>
                            <div>
                                <input onChange={(evt)=>filterImg(evt)} style={{cursor:'pointer'}} type="checkbox" name='images'/>
                                <label htmlFor="images">Only show posts with images</label>
                            </div>
                        </div>
                    </div>
                    <div className='reviews_Right'>
                        {filter.map((arr, index) => <div className='each_review'>
                            <div className='comments_top'>
                                <p><span className='capital'><span>{arr?.name.charAt(0).toUpperCase()}</span></span></p>
                                <p className='reviewer_name'>{arr?.name}</p>
                                <div className='review_time'>
                                    {Math.floor((currentT - arr.date * 1) / 86400000)>0?`${Math.floor((currentT - arr.date * 1) / 86400000)} days ago` : 'Just Now'}
                                </div>
                            </div>
                            <div>{Array(arr.star * 1).fill().map(() => <StarIcon className='star'/>)}</div>
                            <h4 className='review_title'>{arr?.title}</h4>
                            <p className='review_content'>{arr?.review}</p>
                            {arr?.image &&
                                <div className='reviewPic'><img src={URL.createObjectURL(arr?.image)} alt=""/></div>}
                            <div className='reviewer_size'>
                                <p>Usual Size: <span> {arr?.usualSize}</span></p>
                                <p>Size Purchased: <span> {arr?.purchaseSize}</span></p>
                                <p>Fits: <span> {arr?.fit}</span></p>
                            </div>
                            <div className='review_icons'>
                                <div onClick={() => {
                                    setInd(pre => {
                                        let copy = [...pre]
                                        copy.push(index)
                                        return copy
                                    })
                                }}>
                                    {ind.includes(index) ? <div style={{cursor:'pointer'}}><ThumbUpAltIcon/>1</div> : <ThumbUpOffAltIcon/>}
                                </div>
                                <div style={{cursor:'pointer'}} onClick={()=>setShowComs(prev=>({...prev,[index]:true}))} className='icon'><ForumIcon /> Leave a comment</div>
                            </div>
                                {showComs[index]&&<div>
                                    <hr/>
                                    Comment({comment}/500)
                                    <button style={{backgroundColor:'transparent',border:'none',transform:'translateX(3300%)'}} onClick={() => setShowComs(prev=>({...prev,[index]:false}))}><FontAwesomeIcon
                                        icon={faXmark}/></button>
                                    <div className='textContainer'><textarea onChange={(evt) =>{ setComment(evt.target.value.length)}} name="review" cols="115" rows="5"
                                                                             required placeholder='Write a comment'></textarea>
                                    </div>
                                    <Button  variant="contained">POST COMMENT</Button>
                                </div>}

                        </div>)}
                    </div>
                </div>
            </div>
            {writeRev && <div className='NavTab'>
                <div className='NavTab_left'><img src={url} alt=""/></div>
                <div className='NavTab_right'>
                    <div className='NavTab_Top'>
                        <h3>Write a review for <span>{name}</span></h3>
                        <button className='closeBtn' onClick={() =>{setWriteRev(false)
                            document.body.classList.remove('modal-open')

                        }}><FontAwesomeIcon
                            icon={faXmark}/></button>
                    </div>
                    <Tabs
                        defaultActiveKey='1'
                        id="tab"
                        className="mb-3"
                        fill
                        activeKey={tabIndex}
                        onSelect={(k) => handleTabChange(k)}
                    >
                        <Tab eventKey="1" title="Feedback">
                            <form onSubmit={handleSubmit}>
                                <Typography component="legend">Your overall rating*</Typography>
                                <Rating
                                    name="simple-controlled"
                                    value={reviews.star}
                                    onChange={(evt) => {
                                        getStars(evt)

                                    }
                                    }/>
                                <br/>
                                <label htmlFor="title">Review Title</label>
                                <br/>
                                <input onChange={(evt) => getSelect(evt)} name='title' style={{width: '100%',cursor:'pointer'}}
                                       className=" py-2 border-right-0 border"
                                       placeholder='E.g."Super comfortable!' required/>
                                <br/>
                                <div className='Review_Text'>
                                <label htmlFor="review">Review* (25-500 characters)</label>
                                <br/>
                                <div className='textContainer'><textarea onChange={(evt) =>{ getSelect(evt)
                                setWordCount(evt.target.value.length)}} name="review" id="" cols="50" rows="5"
                                          required placeholder='Tell others about your gear'></textarea>
                                <p>{wordCount}/500</p>
                                </div>
                                </div>
                                <div className='guidelines'>
                                <p>Writing guidelines</p>
                                <div onClick={()=>setOpen(!open)}>
                                    {open?<HorizontalRuleIcon className='subIcons'/>: <AddIcon className='subIcons'/>}
                                </div>
                                </div>
                                    {open? <ul className='guides'>
                                        <li>Keep your review focused on the product</li>
                                        <li> Instead of writing about an experience you’ve had, please contact us with any issues you need support with</li>
                                        <li> Avoid mentioning competitors or the specific price you paid for the product</li>
                                        <li> Don’t include any personally identifiable information, such as your full name or social media handle
                                        </li>
                                    </ul>:''}

                                <Button
                                    disabled={reviews.title&&wordCount>25?false:true}
                                    style={{width: '100%',padding:'10px',marginTop:'10px'}}
                                    onClick={(evt) => {
                                    // console.log(evt.target.tabIndex)
                                    setTabIndex(tabIndex * 1 + 1)

                                }} variant="contained">NEXT STEP</Button>
                                <p className='note'>Asterisk (*) indicates mandatory field</p>
                            </form>
                        </Tab>
                        <Tab eventKey="2" title="Size & Fit">
                            <p>Help others find the perfect fit by providing some <strong>optional</strong> information.
                            </p>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="bodySize">What's your body type?</label>
                                <select name='bodySize' className="form-select form-select-lg mb-3"
                                        aria-label=".form-select-lg example">
                                    <option selected>Select...</option>
                                    <option value="1">Athletic</option>
                                    <option value="2">Slim</option>
                                    <option value="3">Curvy</option>
                                </select>
                                <label htmlFor="gear">I mainly wear my Lululemon gear to...</label>
                                <select name='gear' className="form-select form-select-lg mb-3"
                                        aria-label=".form-select-lg example">
                                    <option selected>Select...</option>
                                    <option value="1">Dance</option>
                                    <option value="2">Cycle</option>
                                    <option value="3">Run</option>
                                </select>

                                <label htmlFor="purchaseSize">What size did you purchase?</label>
                                <select onChange={(evt) => getSelect(evt)} name='purchaseSize'
                                        className="form-select form-select-lg mb-3"
                                        aria-label=".form-select-lg example">
                                    <option selected>Select...</option>
                                    <option value="0">0</option>
                                    <option value="2">2</option>
                                    <option value="4">4</option>
                                    <option value="6">6</option>
                                </select>
                                <label htmlFor="usualSize">What is your usual size?</label>
                                <select onChange={(evt) => getSelect(evt)} name='usualSize'
                                        className="form-select form-select-lg mb-3"
                                        aria-label=".form-select-lg example">
                                    <option selected>Select...</option>
                                    <option value="0">0</option>
                                    <option value="2">2</option>
                                    <option value="4">4</option>
                                    <option value="6">6</option>
                                </select>
                                <label htmlFor="fit">How did your gear fit?</label>
                                <select onChange={(evt) => getSelect(evt)} name='fit'
                                        className="form-select form-select-lg mb-3"
                                        aria-label=".form-select-lg example">
                                    <option selected>Select...</option>
                                    <option value="small">Runs small</option>
                                    <option value="true">True to size</option>
                                    <option value="large">Runs large</option>
                                </select>

                                <Button   style={{width: '100%',padding:'10px',marginTop:'10px'}}
                                    onClick={(evt) => {
                                    setTabIndex(tabIndex * 1 + 1)
                                }} variant="contained">NEXT STEP</Button>
                                <p style={{width:'35%',textAlign:'center',margin:'5px auto',borderBottom:'1px solid lightGray'}}
                                    onClick={(evt) => {
                                    setTabIndex(tabIndex * 1 - 1)
                                }
                                    }><small>Edit Previous Step</small></p>
                            </form>
                        </Tab>
                        <Tab eventKey="3" title="Photo">
                            <p style={{fontWeight:'bold'}}>Add a photo (Optional)</p>
                            <p style={{fontFamily:'Calibre_Light'}}>Upload a PNG, GIF, JPG, JPEG, HEIC, or TIFF (Max 10MB)</p>
                            <div className='guidelines'><p>Photo guidelines</p>
                            <div onClick={()=>setShow(!show)}>
                                {show?<HorizontalRuleIcon className='subIcons'/>: <AddIcon className='subIcons'/>}
                            </div>
                            </div>
                {show? <ul className='guides'>
                    <li>Image must be at least 100 pixels tall.</li>
                    <li>Image must be at least 100 pixels wide.</li>
                    <li>If you are not the copyright holder, you may not submit copyrighted images. </li>
                    <li>Objectionable images will be rejected.</li>
                    <li>Uploaded images become the property of lululemon athletica inc.</li>
                </ul>:''}
                            <form onSubmit={handleSubmit} style={{width:'40%',position:'absolute',bottom:'40px',right:'60px'}}>
                                <input className="form-control"
                                    style={{width:'100%'}}
                                    onChange={evt => loadImg(evt)} type="file" id="myFile" name="filename"/>

                                <Button   style={{width: '100%',padding:'10px',marginTop:'10px'}}
                                    onClick={(evt) => {
                                    setTabIndex(tabIndex * 1 + 1)
                                }} variant="contained">NEXT STEP</Button>
                                <p style={{width:'35%',whiteSpace:'nowrap',textAlign:'center',margin:'5px auto',borderBottom:'1px solid lightGray'}}
                                    onClick={(evt) => {
                                    setTabIndex(tabIndex * 1 - 1)
                                }
                                    }><small>Edit Previous Step</small></p>
                            </form>
                        </Tab>
                        <Tab eventKey="4" title="Info">
                            <p style={{fontFamily:'Calibre_Bold'}}>Your Info <small style={{fontFamily:'Calibre_Light'}} >(Required)</small></p>
                            <form onSubmit={handleSubmit}>
                                <label  htmlFor="name">Nickname* <small style={{fontFamily:'Calibre_Light'}} > (Name displayed; 4–25 characters.)</small></label>
                                <br/>
                                <input onChange={(evt) => getSelect(evt)} name='name' style={{width: '400px'}}
                                       className=" py-2 border-right-0 border"
                                       placeholder='Example:Jackie27' required/>
                                <label style={{marginTop:'12px'}} htmlFor="email">Email* <small style={{fontFamily:'Calibre_Light'}} > (Will not be displayed.)</small></label>
                                <br/>
                                <input onChange={(evt) => getSelect(evt)} type='email' name='email'
                                       style={{width: '400px'}}
                                       className=" py-2 border-right-0 border"
                                       placeholder='Example:yourname@email.com' required/>
                                <br/>
                                <input  style={{marginTop:'15px',marginRight:'8px',cursor:'pointer'}}  type='checkbox' name='check'/>
                                <label htmlFor="check">Email me when others reply to my review.</label>
<br />
                                <p style={{marginTop:'12px',fontFamily:'Calibre_Light',fontSize:'14px'}}>By submitting a review you agree to our<u> <strong>Terms & Conditions</strong> </u>and
                                    Privacy Policy.</p>
                                <Button   style={{width: '100%',padding:'10px',marginTop:'10px'}}
                                    type='submit' onClick={() => passData()} variant="contained">SUBMIT
                                    REVIEW</Button>
                                <p style={{width:'35%',whiteSpace:'nowrap',textAlign:'center',margin:'5px auto',borderBottom:'1px solid lightGray'}}
                                   onClick={(evt) => {
                                       setTabIndex(tabIndex * 1 - 1)
                                   }
                                   }><small>Edit Previous Step</small></p>
                            </form>
                        </Tab>
                    </Tabs>
                </div>

            </div>}
        </div>
    );
};

export default Reviews;