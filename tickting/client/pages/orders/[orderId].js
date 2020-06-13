import React from "react";

const OrderShow = ({ order }) => {
  const [time, setTime] = React.useState(0);
  React.useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTime(Math.round(msLeft / 1000));
    };
    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [order]);
  let minutes = Math.floor(time / 60);
  let seconds = time - minutes * 60;

  return (
    <div>
      <h1>Order Show</h1>

      {time < 0 ? (
        <p>Order expired</p>
      ) : (
        <p>
          Time left to pay: {minutes}:min {seconds}:sec
        </p>
      )}
    </div>
  );
};
OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);
  return { order: data };
};
export default OrderShow;
