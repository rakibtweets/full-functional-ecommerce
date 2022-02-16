import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../../Layout/MetaData/MetaData';
import { Link } from 'react-router-dom';
import {
  addItemToCart,
  removeCartItem,
} from '../../../Redux/Actions/cartActions';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const removeCartItemHandler = (id) => {
    dispatch(removeCartItem(id));
  };

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (newQty > stock) return;

    dispatch(addItemToCart(id, newQty));
  };
  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty <= 0) return;

    dispatch(addItemToCart(id, newQty));
  };

  // cart summery/cart calculation
  //sub Total of cart item
  const subTotal = cartItems?.reduce(
    (acc, item) => acc + Number(item.quantity),
    0
  );

  //estimate total of cart items
  const estTotal = cartItems?.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0
  );
  return (
    <Fragment>
      <MetaData title={`Your Cart`} />
      {cartItems.length === 0 ? (
        <h2 className="mt-5 text-center">Your cart is empty</h2>
      ) : (
        <Fragment>
          <div className="container container-fluid">
            <h2 className="mt-5">
              Your Cart: <b>{cartItems.length} items</b>
            </h2>
            <hr />
            <div className="row d-flex justify-content-between">
              <div className="col-12 col-lg-8">
                {cartItems.map((item) => (
                  <Fragment>
                    <hr />
                    <div key={item.product} className="cart-item">
                      <div className="row">
                        <div className="col-4 col-lg-3">
                          <img
                            src={item.image}
                            alt="Laptop"
                            height="90"
                            width="115"
                          />
                        </div>

                        <div className="col-5 col-lg-3">
                          <Link
                            className="text-decoration-none"
                            to={`/product/${item.product}`}
                          >
                            {item.name}
                          </Link>
                        </div>

                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                          <p id="card_item_price">$ {item.price}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                          <div className="stockCounter d-inline">
                            <span
                              onClick={() =>
                                decreaseQty(item.product, item.quantity)
                              }
                              className="btn btn-danger minus"
                            >
                              -
                            </span>
                            <input
                              type="number"
                              className="form-control count d-inline"
                              value={item.quantity}
                              readOnly
                            />

                            <span
                              onClick={() =>
                                increaseQty(
                                  item.product,
                                  item.quantity,
                                  item.stock
                                )
                              }
                              className="btn btn-primary plus"
                            >
                              +
                            </span>
                          </div>
                        </div>

                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                          <i
                            id="delete_cart_item"
                            className="fa fa-trash btn btn-danger"
                            onClick={() => removeCartItemHandler(item.product)}
                          ></i>
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
                      {subTotal.toFixed(2)} (Units)
                    </span>
                  </p>
                  <p>
                    Est. total:{' '}
                    <span className="order-summary-values">$ {estTotal}</span>
                  </p>

                  <hr />
                  <button
                    id="checkout_btn"
                    className="btn btn-primary btn-block"
                  >
                    Check out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
