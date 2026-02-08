import "./App.css";

function CartPage({ cart, onRemove, onBack, onBuyNow }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleBuyNow = (e) => {
    e.preventDefault();   // 🔥 STOP FORM SUBMIT
    e.stopPropagation();  // 🔥 STOP BUBBLE
    onBuyNow();            // GO TO ORDER PAGE
  };

  return (
    <div className="cart-page">
      <h2>My Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div className="cart-item" key={index}>
              <img src={`/${item.image}`} alt={item.name} />
              <div>
                <h4>{item.name}</h4>
                <p>₹ {item.price}</p>
              </div>
              <button
                type="button"
                onClick={() => onRemove(index)}
              >
                Remove
              </button>
            </div>
          ))}

          <h3>Total: ₹ {total}</h3>

          <button
            type="button"
            className="buy-btn"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
        </>
      )}

      <button type="button" className="back-btn" onClick={onBack}>
        ← Back to Shop
      </button>
    </div>
  );
}

export default CartPage;
