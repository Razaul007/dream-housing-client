import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";


// TODO: Add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK)

const Payment = () => {
    const { state: offer } = useLocation(); // Get the offer details passed via navigation
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);

    // const handlePayment = async () => {
    //     setIsProcessing(true);
    //     try {
    //         // Simulate payment API (replace this with actual Stripe/other payment integration)
    //         const response = await axiosSecure.post("/payments", {
    //             offerId: offer._id,
    //             amount: offer.offeredPrice,
    //         });
    //         Swal.fire({
    //             position: "top-end",
    //             icon: "success",
    //             title: "Payment successful!",
    //             showConfirmButton: false,
    //             timer: 1500
    //           });

    //         // toast.success("Payment successful!");
    //         navigate("/properties/bought"); // Redirect back to properties bought page
    //     } catch (error) {
    //         console.error("Error processing payment:", error);
    //         toast.error("Failed to process payment.");
    //     } finally {
    //         setIsProcessing(false);
    //     }
    // };

    return (
        <div className="max-w-lg mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Payment for {offer.title}</h2>
            <p className="text-lg font-bold ">Amount: <span className="text-green-500">${offer.offerAmount}</span></p>
            <div className=" m-10">
                <Elements stripe={stripePromise}>
                     <CheckoutForm offer = {offer}></CheckoutForm>
                </Elements>
            </div>
          
        </div>
    );
};

export default Payment;
