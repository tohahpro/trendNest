import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOut from "./CheckOut";


// Add publishable key 
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PUBLISHABLE_KEY);



const Payment = () => {


    return (
        <div>

            <div>
                <Elements stripe={stripePromise}>

                    <CheckOut />
                </Elements>
            </div>


        </div>
    );
};

export default Payment;