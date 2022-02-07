import React from 'react';
import { Container, Row } from 'react-bootstrap';
import MetaData from '../../../Components/Layout/MetaData/MetaData';
import './Home.css';

const Home = () => {
  return (
    <Container fluid>
      <MetaData title="Best Product Online" />
      <h1 id="products_heading">Latest Products</h1>
      <section id="products" class="container mt-5">
        <Row>
          <div class="col-sm-12 col-md-6 col-lg-3 my-3">
            <div class="card p-3 rounded">
              <img
                class="card-img-top mx-auto"
                src="https://m.media-amazon.com/images/I/617NtexaW2L._AC_UY218_.jpg"
                alt="Img"
              />

              <div class="card-body d-flex flex-column">
                <h5 class="card-title">
                  128GB Solid Storage Memory card - SanDisk Ultra
                </h5>
                <div class="ratings mt-auto">
                  <div class="rating-outer">
                    <div class="rating-inner"></div>
                  </div>
                  <span id="no_of_reviews">(5 Reviews)</span>
                </div>
                <p class="card-text">$45.67</p>
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
