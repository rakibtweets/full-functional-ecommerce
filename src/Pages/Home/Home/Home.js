import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { Row } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MetaData from '../../../Components/Layout/MetaData/MetaData';
import Loader from '../../../Components/Loader/Loader';
import Product from '../../../Components/Product/Product';
import { getProducts } from '../../../Redux/Actions/productActions';
import './Home.css';
// import 'bootstrap/less/bootstrap.less';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const alert = useAlert();
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const { loading, products, error, productCount, resPerPage } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(keyword, currentPage));
  }, [dispatch, error, alert, currentPage, keyword]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

      {resPerPage <= productCount && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resPerPage}
            totalItemsCount={productCount}
            onChange={handlePageChange}
            nextPageText={'Next'}
            prevPageText={'Prev'}
            firstPageText={'First'}
            lastPageText={'Last'}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      )}
    </Fragment>
  );
};

export default Home;
