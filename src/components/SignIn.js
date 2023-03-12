import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBriefcase, faSquare} from "@fortawesome/free-solid-svg-icons";
import './SignIn.scss';
import React, {useState} from "react";
import actions from "../actions";
import {useDispatch, useSelector} from "react-redux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import TodayIcon from '@mui/icons-material/Today';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import AutoFixOffIcon from '@mui/icons-material/AutoFixOff';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
const SignIn = () => {

    const [loginIn, setLoginIn] = useState(true)
    const [createMember, setCreateMember] = useState(false)
    const dispatch=useDispatch()
    const [input, setInput] = useState({email: '', password: ''})
    console.log(input)
    const token = useSelector(state => state.productReducer.token)
    localStorage.setItem('token',JSON.stringify(token))
    console.log(token)
    const loginFail=useSelector(state=>state.productReducer.logInFail)

    return <main className="mainContent">
        <div className="mainContent_Container">
            <div className="loginIn_HeaderContainer">
                <div className="loginIn_Heading">Wellbeing made easier. We've got you.</div>
                <hr className="loginIn_Heading_horizontalLine"></hr>
                {loginFail&& <div className="alert alert-danger" role="alert">Something's not right with your email address
                    or password</div>}


            </div>
            <div className="loginIn_Container">
                <div className="loginIn_Perks">
                    <div className="loginIn_Perks_Banner">
                        Discover lululemon Membership
                        <span className="loginIn_Perks_Des">One account. Tons of benefits. Endless possibilities.</span>
                    </div>
                    <div className="membership_Perks_Banner">
                        Membership benefits include
                    </div>
                    <div className="loginIn_Perks_Icons_Container">
                        <div className="loginIn_Perks_Icons_Cell">
                            <BusinessCenterOutlinedIcon className='membership_Perks_icons'/>
                            <div className="perk-icons_Text">Early Access to Product Drops</div>
                        </div>
                        <div className="loginIn_Perks_Icons_Cell">
                            <MonetizationOnIcon className='membership_Perks_icons'/>
                            <div className="perk-icons_Text">Exchange or Credit on Sale Items</div>
                        </div>
                        <div className="loginIn_Perks_Icons_Cell">
                            <LoyaltyIcon className='membership_Perks_icons'/>
                            <div className="perk-icons_Text">Select lululemon Studio Content</div>
                        </div>
                        <div className="loginIn_Perks_Icons_Cell">
                            <TodayIcon className='membership_Perks_icons'/>
                            <div className="perk-icons_Text">Virtual Community Events</div>
                        </div>
                        <div className="loginIn_Perks_Icons_Cell">
                            <AssignmentReturnIcon className='membership_Perks_icons'/>
                            <div className="perk-icons_Text">Receipt-Free and Fast-Track Returns</div>
                        </div>
                        <div className="loginIn_Perks_Icons_Cell">
                            <AutoFixOffIcon className='membership_Perks_icons'/>
                            <div className="perk-icons_Text">Free Hemming</div>
                        </div>
                    </div>
                    <div className="loginIn_ExperienceMembership">
                        <a className='loginIn_Link' href='https://shop.lululemon.com/membership'>Experience
                            Membership</a>
                    </div>
                </div>
                {token? <div>
                    <p className="alert alert-success" role="alert" style={{fontSize:'25px'}}><span><FavoriteBorderIcon/> </span > Welcome dear
                        customer!</p>
                    <button className='btn btn-danger btn-lg' onClick={() => dispatch(actions.signOut())}>Sign Out</button>
                </div> :
                <div className='account_Form_Container'>
                    <div className='loginIn_Form_Container'>
                        <div className='logIn_Form_Header' onClick={() => setLoginIn(true)}>Sign in to your member account
                        </div>
                    </div>
                    {loginIn &&
                        <div className='loginIn_Fields_Container'>
                            <div className="loginIn_Field_Box">
                                <label className='loginIn_Field_Heading'>Email Address</label>
                                <input onChange={(evt) => {
                                    setInput(pre => ({
                                        ...pre, [evt.target.name]: evt.target.value
                                    }))
                                }}
                                  name='email'  type='email' className='loginIn_Field_Input'/>
                            </div>
                            <div className="loginIn_Field_Box">
                                <label className='loginIn_Field_Heading'>Password</label>
                                <input onChange={(evt) => {
                                    setInput(pre => ({
                                        ...pre, [evt.target.name]: evt.target.value
                                    }))
                                }}
                               name='password'     type='password' className='loginIn_Field_Input'/>
                            </div>
                            <div className="loginIn_ForgetPasswordLink">
                                <a className='loginIn_Link' src='https://shop.lululemon.com/account/forgot-password'>Forgot
                                    your passwords?</a>
                            </div>
                            <button type="submit" onClick={() => {dispatch(actions.submitLogin(input))}}
                                className='btn btn-danger btn-lg signIn_Button' type='submit'>SIGN IN</button>
                        </div>
                    }
                    <hr/>
                    <div className='signUp_Form_Container'>
                        <div className='signUp_Form_Header' onClick={() =>{ setCreateMember(!createMember)
                        setLoginIn(!loginIn)}}>Create a member account
                        </div>
                    </div>
                    {createMember &&
                        <div className='signUp_Fields_Container'>
                            <div className="signUp_Field_Box">
                                <label className='loginIn_Field_Heading'>Email Address</label>
                                <input className='loginIn_Field_Input'/>
                            </div>
                            <div className="loginIn_Field_Box">
                                <label className='loginIn_Field_Heading'>Password</label>
                                <input className='loginIn_Field_Input'/>
                            </div>

                            <div className="password_Strength_Items_Container">
                                <div className='password_Strength_Items'>
                                    <span className='password_Strength_Indicator'>8 characters</span>
                                </div>
                                <div className='password_Strength_Items'>
                                    <span className='password_Strength_Indicator'>1 lowercase</span>
                                </div>
                                <div className='password_Strength_Items'>
                                    <span className='password_Strength_Indicator'>1 uppercase</span>
                                </div>
                                <div className='password_Strength_Items'>
                                    <span className='password_Strength_Indicator'>1 digit</span>
                                </div>
                            </div>
                                <div className="createAccount_Checkbox_Signup_Container">
                                    <FontAwesomeIcon icon={faSquare}/>
                                    <div className='optIn-Wrapper'>
                                        Opt in to receive our weekly emails and member communications. You’ll be the
                                        first to know about new gear and more. (You can unsubscribe at any time)
                                    </div>
                                </div>
                                    <button className='signIn_Button' type='submit'>CREATE MEMBER ACCOUNT</button>
                                    <div
                                        className="legal_Disclaimer">By clicking "Create Member Account" you agree to the <a
                                        className='legalLink' href="https://info.lululemon.com/legal/terms-of-use">Terms of Use</a> and to
                                        join lululemon Membership. See
                                        our <a className='legalLink' href="https://info.lululemon.com/legal/privacy-policy">Privacy
                                            Policy</a> for details about our information
                                        practices. California consumers, also see our <a className='legalLink'
                                            href="https://info.lululemon.com/legal/privacy-policy#financialincentive">Notice
                                            of Financial Incentives.</a> lululemon will use information you submit
                                        (including identifiers, commercial information, and internet or other electronic
                                        network activity information) to fulfill this request.
                                    </div>
                            </div>
                    }
                </div>}
            </div>
        </div>
    </main>
};

export default SignIn;