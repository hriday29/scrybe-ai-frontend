import React, { useState } from 'react';

const PAYU_URL = 'https://secure.payu.in/_payment'; // Use sandbox for testing

function PaymentManager({ user }) {
  const [showForm, setShowForm] = useState(false);
  const [payuData, setPayuData] = useState(null);
  const [amount, setAmount] = useState('100.00');
  const [productinfo, setProductinfo] = useState('Subscription');
  const [status, setStatus] = useState('');

  const handlePay = async () => {
    // Prepare payment data
    const paymentDetails = {
      key: 'PrLcdB', // Replace with your merchant key
      txnid: Math.random().toString(36).substr(2, 15),
      amount,
      productinfo,
      firstname: user.displayName || '',
      email: user.email || '',
    };
    try {
      const res = await fetch('http://127.0.0.1:5000/api/payu/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentDetails),
      });
      const data = await res.json();
      setPayuData(data);
      setShowForm(true);
      setStatus('');
    } catch (err) {
      setStatus('Error initiating payment');
    }
  };

  const handleCancel = () => {
    setStatus('Subscription cancelled (demo)');
  };

  const handleModify = () => {
    setStatus('Modify subscription (demo)');
  };

  // Auto-submit PayU form when payuData is set
  React.useEffect(() => {
    if (showForm && payuData) {
      document.getElementById('payuForm').submit();
    }
  }, [showForm, payuData]);

  return (
    <div>
      <h2>Payment & Subscription</h2>
      <div style={{ margin: '1em 0' }}>
        <button onClick={handlePay}>Pay</button>
        <button onClick={handleCancel} style={{ marginLeft: '1em' }}>Cancel</button>
        <button onClick={handleModify} style={{ marginLeft: '1em' }}>Modify Subscription</button>
      </div>
      <div>
        <label>Amount: <input value={amount} onChange={e => setAmount(e.target.value)} /></label>
        <label style={{ marginLeft: '1em' }}>Product: <input value={productinfo} onChange={e => setProductinfo(e.target.value)} /></label>
      </div>
      {status && <div style={{ color: 'red', marginTop: '1em' }}>{status}</div>}
      {/* PayU form (auto-submitted) */}
      {showForm && payuData && (
        <form id="payuForm" action={PAYU_URL} method="post">
          {Object.entries(payuData).map(([key, value]) => (
            <input key={key} type="hidden" name={key} value={value} />
          ))}
        </form>
      )}
    </div>
  );
}

export default PaymentManager;
