import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const CheckOut = () => {

    const stripe = useStripe()
    const elements = useElements()
    const [clientSecret, setClientSecret] = useState('')
    const [error, setError] = useState('')
    const [transactionId, setTransactionId] = useState('')

    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const axiosSecure = useAxiosSecure()

    const price = 100

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, price])




    const handleSubmit = async (e) => {
        e.preventDefault()

        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        if (!stripe || !elements) {

            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log("Payment error", error);
            setError(error)
        }
        else {
            console.log('payment method', paymentMethod);
            setError('')
        }

        // confirm payment 
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                },
            }
        })

        if (confirmError) {
            console.log("confirmError--", confirmError);
            setError(confirmError)
        }
        else {
            console.log('paymentIntent--', paymentIntent);

            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id)

                const payment = {
                    email: user.email,
                    price: price,
                    status: 'verified'

                }

                const res = await axios.post('http://localhost:5000/payments', payment)
                console.log(res.data)

                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        title: `Thanks For Pay`,
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2500
                    });
                    navigate('/')
                }

            }
        }


    };

    return (
        <div>
            <div className="border w-[700px] mx-auto p-10">
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
                    <button className="px-5 btn bg-blue-300 mt-8"
                        type="submit"
                        disabled={!stripe || !clientSecret}>
                        Pay
                    </button>
                    <p>{error}</p>
                    {transactionId && <p className="text-green-500">your transactionId : {transactionId}</p>}
                </form>

            </div>
        </div>
    );
};

export default CheckOut;