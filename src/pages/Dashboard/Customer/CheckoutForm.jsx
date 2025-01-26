import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ offer }) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { offerAmount, buyerEmail, buyerName } = offer || {}

    console.log(clientSecret);
    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: offerAmount })
            .then(res => {
                console.log(res.data.clientSecret)
                setClientSecret(res.data.clientSecret);
            })
    }, [axiosSecure, offerAmount])


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('error', error);
            setError(error.message)
        } else {
            console.log('Payment Method', paymentMethod);
            setError('');
        }

        //   confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {

                    email: buyerEmail,
                    name: buyerName,

                }
            }
        })
        if (confirmError) {
            console.log('Confirm Error', confirmError)
        }
        else {
            console.log('Payment Intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('Transaction Id', paymentIntent.id)
                setTransactionId(paymentIntent.id)
            }
        }
        // Call backend API to update status to "bought"
        try {
            const res = await axiosSecure.post('/update-payment-status', {
                offerId: offer._id,
                transactionId: paymentIntent.id,
            });

            if (res.data?.message) {
                console.log(res.data.message);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Payment successful! Status updated to bought.",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/property-bought")
            }
        } catch (err) {
            console.error('Failed to update status:', err);
            toast.error('Failed to update status in the database.');



        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="mt-6 bg-green-500 text-white px-6 py-2 rounded disabled:opacity-50" type="submit" disabled={!stripe || !clientSecret}>
                Pay Now
            </button>
            <p className='text-red-500'>{error}</p>
            {transactionId && <p className='text-green-600'>Your Transaction ID: {transactionId}</p>}
        </form>
       
    );
};

export default CheckoutForm;