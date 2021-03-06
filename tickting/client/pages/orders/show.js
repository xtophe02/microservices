import React from "react";
import Link from "next/link";

const Orders = ({ orders }) => {
  const msLeft = (time) => new Date(time) - new Date();
  return (
    <div>
      <h1>Orders</h1>
      {orders.map((order) => (
        <p key={order.id}>
          <Link href="/orders/[orderId]" as={`/orders/${order.id}`}>
            <a>
              {order.ticket.title} - {order.status} - {msLeft(order.expiresAt)}
            </a>
          </Link>
        </p>
      ))}
    </div>
  );
};
Orders.getInitialProps = async (context, client) => {
  const { data } = await client.get("/api/orders");
  return { orders: data };
};

export default Orders;
