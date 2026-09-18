import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../actions/orderActions';

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <div className="container py-4">
      <h1 className="mb-4">My Orders</h1>
      {loading ? (
        <p>Loading...</p>
      ) : !orders.length ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} className="card mb-3">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <span className="text-muted">
                  {new Date(order.createdAt).toLocaleString()}
                </span>
                <span className={`badge ${order.status === 'paid' ? 'bg-success' : 'bg-danger'}`}>
                  {order.status}
                </span>
              </div>
              <ul className="list-unstyled mt-2 mb-2">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.title} × {item.quantity} — ${(item.price * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>
              <strong>Total: ${order.total.toFixed(2)}</strong>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
