import React, {useRef, useState} from 'react';
import './Header.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {faLocationPin} from "@fortawesome/free-solid-svg-icons";
import {faPerson} from "@fortawesome/free-solid-svg-icons";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import {faGift} from "@fortawesome/free-solid-svg-icons";
import {faGlobe} from "@fortawesome/free-solid-svg-icons";
import {faBagShopping} from "@fortawesome/free-solid-svg-icons/faBagShopping";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {faBars} from '@fortawesome/free-solid-svg-icons';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import actions from "../actions";
import Button from "react-bootstrap/Button";

const Header = () => {
    const [searchFocusIn, setSearchFocusIn] = useState(false)
    const [xMark, setXmark] = useState(false)
    const [mouseWomenOver, setMouseWomenOver] = useState(false)
    const [mouseMenOver, setMouseMenOver] = useState(false)
    const [mouseAccessoriesOver, setMouseAccessoriesOver] = useState(false)
    const [mouseGiftOver, setMouseGiftOver] = useState(false)
    const token = useSelector(state => state.productReducer.token)
    const dispatch = useDispatch()
    const Input = () => {
        setXmark(true)
    }
    const search = useRef(null)
    const SearchInputFocusIn = () => {
        setSearchFocusIn(true)
    }
    const SearchInputFocusOut = () => {
        setSearchFocusIn(false)
        search.current.value = ''
        setXmark(false)
    }

    const WomenAppear = () => {
        setMouseWomenOver(true)
    }
    const WomenDisappear = () => {
        setMouseWomenOver(false)
    }
    const MenAppear = () => {
        setMouseMenOver(true)
    }
    const MenDisappear = () => {
        setMouseMenOver(false)
    }
    const AccAppear = () => {
        setMouseAccessoriesOver(true)
    }
    const AccDisappear = () => {
        setMouseAccessoriesOver(false)
    }
    const GiftAppear = () => {
        setMouseGiftOver(true)
    }
    const GiftDisappear = () => {
        setMouseGiftOver(false)
    }
    const [showMenu, setShowMenu] = useState(false)
    const menuHandler = () => {
        setShowMenu(!showMenu)
    }
    const bagData = useSelector(state => state.productReducer.bagData)
    const totalPrice = bagData.reduce((current, next) => current * 1 + next.price?.match(/\d+/)[0] * next.quantity, 0)
    return (
        <div className='headerTotal'>
            <div className='Top Wrapper'>
                <span>Shipping cuts off tonight-shop now to get gear that fills their hearts with cheer.</span>
                <a href="#">Explore the Gift Guide</a>
            </div>
            <FontAwesomeIcon icon={faXmark} className='Close'/>
            <div className='Middle'>
                <div className='Wrapper'>
                    <ul className='ShortCut'>
                        <li className='Store'><a href="#">
                            <FontAwesomeIcon icon={faLocationPin} className='SpecialFont'/>
                            <span>Store Locator</span>
                        </a></li>
                        <li className='Store'><a href="#">
                            <FontAwesomeIcon icon={faPerson} className='SpecialFont'/>
                            {token ? <span onClick={() => dispatch(actions.signOut())}>Sign Out</span> :
                               <Link to='/logIn'><span>Sign In</span></Link>}
                        </a></li>
                        <li className='Store'><a href="#">
                            <FontAwesomeIcon icon={faHeart} className='SpecialFont'/>
                            <span>Wish List</span>
                        </a></li>
                        <li className='Store'><a href="#">
                            <FontAwesomeIcon icon={faGift} className='SpecialFont'/>
                            <span>Gift Cards</span>
                        </a></li>
                        <li className='Store'><a href="#">
                            <FontAwesomeIcon icon={faGlobe} className='SpecialFont'/>
                            <span>CAN</span>
                        </a></li>
                    </ul>
                    <button onClick={menuHandler} className='burgerMenu'><FontAwesomeIcon icon={faBars}/></button>
                </div>
            </div>
            <div className='NavBar'>
                <div className='Wrapper Container'>
                    <Link to={'/'} className='Logo'>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Lululemon_Athletica_logo.svg/2048px-Lululemon_Athletica_logo.svg.png"
                            alt=""/>
                    </Link>

                    <div className={showMenu ? 'no_Classification' : 'Classification'}>
                        <div className='LogoInside'>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Lululemon_Athletica_logo.svg/2048px-Lululemon_Athletica_logo.svg.png"
                                alt=""/>
                            <button onClick={() => setShowMenu(false)} className='menuCloseBtn'><FontAwesomeIcon
                                icon={faXmark}/></button>
                        </div>
                        <ul>
                            <li id='WOMEN'><a href="#"
                                              onMouseEnter={WomenAppear}
                                              onMouseLeave={WomenDisappear}
                            >WOMEN</a>
                                <div className='nextBtn'><NavigateNextIcon/></div>
                            </li>
                            <li><a href="#" onMouseEnter={MenAppear} onMouseLeave={MenDisappear}>MEN</a>
                                <div className='nextBtn'><NavigateNextIcon/></div>
                            </li>
                            <li><a href="#" onMouseEnter={AccAppear} onMouseLeave={AccDisappear}>ACCESSORIES</a>
                                <div className='nextBtn'><NavigateNextIcon/></div>
                            </li>
                            <li><a href="#">SHOES</a>
                                <div className='nextBtn'><NavigateNextIcon/></div>
                            </li>
                            <li><a href="#">STUDIO</a>
                                <div className='nextBtn'><NavigateNextIcon/></div>
                            </li>
                            <li><a href="#" className='Gifts' onMouseEnter={GiftAppear}
                                   onMouseLeave={GiftDisappear}>GIFTS</a>
                                <div className='nextBtn'><NavigateNextIcon/></div>
                            </li>
                        </ul>
                    </div>
                    <div className='Right_Size'>
                        <div className='Search'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} className='Find'/>
                            <div className='null'></div>
                            <input className='inputBox' type="text" placeholder='Search'
                                   onFocus={SearchInputFocusIn}
                                   onBlur={SearchInputFocusOut}
                                   onChange={Input}
                                   ref={search}
                            />
                            <FontAwesomeIcon icon={faXmark} className={xMark ? 'Close' : 'Disappear'}
                                             onClick={SearchInputFocusOut}/>
                        </div>
                        <div className="dropdown">
                            <div className="dropbtn">
                                <Link to='/myBag' class="dropbtn">
                                    <FontAwesomeIcon icon={faBagShopping} className='Shopping'/></Link>
                                <span style={{color: "red"}}>{bagData.length}</span>
                            </div>
                            {bagData.length>0 && <div className="dropdown-content">
                                <h3>Items in your bag</h3>
                                <hr/>
                                {bagData && bagData.map(arr => <div className="dataInCheckout">
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
                                <p style={{textAlign:"right",fontSize:'22px'}}>Subtotal <span>$ {totalPrice}</span></p>
                                <Link to='/myBag'> <Button variant="contained" className='btn btn-danger' style={{width:'100%'}}>VIEW BAG & CHECKOUT</Button></Link>
                            </div>}
                        </div>
                </div>
                <div className={searchFocusIn ? 'GuessWhatLike' : 'GuessWhatLike Disappear'}>
                    {/*<ul>*/}
                    {/*    <li className='Trending_Searches'><span>TRENDING SEARCHES</span></li>*/}
                    {/*    <li><a href="#">scuba</a></li>*/}
                    {/*    <li><a href="#">belt bag</a></li>*/}
                    {/*    <li><a href="#">align</a></li>*/}
                    {/*    <li><a href="#">define jacket</a></li>*/}
                    {/*    <li><a href="#">bag</a></li>*/}
                    {/*</ul>*/}
                </div>
            </div>

        </div>
    <div className={mouseWomenOver ? 'DetailForWomen' : 'Disappear'}>
        <div className='Wrapper'>
            <div className='left_size'>
                <ul>
                    <li><a href="#">What's New</a></li>
                    <li><a href="#">Bestsellers</a></li>
                    <li><a href="#">Gifts for Her</a></li>
                    <li><a href="#">Cozy Gifts for Her</a></li>
                    <li><a href="#">Align Shop</a></li>
                    <li><a href="#">Scuba Shop</a></li>
                    <li><a href="#">Flare Pants Shop</a></li>
                    <li><a href="#">Plus Size Clothes</a></li>
                    <li><a href="#">We Made Too Much</a></li>
                </ul>
            </div>
            <div className='middle_size'>
                <div className='m_left_size'>
                    <ul>
                        <li><a href="#" className='Title'>WOMEN'S CLOTHES</a></li>
                        <li><a href="#">Leggings</a></li>
                        <li><a href="#">Coats & Jackets</a></li>
                        <li><a href="#">Dresses</a></li>
                        <li><a href="#">Hoodies & Sweatshirts</a></li>
                        <li><a href="#">Joggers</a></li>
                        <li><a href="#">Pants</a></li>
                        <li><a href="#">Shirts</a></li>
                        <li><a href="#">Shoes</a></li>
                    </ul>
                </div>
                <div className='m_middle_size'>
                    <ul>
                        <li><a href="#">Shorts</a></li>
                        <li><a href="#">Skirts</a></li>
                        <li><a href="#">Socks</a></li>
                        <li><a href="#">Sports Bras</a></li>
                        <li><a href="#">Sweaters</a></li>
                        <li><a href="#">Swimsuits</a></li>
                        <li><a href="#">Tank Tops</a></li>
                        <li><a href="#">Underwear</a></li>
                    </ul>
                </div>
                <div className='m_right_size'>
                    <ul>
                        <li><a href="#" className='Title'>ACCESSORIES</a></li>
                        <li><a href="#">Bags</a></li>
                        <li><a href="#">Equipment</a></li>
                        <li><a href="#">Gloves & Mittens</a></li>
                        <li><a href="#">Hair Accessories</a></li>
                        <li><a href="#">Hats</a></li>
                        <li><a href="#">Scarves & Wraps</a></li>
                        <li><a href="#">Water Bottles</a></li>
                        <li><a href="#">Yoga Mats</a></li>
                    </ul>
                </div>
            </div>
            <div className='right_size'>
                <img src="./img/women.png" alt=""/>
                <h2>Hurry,grab holiday hits that'll</h2>
                <h2 className='line-2-title'>top their list</h2>
                <p>Wrap up comfort and joy with a roomy hoodie</p>
                <p className='line-2-intro'>made from soft,breathable fabric</p>
                <a href="#">Shop Gifts for Her</a>
            </div>
        </div>
        <div className='bottom'>
            <div className='left_size'>
                <span>ACTIVITY</span>
            </div>
            <div className='middle_size'>
                <ul>
                    <li><a href="#">Workout</a></li>
                    <li><a href="#">Running</a></li>
                    <li><a href="#">Yoga</a></li>
                    <li><a href="#">Casual</a></li>
                    <li><a href="#">Hiking</a></li>
                    <li><a href="#">Work</a></li>
                </ul>
            </div>
            <div className='right_size'>
                <a href="#">SHOP ALL WOMEN</a>
            </div>

        </div>
    </div>
    <div className={mouseMenOver ? 'DetailForMen' : 'Disappear'}>
        <div className='Wrapper'>
            <div className='left_size'>
                <ul>
                    <li><a href="#">What's New</a></li>
                    <li><a href="#">Bestsellers</a></li>
                    <li><a href="#">ABC Pants Shop</a></li>
                    <li><a href="#">Gifts for Him</a></li>
                    <li><a href="#">Cozy Gifts for Him</a></li>
                    <li><a href="#">Business Causal Clothes</a></li>
                    <li><a href="#">lululemon lab</a></li>
                    <li><a href="#">Multipacks</a></li>
                    <li><a href="#">We Made Too Much</a></li>
                </ul>
            </div>
            <div className='middle_size'>
                <div className='m_left_size'>
                    <ul>
                        <li><a href="#" className='Title'>MEN'S CLOTHES</a></li>
                        <li><a href="#">Joggers</a></li>
                        <li><a href="#">Button Down Shirts</a></li>
                        <li><a href="#">Coats & Jackets</a></li>
                        <li><a href="#">Hoodies & Sweatshirts</a></li>
                        <li><a href="#">Pants</a></li>
                        <li><a href="#">Polo Shirts</a></li>
                        <li><a href="#">Shirts</a></li>
                        <li><a href="#">Shoes</a></li>
                    </ul>
                </div>
                <div className='m_middle_size'>
                    <ul>
                        <li><a href="#">Shorts</a></li>
                        <li><a href="#">Socks</a></li>
                        <li><a href="#">Sweaters</a></li>
                        <li><a href="#">Swim Trunks</a></li>
                        <li><a href="#">Tank Tops</a></li>
                        <li><a href="#">Trousers</a></li>
                        <li><a href="#">T-Shirts</a></li>
                        <li><a href="#">Underwear</a></li>
                    </ul>
                </div>
                <div className='m_right_size'>
                    <ul>
                        <li><a href="#" className='Title'>ACCESSORIES</a></li>
                        <li><a href="#">Bags</a></li>
                        <li><a href="#">Equipment</a></li>
                        <li><a href="#">Gloves & Mittens</a></li>
                        <li><a href="#">Hair Accessories</a></li>
                        <li><a href="#">Hats</a></li>
                        <li><a href="#">Scarves & Wraps</a></li>
                        <li><a href="#">Water Bottles</a></li>
                        <li><a href="#">Yoga Mats</a></li>
                    </ul>
                </div>
            </div>
            <div className='right_size'>
                <img src="./img/Men.png" alt=""/>
                <h2>The holidays are in sight-</h2>
                <h2 className='line-2-title'>wrap up gifts tonight</h2>
                <p>Give them a merry Wish List and an active</p>
                <p>new year with high-performance,go get em'</p>
                <p>gear</p>
                <a href="#">Shop Gifts for Him</a>
            </div>
        </div>
        <div className='bottom'>
            <div className='left_size'>
                <span>ACTIVITY</span>
            </div>
            <div className='middle_size'>
                <ul>
                    <li><a href="#">Workout</a></li>
                    <li><a href="#">Running</a></li>
                    <li><a href="#">Golf</a></li>
                    <li><a href="#">Casual</a></li>
                    <li><a href="#">Yoga</a></li>
                    <li><a href="#">Hiking</a></li>
                </ul>
            </div>
            <div className='right_size'>
                <a href="#">SHOP ALL MEN</a>
            </div>

        </div>
    </div>
    <div className={mouseAccessoriesOver ? 'DetailForAccessories' : 'Disappear'}>
        <div className='Wrapper'>
            <div className='left_size'>
                <ul>
                    <li><a href="#">What's New</a></li>
                    <li><a href="#">Bestsellers</a></li>
                    <li><a href="#">Gifts Under $50</a></li>
                    <li><a href="#">Fleece Accessories</a></li>
                    <li><a href="#">Mini Bags</a></li>
                    <li><a href="#">Winter Accessories</a></li>
                    <li><a href="#">Travel Accessories</a></li>
                    <li><a href="#">We Made Too Much</a></li>
                </ul>
            </div>
            <div className='middle_size'>
                <div className='m_left_size'>
                    <ul>
                        <li><a href="#" className='Title'>ACCESSORIES</a></li>
                        <li><a href="#">Backpacks</a></li>
                        <li><a href="#">Bags</a></li>
                        <li><a href="#">Beanies</a></li>
                        <li><a href="#">Belt Bags</a></li>
                        <li><a href="#">Crossbody Bags</a></li>
                        <li><a href="#">Equipment</a></li>
                        <li><a href="#">Gloves & Mittens</a></li>
                        <li><a href="#">Hair Accessories</a></li>
                        <li><a href="#">Hats</a></li>
                    </ul>
                </div>
                <div className='m_middle_size'>
                    <ul>
                        <li><a href="#">Keychains</a></li>
                        <li><a href="#">Men's Socks</a></li>
                        <li><a href="#">Scarves & Wraps</a></li>
                        <li><a href="#">Selfcare</a></li>
                        <li><a href="#">Wallets & Pouches</a></li>
                        <li><a href="#">Water Bottles</a></li>
                        <li><a href="#">Women's Socks</a></li>
                        <li><a href="#">Yoga Mats</a></li>
                    </ul>
                </div>
                <div className='m_right_size'></div>
            </div>
            <div className='right_size'>
                <img src="./img/Accessories.png" alt=""/>
                <h2>Choice gifts</h2>
                <p>Let them pick their presents with eGift Cards</p>
                <p className='line-2-intro'>that always get it right - no returning in sight</p>
                <a href="#">Give an eGift Card</a>
            </div>
        </div>
        <div className='bottom'>
            <div className='left_size'>
                <span>ACTIVITY</span>
            </div>
            <div className='middle_size'>
                <ul>
                    <li><a href="#">Workout</a></li>
                    <li><a href="#">Running</a></li>
                    <li><a href="#">Golf</a></li>
                    <li><a href="#">Casual</a></li>
                    <li><a href="#">Yoga</a></li>
                    <li><a href="#">Hiking</a></li>
                </ul>
            </div>
            <div className='right_size'>
                <a href="#">SHOP ALL MEN</a>
            </div>

        </div>
    </div>
    <div className={mouseGiftOver ? 'DetailForGifts' : 'Disappear'}>
        <div className='Wrapper'>
            <div className='left_size'>
                <ul>
                    <li><a href="#">eGift Cards</a></li>
                    <li><a href="#">Gift Guide</a></li>
                    <li><a href="#">Our Best Gifts</a></li>
                    <li><a href="#">lululemon Studio</a></li>
                    <li><a href="#">Shoes</a></li>
                </ul>
            </div>
            <div className='middle_size'>
                <div className='m_left_size'>
                    <ul>
                        <li><a href="#" className='Title'>GIFTS FOR HER</a></li>
                        <li><a href="#">Our Best Gifts For Her</a></li>
                        <li><a href="#">Gifts Under $50 For Her</a></li>
                        <li><a href="#">Gifts Under $100 For Her</a></li>
                        <li><a href="#">Cozy Gifts For Her</a></li>
                        <li><a href="#">Trending Gifts For Her</a></li>
                        <li><a href="#">Luxe Gifts For Her</a></li>
                    </ul>
                </div>
                <div className='m_middle_size'>
                    <ul>
                        <li><a href="#" className='Title'>Gifts FOR HIM</a></li>
                        <li><a href="#">Our Best Gifts For Him</a></li>
                        <li><a href="#">Gifts Under $50 For Him</a></li>
                        <li><a href="#">Gifts Under $100 For Him</a></li>
                        <li><a href="#">Cozy Gifts For Him</a></li>
                        <li><a href="#">Trending Gifts For Him</a></li>
                    </ul>
                </div>
                <div className='m_right_size'></div>
            </div>
            <div className='right_size'>
                <img src="./img/Gifts.png" alt=""/>
                <h2>Buy online,pick up in-store</h2>
                <p>There's still time to wrap up gifts that make</p>
                <p>their movement merry.Get your gear in two</p>
                <p className='line-2-intro'>holly jolly hours</p>
                <a href="#">Give an eGift Card</a>
            </div>
        </div>
        <div className='bottom'>
            <div className='left_size'>
                <span>ACTIVITY</span>
            </div>
            <div className='middle_size'>
                <ul>
                    <li><a href="#">Workout</a></li>
                    <li><a href="#">Running</a></li>
                    <li><a href="#">Golf</a></li>
                    <li><a href="#">Casual</a></li>
                    <li><a href="#">Yoga</a></li>
                    <li><a href="#">Hiking</a></li>
                </ul>
            </div>
            <div className='right_size'>
                <a href="#">SHOP ALL MEN</a>
            </div>

        </div>
    </div>
</div>
)
    ;
};

export default Header;