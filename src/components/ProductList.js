import React, { Component, Fragment } from 'react';
import Product from './Product.js';
import Title from './Title';
// import withData from './hoc';
import { ProductConsumer } from './context';
class ProductList extends Component {
  render() {
    return (
      <Fragment>
        <div className="py-5">
          <div className="container">
            <Title name="our" title="products" />
            <div className="row">
              <ProductConsumer>
                {data => {
                  const { products, ...rest } = data;
                  return data.products.map(product => {
                    return (
                      <Product key={product.id} product={product} rest={rest} />
                    );
                  });
                }}
              </ProductConsumer>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ProductList;
