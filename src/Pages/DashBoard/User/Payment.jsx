import { loadStripe } from "@stripe/stripe-js";

import { Elements } from "@stripe/react-stripe-js";
import CheckOut from "./CheckOut";


// Add publishable key 
const stripePromise = loadStripe('pk_test_51OEB5WFTDS48A5jJizexAdNQXF1QS4ic08eei1UmfbZhlyhEPxtTPBmTBrriWBfn4BhZjW1JfyQLQSqySwUzkn8n00MqqSrxZe');
const Payment = () => {
    return (
        <div>

            <div>
                <Elements stripe={stripePromise}>
                    {/* <CheckOutFrom /> */}
                    <CheckOut />
                </Elements>
            </div>


        </div>
    );
};

export default Payment;