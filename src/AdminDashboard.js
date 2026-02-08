import { useEffect, useState } from "react";
import { getUsers, deleteUser, getAllOrders } from "./EmployeeService";
import "./AdminDashboard.css";

function AdminDashboard({ onLogout }) {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadUsers();
    loadOrders();
  }, []);

  const loadUsers = () => {
    getUsers().then(res => setUsers(res.data));
  };

  const loadOrders = () => {
    getAllOrders().then(res => setOrders(res.data));
  };

  return (
    <div className="admin-bg">
      <div className="admin-container">

        {/* HEADER */}
        <div className="admin-header">
          <h2>Admin Dashboard</h2>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>

        {/* USERS SECTION */}
        <h3 className="section-title">Users</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No users found
                </td>
              </tr>
            ) : (
              users.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteUser(u.id).then(loadUsers)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* ORDERS SECTION */}
        <h3 className="section-title">Orders</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order No</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Pincode</th>
              <th>Total ₹</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map(o => (
                <tr key={o.id}>
                  <td className="order-number">{o.orderNumber}</td>
                  <td>{o.name}</td>
                  <td>{o.phone}</td>
                  <td>{o.address}</td>
                  <td>{o.pincode}</td>
                  <td className="order-total">₹ {o.totalAmount}</td>
                  <td>{new Date(o.createdAt).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default AdminDashboard;
