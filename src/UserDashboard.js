import { useEffect, useState } from "react";
import { getProducts } from "./EmployeeService";
import "./App.css";

function UserDashboard({
  user,
  cartCount,
  onAddToCart,
  onCart,
  onLoginClick,
  onLogout
}) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    getProducts().then(res => setProducts(res.data));
  }, []);

  const filteredProducts =
    category === "all"
      ? products
      : products.filter(
          p => p.category.toLowerCase() === category
        );

  return (
    <>
      {/* ================= HEADER ================= */}
      <div className="shop-header">
        {/* LEFT */}
        <div className="header-left">
          {user ? `Hi ${user.name} 👋` : "Welcome 👋"}
        </div>

        {/* CENTER */}
        <div className="header-center">
          Phone & Accessories Store
        </div>

        {/* RIGHT */}
        <div className="header-right">
          {/* CART */}
          <div className="cart-icon" onClick={onCart}>
            🛒
            {cartCount > 0 && (
              <span className="cart-count">{cartCount}</span>
            )}
          </div>

          {/* PROFILE / LOGIN */}
          {user ? (
            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          ) : (
            <button className="profile-btn" onClick={onLoginClick}>
              Profile / Login
            </button>
          )}
        </div>
      </div>

      {/* ================= CATEGORY BAR ================= */}
      <div className="category-bar">
        <button onClick={() => setCategory("all")}>All</button>
        <button onClick={() => setCategory("iphone")}>iPhone</button>
        <button onClick={() => setCategory("android")}>Android</button>
        <button onClick={() => setCategory("laptop")}>Laptop</button>
        <button onClick={() => setCategory("accessories")}>
          Accessories
        </button>
      </div>

      {/* ================= PRODUCT GRID ================= */}
      <div className="product-grid">
        <div className="product-grid-inner">
          {filteredProducts.map(product => (
            <div className="product-card" key={product.id}>
              <img
                src={`/${product.image}`}
                alt={product.name}
              />
              <h3>{product.name}</h3>
              <p className="price">₹ {product.price}</p>

              <button
                className="cart-btn"
                onClick={() => onAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default UserDashboard;


