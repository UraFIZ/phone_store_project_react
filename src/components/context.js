import React, { Component, createContext } from 'react';
import { detailProduct, storeProducts } from '../data';
const ProductContext = createContext();
class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modalIsOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
  };
  componentDidMount() {
    this.setProducts();
  }
  setProducts = () => {
    let products = [];
    storeProducts.map(item => {
      const singleItem = { ...item };
      products = [...products, singleItem];
      return this.setState(() => {
        return { products };
      });
    });
  };
  getItem = id => {
    const product = this.state.products.find(item => item.id === id);
    return product;
  };
  handelDetail = id => {
    const detailProduct = this.getItem(id);
    this.setState(() => {
      return { detailProduct };
    });
  };
  addToCart = id => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const currentProduct = tempProducts[index];
    currentProduct.inCart = true;
    currentProduct.count = 1;
    const price = currentProduct.price;
    currentProduct.total = price;
    this.setState(
      () => {
        return {
          products: tempProducts,
          cart: [...this.state.cart, currentProduct],
        };
      },
      () => this.addTotals()
    );
  };
  openModal = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalIsOpen: true };
    });
  };
  closeModal = () => {
    this.setState(() => {
      return { modalIsOpen: false };
    });
  };
  increment = id => {
    const tempCart = [...this.state.cart];
    const index = tempCart.findIndex(item => item.id === id);
    const currnetObj = tempCart[index];
    currnetObj.count = currnetObj.count + 1;
    currnetObj.total = currnetObj.count * currnetObj.price;
    this.setState(
      () => {
        return {
          cart: [...tempCart],
        };
      },
      () => this.addTotals()
    );
  };
  decrement = id => {
    const tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count - 1;
    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;
      this.setState(
        () => {
          return {
            cart: [...tempCart],
          };
        },
        () => this.addTotals()
      );
    }
  };
  removeItem = id => {
    const productsCopy = [...this.state.products];
    const index = this.state.products.findIndex(item => item.id === id);
    const productsObj = productsCopy.find(item => item.id === id);
    const newProductObj = {
      ...productsObj,
      inCart: !productsObj.inCart,
      count: (productsObj.count = 0),
      total: (productsObj.total = 0),
    };
    const newProducts = [
      ...productsCopy.slice(0, index),
      newProductObj,
      ...productsCopy.slice(index + 1),
    ];
    const tempCart = [...this.state.cart];
    const cart = tempCart.filter(item => item.id !== id);
    this.setState(
      () => {
        return {
          cart,
          products: newProducts,
        };
      },
      () => this.addTotals()
    );
  };
  clearCart = () => {
    /*     const products = this.state.products.map(item => {
      return { ...item, inCart: !item.inCart };
    }); */
    this.setState(
      () => {
        return {
          cart: [],
        };
      },
      () => {
        this.setProducts();
        this.addTotals();
      }
    );
  };
  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map(item => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    this.setState(() => {
      return {
        cartSubTotal: subTotal,
        cartTax: tax,
        cartTotal: total,
      };
    });
  };
  /*   tester = () => {
    console.log('stat products', this.state.products[0].inCart);
    console.log('Data products', storeProducts[0].inCart);
    const tempProducts = [...this.state.products];
    tempProducts[0].inCart = true;
    this.setState(
      () => {
        return { products: tempProducts };
      },
      () => {
        console.log('stat products', this.state.products[0].inCart);
        console.log('Data products', storeProducts[0].inCart);
      }
    );
  }; */
  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handelDetail: this.handelDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
        }}
      >
        {' '}
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}
const ProductConsumer = ProductContext.Consumer;
export { ProductProvider, ProductConsumer };
