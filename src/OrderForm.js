import { useState } from "react";
import { placeOrder } from "./EmployeeService";
import "./OrderForm.css";

function OrderForm({ cart, onBack, onSubmit }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const orderData = {
        name,
        phone,
        address,
        pincode,
        totalAmount
      };

      const res = await placeOrder(orderData);

      // ✅ order saved in DB
      onSubmit(res.data);
    } catch (err) {
      console.error(err);
      alert("Order failed");
    }
  };

  return (
    <div className="order-form">
      <h2>Delivery Details</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <textarea
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <input
          placeholder="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          required
        />

        <h3>Total: ₹ {totalAmount}</h3>

        <button type="submit">Continue to Payment</button>
        <button type="button" onClick={onBack}>
          Back
        </button>
      </form>
    </div>
  );
}

export default OrderForm;
