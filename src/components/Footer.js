import "./Footer.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTwitterSquare} from "@fortawesome/free-brands-svg-icons/faTwitterSquare";
import {faPinterestSquare} from "@fortawesome/free-brands-svg-icons/faPinterestSquare";
import {faFacebookSquare} from "@fortawesome/free-brands-svg-icons/faFacebookSquare";
import{faYoutubeSquare} from "@fortawesome/free-brands-svg-icons/faYoutubeSquare";
import {faInstagramSquare} from "@fortawesome/free-brands-svg-icons/faInstagramSquare";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from "react";

const Footer = () => {
const [acount,setAcount]=useState(false)
const showContent=()=>{
    setAcount(!acount)
}
const [help,setHelp]=useState(false)
const showHelp=()=>{
    setHelp(!help)
}
const [about,setAbout]=useState(false)
const showAbout=()=>{
    setAbout(!about)
}
const [contact,setContact]=useState(false)
const showContact=()=>{
    setContact(!contact)
}
    return <div className="footerMenu">
           <div className="footerMenuInner">
           <div className="footerMenuPrimarySection">
            <div className='footerBtn'>
                <a href="http://shop.lululemon.com/account/login" className="footerMenuPrimarySection_Header">MY ACCOUNT</a>
                <button onClick={showContent}className='upDown_Show'>
                { !acount&& <KeyboardArrowDownIcon/>}
                 {acount &&   <KeyboardArrowUpIcon/>}
                </button>
                </div>
                <ul className={acount?"show_expandable":"expandable_List"}>
                    <li><a href="https://shop.lululemon.com/membership">Membership Program</a></li>
                    <li><a href="https://shop.lululemon.com/account/login">Sign In</a></li>
                    <li><a href="https://shop.lululemon.com/account/login">Register</a></li>
                    <li><a href="https://shop.lululemon.com/secure/orders/trackorder.jsp">Order Status</a></li>
                    <li><a href="https://shop.lululemon.com/secure/orders/returns.jsp">Returns</a></li>
                </ul>
           </div>
        
            <div className="footerMenuPrimarySection">
                <div className='footerBtn'>
            <a href="https://info.lululemon.com/help" className="footerMenuPrimarySection_Header">HELP</a>
            <button onClick={showHelp}className='upDown_Show'>
                { !help&& <KeyboardArrowDownIcon/>}
                 {help &&   <KeyboardArrowUpIcon/>}
                </button>
                </div>
                <ul className={help?"show_expandable":"expandable_List"}>
                    <li className="expandable_List"><a href="https://info.lululemon.com/help/covid-19-faq">FAQ</a></li>
                    <li><a href="https://shop.lululemon.com/story/services">Services</a></li>
                    <li><a href="https://info.lululemon.com/help/ordering">Ordering</a></li>
                    <li><a href="https://info.lululemon.com/help/shipping">Policy</a></li>
                    <li><a href="https://info.lululemon.com/help/returns">Returns</a></li>
                    <li><a href="https://shop.lululemon.com/help/redeem-gift-card">Redeem Gift Cards</a></li>
                    <li><a href="https://shop.lululemon.com/help/size-guide/womens">Sizing</a></li>
                    <li><a href="https://info.lululemon.com/help/our-products">Returns</a></li>
                </ul>   
            </div>
        
            <div className="footerMenuPrimarySection">
            <div className='footerBtn'>
            <a href="https://corporate.lululemon.com/about-us" className="footerMenuPrimarySection_Header">ABOUT US</a>
            <button onClick={showAbout} className='upDown_Show'>
                { !about&& <KeyboardArrowDownIcon/>}
                 {about &&   <KeyboardArrowUpIcon/>}
                </button> 
                </div><ul className={about?"show_expandable":"expandable_List"}>
                    <li><a href="https://corporate.lululemon.com/our-business">Our Business</a></li>
                    <li><a href="https://corporate.lululemon.com/media">Media</a></li>
                    <li><a href="https://corporate.lululemon.com/investors">Investors</a></li>
                    <li><a href="https://info.lululemon.com/about/strategic-sales">Sales</a></li>
                    <li><a href="https://shop.lululemon.com/story/affiliates-creators">Affiliates and Creators</a></li>
                    <li><a href="https://shop.lululemon.com/about/sweat-collective">Sweat Collective</a></li>
                    <li><a href="https://shop.lululemon.com/team-canada">Team Canada</a></li>
                </ul>
            </div>

            <div className="footerMenuPrimarySection">
                <div className='footerBtn'>
            <a href="https://shop.lululemon.com/contact" className="footerMenuPrimarySection_Header">CONTACT US</a>
            <button onClick={showContact} className='upDown_Show'>
                { !contact&& <KeyboardArrowDownIcon/>}
                 {contact &&   <KeyboardArrowUpIcon/>}
                </button>  
            </div>
             <ul className={contact?"show_expandable":"expandable_List"}>
                    <li><a href="https://shop.lululemon.com/live-chat">Live Chat</a></li>
                    <li><a href="https://shop.lululemon.com/secure/account/email-landing.jsp">Email Sign Up</a></li>
                    <li><a href="https://shop.lululemon.com/contact">Contact Us</a></li>
                </ul>
        </div>

            <div className="footerMenuSecondarySection">
            <ul className="footerMenuSecondarySection_List">
                <li><a className="footerMenuSecondarySection_ListLink" href="https://corporate.lululemon.com/careers">CAREERS</a></li>
                <li><a className="footerMenuSecondarySection_ListLink" href="https://shop.lululemon.com/community">COMMUNITY</a></li>
                <li><a className="footerMenuSecondarySection_ListLink" href="https://shop.lululemon.com/story/lululemon-studio">STUDIO</a></li>
                <li><a className="footerMenuSecondarySection_ListLink" href="https://corporate.lululemon.com/our-impact">SUSTAINABILITY</a></li>
                <li><a className="footerMenuSecondarySection_ListLink" href="https://corporate.lululemon.com/our-impact/support-for-wellbeing/lululemon-centre-for-social-impact">SOCIAL IMPACT</a></li>
                <li><a className="footerMenuSecondarySection_ListLink" href="https://corporate.lululemon.com/about-us/inclusion-for-all">DIVERSITY AND INCLUSIVE</a></li>
                <li><a className="footerMenuSecondarySection_ListLink" href="https://shop.lululemon.com/story/lululemon-apps">LULULEMON APPS</a></li>
            </ul>
        </div>

            <div className="footerMenuSecondarySection">
            <ul className="footerMenuSecondarySection_List">
            <li><a href="https://shop.lululemon.com/shop/luluGiftCards.jsp">GIFT CARDS</a></li>
            <li><a href="https://shop.lululemon.com/stores">LOCATOR</a></li>
            <li className="footerLegal">Privacy Policy(Last Updated:9/28/22)</li>
            <li className="footerLegal">UK Modern Slavery Act</li>
            <li className="footerLegal">California Transparency Act</li>
            <li className="footerLegal">Accessibility Statement</li>
            </ul>
            </div>

            <div className="footerMenuSocials">
            <ul className="footerMenuSocialLists">
            <li><a href="https://twitter.com/lululemon"><FontAwesomeIcon icon={faTwitterSquare}/></a></li>
            <li><a href="https://pinterest.com/lululemon"><FontAwesomeIcon icon={faPinterestSquare}/></a></li>
            <li><a href="https://www.youtube.com/user/lululemon"><FontAwesomeIcon icon={faYoutubeSquare}/></a></li>
            <li><a href="https://facebook.com/lululemon"><FontAwesomeIcon icon={faFacebookSquare}/></a></li>
            <li><a href="https://instagram.com/lululemon"><FontAwesomeIcon icon={faInstagramSquare}/></a></li>
            </ul>
            </div>
           </div>
        </div>;
 }

 export default Footer;