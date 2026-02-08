import { useState } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import CartPage from "./CartPage";
import OrderForm from "./OrderForm";
import PaymentPage from "./PaymentPage";
import "./App.css";

function App() {
  const [page, setPage] = useState("dashboard");
  const [currentUser, setCurrentUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState(null);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // ---------- LOGIN ----------
  if (page === "login")
    return (
      <LoginPage
        onUserLogin={(user) => {
          setCurrentUser(user);
          setPage("dashboard");
        }}
        onAdminLogin={() => setPage("admin")}
        onRegister={() => setPage("register")}
        onBack={() => setPage("dashboard")}
      />
    );

  // ---------- REGISTER ----------
  if (page === "register")
    return <RegisterPage onBack={() => setPage("login")} />;

  // ---------- ADMIN ----------
  if (page === "admin")
    return <AdminDashboard onLogout={() => setPage("dashboard")} />;

  // ---------- CART ----------
  if (page === "cart")
    return (
      <CartPage
        cart={cart}
        onRemove={removeFromCart}
        onBack={() => setPage("dashboard")}
        onBuyNow={() =>
          currentUser ? setPage("order") : setPage("login")
        }
      />
    );

  // ---------- ORDER ----------
  if (page === "order")
    return (
      <OrderForm
        cart={cart}
        onBack={() => setPage("cart")}
        onSubmit={(data) => {
          const totalAmount = cart.reduce(
            (sum, item) => sum + item.price,
            0
          );

          // ✅ SEND ONLY BACKEND FIELDS
          setOrder({
            ...data,
            totalAmount
          });

          setPage("payment");
        }}
      />
    );

  // ---------- PAYMENT ----------
  if (page === "payment")
    return (
      <PaymentPage
        order={order}
        onBackHome={() => {
          setCart([]);
          setOrder(null);
          setPage("dashboard");
        }}
      />
    );

  // ---------- DASHBOARD ----------
  return (
    <UserDashboard
      user={currentUser}
      cartCount={cart.length}
      onAddToCart={addToCart}
      onCart={() => setPage("cart")}
      onLoginClick={() => setPage("login")}
      onLogout={() => {
        setCurrentUser(null);
        setPage("dashboard");
      }}
    />
  );
}

export default App;
