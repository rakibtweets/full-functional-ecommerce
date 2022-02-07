import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import MetaData from '../../../Components/Layout/MetaData/MetaData';
import { getProducts } from '../../../Redux/Actions/productActions';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <Container fluid>
      <MetaData title="Best Product Online" />
      <h1 id="products_heading">Latest Products</h1>
      <section id="products" className="container mt-5">
        <Row>
          <div className="col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card p-3 rounded">
              <img
                className="card-img-top mx-auto"
                src="https://m.media-amazon.com/images/I/617NtexaW2L._AC_UY218_.jpg"
                alt="Img"
              />

              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  128GB Solid Storage Memory card - SanDisk Ultra
                </h5>
                <div className="ratings mt-auto">
                  <div className="rating-outer">
                    <div className="rating-inner"></div>
                  </div>
                  <span id="no_of_reviews">(5 Reviews)</span>
                </div>
                <p className="card-text">$45.67</p>
                <button>View Details</button>
              </div>
            </div>
          </div>
        </Row>
      </section>
    </Container>
  );
};

export default Home;
