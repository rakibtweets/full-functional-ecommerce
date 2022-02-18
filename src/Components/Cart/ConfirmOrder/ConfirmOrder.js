import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../../Layout/MetaData/MetaData';
import CheckoutSteps from '../CheckoutSteps/CheckoutSteps';

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  // calculate order prices
  const itemsPrice = cartItems?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 25;
  const taxPrice = Number((0.05 * itemsPrice).toFixed(2));

  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  const proccedToPayment = () => {
    const data = {
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice,
      taxPrice,
      totalPrice,
    };
    sessionStorage.setItem('orderInfo', JSON.stringify(data));
  };

  return (
    <Fragment>
      <MetaData title={`Confirm Oder`} />
      <CheckoutSteps shipping confirmOrder />
      <Fragment>
        <div className="container container-fluid">
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-confirm">
              <h4 className="mb-3">Shipping Info</h4>
              <p>
                <b>Name:</b> {user && user.name}
              </p>
              <p>
                <b>Phone:</b> {shippingInfo.phoneNo}
              </p>
              <p className="mb-4">
                <b>Address:</b>{' '}
                {`${shippingInfo.address},${shippingInfo.city}, ${shippingInfo.postalCode},${shippingInfo.country}`}
              </p>

              <hr />
              <h4 className="mt-4">Your Cart Items:</h4>

              {cartItems.map((item) => (
                <Fragment>
                  <hr />
                  <div key={item.product} className="cart-item my-1">
                    <div className="row">
                      <div className="col-4 col-lg-2">
                        <img
                          src={item.image}
                          alt="Laptop"
                          height="45"
                          width="65"
                        />
                      </div>

                      <div className="col-5 col-lg-6">
                        <Link
                          className="text-decoration-none fw-bold"
                          to={`/product/${item.product}`}
                        >
                          {item.name}
                        </Link>
                      </div>

                      <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                        <p>
                          {item.quantity} x $ {item.price} ={' '}
                          <b>$ {item.quantity * item.price}</b>
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr />
                </Fragment>
              ))}
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>
                  Subtotal:{' '}
                  <span className="order-summary-values">
                    $ {itemsPrice.toFixed(2)}
                  </span>
                </p>
                <p>
                  Shipping:{' '}
                  <span className="order-summary-values">
                    $ {shippingPrice}
                  </span>
                </p>
                <p>
                  Tax:{' '}
                  <span className="order-summary-values">$ {taxPrice}</span>
                </p>

                <hr />

                <p>
                  Total:{' '}
                  <span className="order-summary-values">$ {totalPrice}</span>
                </p>

                <hr />
                <Link to="/order/payment">
                  <button
                    id="checkout_btn"
                    className="btn btn-primary btn-block"
                    onClick={proccedToPayment}
                  >
                    Proceed to Payment
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    </Fragment>
  );
};

export default ConfirmOrder;
