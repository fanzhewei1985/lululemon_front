import React, {useEffect, useState} from 'react'
import StripeCheckout from 'react-stripe-checkout';
import {CardElement,useElements,useStripe} from "@stripe/react-stripe-js";
import './Stripe.scss'
import {useDispatch} from "react-redux";
import actions from "../actions";
import {useNavigate} from "react-router-dom";

export const Stripe=({amount,orderId})=>{
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const elements=useElements()
    const stripe=useStripe()
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        window
            .fetch("http://localhost:3001/payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                        orderNo:orderId,
                        amount:Math.round(amount*1),
                        paymentType:'Card',
                        payStatus:false})
            })
            .then(res => {
                return res.json();
            })
            .then(data => {console.log(data)
                setClientSecret(data.clientSecret);
            });
    }, []);
    const cardStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d"
                }
            },
            invalid: {
                fontFamily: 'Arial, sans-serif',
                color: "#fa755a",
                iconColor: "#fa755a"
            }
        }
    };
    const handleChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };
    const handleSubmit=async(e)=>{
        e.preventDefault()
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }
        );
        console.log(payload)
        if (payload.error) {
            console.log(payload.error)
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else {
            setError(null);

           const response= await fetch("http://localhost:3001/payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    orderNo:orderId,
                    amount:Math.round(amount*1.13),
                    paymentType:'Card',
                    payStatus:true
            })
                    // .then(res => res.json())
        })
            const res= await fetch(`http://localhost:3001/order/${orderId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({})})
            setProcessing(false);
            setSucceeded(true);
            dispatch(actions.PaymentSuccess()) // call my PaymentSucess action
            navigate('/success')
            console.log(response)
    }};
// if(!stripe||!elements){return}
    // const {clientSecret} = await fetch('http://localhost:3001/payment', {
    //         method: 'POST',
    //     headers:{
    //             'Content-Type':'application/json',
    //     },
    //         body: JSON.stringify(),
    //     }).then(response => response.json())

   // const {paymentIntent,error}=await stripe.confirmCardPayment(
   //      clientSecret,{
   //          payment_method:{
   //              card:elements.getElement(CardElement),
   //          }
   //      }
   //  )
   //      if(error){
   //          //handle error
   //      }else if (paymentIntent && paymentIntent.status === 'succeeded') {
   //          //place order
   //      }
   //
   //  }

        return (
            <div>

             <form id='payment-form' onSubmit={handleSubmit}>
                 {/*<label style={{margin:'6px',fontWeight:'bold'}} htmlFor='card-element'>Credit Card</label>*/}
                 <CardElement id='card-element'  options={cardStyle} onChange={handleChange} />
                 <button disabled={processing|| disabled || succeeded}  id="submit"
                     style={{marginTop:'15px',marginBottom:'5px',width:"68%",fontWeight:'bold'}} className='btn btn-primary'> <span id="button-text">
          {processing ? (
              <div className="spinner" id="spinner"></div>
          ) : (
              "Pay Now"
          )}
        </span></button>
                 {error && (
                     <div className="card-error" role="alert">
                         {error}
                     </div>
                 )}
                 {/* Show a success message upon completion */}
                 <p className={succeeded ? "result-message" : "result-message hidden"}>
                     Payment succeeded, see the result in your
                     <a
                         href={`https://dashboard.stripe.com/test/payments`}
                     >
                         {" "}
                         Stripe dashboard.
                     </a> Refresh the page to pay again.
                 </p>
             </form>

            </div>
            // ...
            // <StripeCheckout
            //     payment={onPayment}
            //     stripeKey="pk_test_51MWulfFfhF5AxI6F2rm66kCGPx4FN3QZIHinaLptwGH1vl2F8UwqgcO9gsnqIjQIc9Y9tTmnKI4DVBoMoOJalaI400vypzUUwL"
            // />
        )

}

