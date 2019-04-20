import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
class Product extends Component {
  render() {
    const { product, rest } = this.props;
    const { addToCart, openModal } = rest;
    const { id, title, img, price, inCart } = product;
    return (
      <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3">
        <div className="card">
          <div
            className="img-container p-5"
            onClick={() => this.props.rest.handelDetail(id)}
          >
            <Link to="/deteils">
              <img src={img} alt="product" className="card-img-top" />
            </Link>
            <button
              className="cart-btn"
              disabled={inCart}
              onClick={() => {
                addToCart(id);
                openModal(id);
              }}
            >
              {inCart ? (
                <p className="text-capitalize mb-o" disabled>
                  {' '}
                  in Cart
                </p>
              ) : (
                <i className="fas fa-cart-plus" />
              )}
            </button>
          </div>
          {/* card footer */}
          <div className="card-footer d-flex justify-content-between">
            <p className="align-self-center mb-0">{title}</p>
            <h5 className="text-blue font-italic mb-0">
              <span className="mr-1">{price}</span>
            </h5>
          </div>
        </div>
      </ProductWrapper>
    );
  }
}
Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    img: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    inCart: PropTypes.bool,
  }),
};
export default Product;

const ProductWrapper = styled.div`
  .card {
    border-color: transparent;
    transition: all 1s linear;
  }
  .card-footer {
    background: transparent;
    transition: all 1s linear;
    border-top: transparent;
  }
  &:hover {
    .card {
      border: 0.04rem solid rgba(0, 0, 0, 0.2);
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
    }
    .card-footer {
      background: rgba(247, 247, 247);
    }
  }
  .img-container {
    position: relative;
    overflow: hidden;
    transition: all 1s linear;
  }
  .card-img-top {
    transition: all 1s linear;
  }
  .img-container:hover .card-img-top {
    transform: scale(1.2);
  }
  .cart-btn {
    position: absolute;
    bottom: -5rem;
    right: -5rem;
    padding: 0.2rem 0.4rem;
    background: var(--lightBlue);
    border: none;
    color: var(--mainWhite);
    font-size: 1.4rem;
    border-radius: 0.5rem 0 0 0;
    transform: translate(0 0);
    transition: all 1s linear;
  }
  .img-container:hover .cart-btn {
    bottom: 0;
    right: 0;
  }
  .cart-btn:hover {
    color: var(--mainBlue);
    cursor: pointer;
  }
`;
