import React from 'react';
import { StoreServiceConsumer } from './StoreContext';

const withData = Wrapped => {
  return props => {
    return (
      <StoreServiceConsumer>
        {storeProducts => {
          return <Wrapped storeProducts={storeProducts} {...props} />;
        }}
      </StoreServiceConsumer>
    );
  };
};
export default withData;
