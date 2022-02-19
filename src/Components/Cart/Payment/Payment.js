import React, { Fragment, useEffect } from 'react';
import './payment.css';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../../Layout/MetaData/MetaData';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../CheckoutSteps/CheckoutSteps';
import axios from 'axios';
import { clearErrors, newOrder } from '../../../Redux/Actions/orderActions';

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';

const options = {
  style: {
    base: {
      fontSize: '16px',
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

const Payment = () => {
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  // Get order information form session storage
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    document.querySelector('#pay_btn').disabled = true;

    let res;
    try {
      const config = {
        headers: {
          'content-type': 'application/json',
        },
      };
      res = await axios.post(`api/v1/payment/process`, paymentData, config);
      const cliendSecret = res.data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(cliendSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        alert.error(result.error.message);
        document.querySelector('#pay_btn').disabled = false;
      } else {
        // the payment is processed or not
        if ((result.paymentIntent.status = 'succeeded')) {
          // TODO: New order
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(newOrder(order));

          navigate('/success');
        } else {
          alert.error('There are some issue while payment processing');
        }
      }
    } catch (error) {
      console.log(error);
      document.querySelector('#pay_btn').disabled = false;
      alert.error(error.response.data.message);
    }
  };

  return (
    <Fragment>
      <MetaData title={`Payment`} />
      <CheckoutSteps shipping confirmOrder payment />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form onSubmit={handlePaymentSubmit} className="shadow-lg">
            <h1 className="mb-4 text-center">Card Info</h1>
            <div className="form-group">
              <label htmlFor="card_num_field">Card Number</label>
              <CardNumberElement
                type="text"
                id="card_num_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <CardCvcElement
                type="text"
                id="card_cvc_field"
                className="form-control"
                options={options}
              />
            </div>

            <button
              id="pay_btn"
              type="submit"
              className="btn btn-block py-3 w-100"
            >
              Pay {`- ${orderInfo && orderInfo.totalPrice}`}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
