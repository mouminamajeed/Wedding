import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CartPage.css';

const CartPage = () => {
  const navigate = useNavigate();
  // Dummy cart data for demonstration
  const cartItems = [
    { id: 1, name: 'Product 1', price: 10, quantity: 1, imageUrl: '/product1.jpg' },
    { id: 2, name: 'Product 2', price: 15, quantity: 2, imageUrl: '/product2.jpg' },
    { id: 3, name: 'Product 3', price: 20, quantity: 1, imageUrl: '/product3.jpg' },
  ];

  // Calculate the total price of items in the cart
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleBuyNow = () => {
    navigate('/PaymentGatewayPage', { state: { totalAmount: totalPrice } });
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <div className="cart-item-price-quantity">
                    <span>₹{item.price}</span> {/* Display price in Indian Rupees */}
                    <span>Qty: {item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <span>Total:</span>
            <span>₹{totalPrice}</span> {/* Display total price in Indian Rupees */}
          </div>
          <button className="buy-now-button" onClick={handleBuyNow}>Buy Now</button>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;

