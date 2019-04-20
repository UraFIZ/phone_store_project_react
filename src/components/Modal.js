import React, { Component } from 'react';
import styled from 'styled-components';
import { ProductConsumer } from './context';
import { ButtonContainer } from './Button';
import { Link } from 'react-router-dom';

class Modal extends Component {
  render() {
    return (
      <ProductConsumer>
        {value => {
          const { modalIsOpen, closeModal } = value;
          const { img, title, price } = value.modalProduct;
          return modalIsOpen ? (
            <ModalContainer>
              <div className="container">
                <div className="row">
                  <div
                    id="modal"
                    className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize p-5"
                  >
                    <h5>item added to the cart</h5>
                    <img src={img} className="img-fluid" alt="img" />
                    <h5>{title}</h5>
                    <h5 className="text-muted">price: $ {price}</h5>
                    <Link to="/">
                      <ButtonContainer cart onClick={closeModal}>
                        Store
                      </ButtonContainer>
                    </Link>{' '}
                    <Link to="/cart">
                      <ButtonContainer onClick={closeModal}>
                        Go to cart
                      </ButtonContainer>
                    </Link>
                  </div>
                </div>
              </div>
            </ModalContainer>
          ) : null;
        }}
      </ProductConsumer>
    );
  }
}

export default Modal;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  #modal {
    background: var(--mainWhite);
  }
`;
