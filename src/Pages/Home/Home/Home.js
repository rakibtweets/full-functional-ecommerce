import React, { Fragment, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../../../Components/Layout/MetaData/MetaData';
import Loader from '../../../Components/Loader/Loader';
import Product from '../../../Components/Product/Product';
import { getProducts } from '../../../Redux/Actions/productActions';
import './Home.css';

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, products, error, productCount } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Best Product Online" />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <Row>
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </Row>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
