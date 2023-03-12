import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import actions from "../actions";
import {useNavigate} from "react-router-dom";
export const Payment = ({totalPrice,subtotal,tax,fun}) => {
    const dispatch = useDispatch()
const navigate=useNavigate()
    useEffect(() => {
        window.PAYPAL?.Button.render(paypalIntegrate(window.PAYPAL, actions.PaymentSuccess), '#paypal-button');
    }, [])
    const paypalIntegrate = (paypal, PaymentSuccess) => {
        return {
            // Configure environment
            env: 'sandbox',
            client: {
                sandbox: 'AT00CBFees-dWFZkvRZIdRoC-HcSBflw-Bi2e7S1Y1mCGOlY46BUkBEOTElGDUFwfPEuyy9afsitY7xF',
                production: 'AWy7L0BwPpJU1qoh9hNZiR9-sadMHUpnOhlRbTw9ha-4LOhB9y4biARxSpBnk1KjbaXEHCnv1pBhumgI'
            },
            // Customize button (optional)
            locale: 'en_US',
            style: {
                size: 'medium',
                color: 'white',
                shape: 'pill',
                // layout: 'vertical',
                fundingicons: 'true',
            },
            funding: {
                allowed: [paypal.FUNDING.CARD],
                disallowed: [paypal.FUNDING.CREDIT]
            },

            // Enable Pay Now checkout flow (optional)
            commit: true,

            // Set up a payment
            payment: (data, actions) => {
                return actions.payment.create({
                    transactions: [{
                        amount: {
                                total: '0.35',
                                currency: 'USD',
                                details: {
                                    subtotal: '0.30',
                                    tax: '0.03',
                                    shipping: '0.01',
                                    handling_fee: '1.00',
                                    shipping_discount: '-1.00',
                                    insurance: '0.01'
                            }
                        },
                        description: 'Mark2win Full Stack Developer Bootcamp Ultimate version',
                        custom: '90048630024435',
                        //invoice_number: '12345', Insert a unique invoice number
                        payment_options: {
                            allowed_payment_method: 'INSTANT_FUNDING_SOURCE'
                        },
                        soft_descriptor: 'ECHI5786786',
                        item_list: {
                            items: [
                                {
                                    name: 'React',
                                    description: 'React-from scratch to master',
                                    quantity: '2',
                                    price: '0.10',
                                    tax: '0.01',
                                    sku: '1',
                                    currency: 'USD'
                                },
                                {
                                    name: '',
                                    description: 'Front end developer.',
                                    quantity: '1',
                                    price: '0.10',
                                    tax: '0.01',
                                    sku: 'product34',
                                    currency: 'USD'
                                }],
                            shipping_address: {
                                recipient_name: 'Mark Xu',
                                line1: '50 Acadia Ave, Markham, ON L3R 0B3',
                                line2: 'Unit #200',
                                city: 'Toronto',
                                country_code: 'CA',
                                postal_code: 'L3R 0B3',
                                phone: '6474017219',
                                state: 'Ontario'
                            }
                        }
                    }],
                    note_to_payer: 'Contact us markxu@mark2win.com for any questions on your order.'
                });
            },
            // Execute the payment
            onAuthorize: (data, actions) => {
                return actions.payment.execute().then(function (res) {
                    // Show a confirmation message to the buyer
                    // window.alert('Your payment was successful!')
                    // call your action to tackle after payment process
                    console.log('payment returned results', res)
                    dispatch(PaymentSuccess()) // call my PaymentSucess action
                    navigate('/success')
                }).catch((e) => {
                    console.log(e);
                });
            }

        }
    }


    return (
        <div id="paypal-button">
        </div>
    )


}

















