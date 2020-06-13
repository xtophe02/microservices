import React from "react";

const Orders = ({ orders }) => {
  const msLeft = (time) => new Date(time) - new Date();
  return (
    <div>
      <h1>Orders</h1>
      {orders.map((order) => (
        <p>{msLeft(order.expiresAt)}</p>
      ))}
    </div>
  );
};
Orders.getInitialProps = async (context, client) => {
  const { data } = await client.get("/api/orders");
  return { orders: data };
};

export default Orders;
