import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    useStripe,
    useElements,
    CardElement,
  } from '@stripe/react-stripe-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import '../styles/PaymentGatewayPage.css';

const stripePromise = loadStripe('pk_test_51NYmPkSCfYsS3TchcSObjNfzHWpWXIkcjrKAT9KNe5bxLD5PVAtcYQ2VtNDXpUMsqDNhBx075XhBhB8CD3NLC5XK00gzVu1aFf'); // Stripe public key

const PaymentGatewayPage = () => {
    const location = useLocation();
    const { totalAmount } = location.state || {};
    const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
    const [cardDetails, setCardDetails] = useState({
        number: '',
        exp_month: '',
        exp_year: '',
        cvc: '',
    });
    const [cardholderName, setCardholderName] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCardDetails({ ...cardDetails, [name]: value });
    };

    const handlePayment = async () => {
        setIsPaymentProcessing(true);

        try {
            // PaymentIntent on the server and retrieve the client secret
            const response = await fetch('http://localhost:8080/wedease/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: totalAmount * 100, // Convert amount to smallest currency unit (e.g., paisa for INR)
                    currency: 'INR',
                    cardholderName: cardholderName, 
                }),
            });

            const { clientSecret } = await response.json();

            // Initialize Stripe.js with your Stripe publishable key
            const stripe = await stripePromise;

            // Redirect to the payment gateway checkout page
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardDetails,
                  },
            });

            if (result.error) {
                console.error(result.error.message);
                setIsPaymentProcessing(false);
            } else {
                console.log('Payment succeeded:', result.paymentIntent);
                alert('Payment Successful!');
                setIsPaymentProcessing(false);
            }
        } catch (error) {
            //console.error('Error processing payment: ', error);
            setIsPaymentProcessing(false);
        }
    };

    return (
        <div className="payment-gateway-page">
            <h2><FontAwesomeIcon icon={faCreditCard} /> Payment Gateway</h2>
            <div className="payment-details">
                <p>Total Amount: ₹{totalAmount}</p>
                <div className="payment-form">
                    <div className="card-details">
                        <input
                            type="text"
                            name="number"
                            placeholder="Card Number"
                            value={cardDetails.number}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="name"
                            placeholder="Cardholder Name"
                            value={cardholderName}
            onChange={(event) => setCardholderName(event.target.value)}
                        />
                        <div className="expiry">
                            <select
                                name="exp_month"
                                value={cardDetails.exp_month}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>Expiry Month</option>
                                <option value="01">January (01)</option>
                                <option value="02">February (02)</option>
                                {/* Add other months as needed */}
                            </select>
                            <select
                                name="exp_year"
                                value={cardDetails.exp_year}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>Expiry Year</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>

                            </select>
                        </div>
                        <input
                            type="text"
                            name="cvc"
                            placeholder="CVC"
                            value={cardDetails.cvc}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button
                        className="buy-now-button"
                        onClick={handlePayment}
                        disabled={isPaymentProcessing}
                    >
                        {isPaymentProcessing ? 'Processing...' : 'Buy Now'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentGatewayPage;