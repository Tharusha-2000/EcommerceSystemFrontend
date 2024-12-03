import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { Check } from '@mui/icons-material';

const stripePromise = loadStripe('sk_test_51QLb3dCtgNr9CP7s7rsLhcGqWLcyRmerfiGwBDxLHmivYQGtsMPej5vc0i6zO8pjxHIsaH2JGaNXVAGyOrh3ceJx00uFzTeWIa');

const PaymentForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);

    if (!cardNumberElement) {
      console.error('Card Number Element not found');
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardNumberElement,
        billing_details: {
          name: 'Jenny Rosen', // set this to cardholder's name
        },
      },
    });

    if (error) {
      console.error(error);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      console.log('Payment succeeded!', paymentIntent);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardNumberElement />
      <CardExpiryElement />
      <CardCvcElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState('');

  React.useEffect(() => {
    // Fetch the client secret from your backend
    axios.post('http://localhost:8080/api/Payment/create-payment-intent', {
      amount: 1000, // Amount in cents
      currency: 'usd', // Currency type
      paymentMethodTypes: ['card'], // Payment method types
    }).then((response) => {
      setClientSecret(response.data.clientSecret);
    }).catch((error) => {
      console.error("Error creating payment intent:", error);
    });
  }, []);

  return (
    <Elements stripe={stripePromise}>
      {clientSecret && <PaymentForm clientSecret={clientSecret} />}
    </Elements>
  );
};

export default Checkout;
