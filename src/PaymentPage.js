import "./PaymentPage.css";

function PaymentPage({ order, onBackHome }) {
  if (!order) return null;

  return (
    <div className="payment-bg">
      <div className="payment-card">

        <h2 className="success-title">✅ Order Placed Successfully</h2>

        <p className="order-no">
          Order No: <span>{order.orderNumber}</span>
        </p>

        <div className="qr-section">
          <img src="/qr.png" alt="QR Code" className="qr-img" />
        </div>

        <p className="payment-text">
          Scan the QR code and send payment screenshot to
        </p>

        <p className="phone-number">📱 8129886664</p>

        <button className="back-btn" onClick={onBackHome}>
          Back to Dashboard
        </button>

      </div>
    </div>
  );
}

export default PaymentPage;
