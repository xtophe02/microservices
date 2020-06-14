import React from "react";
import StripeCheckout from "react-stripe-checkout";
import useRequest from "../../hooks/use-request";
import { useRouter } from "next/router";

const OrderShow = ({ order, currentUser }) => {
  const router = useRouter();
  const [time, setTime] = React.useState(0);
  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: () => router.push("/orders/show"),
  });
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
      <StripeCheckout
        token={(token) => doRequest({ token: token.id })}
        stripeKey="pk_test_51GtG96AMntE4WZQOItfZzP8JjZT36KgKCAtZJfTcFZtL0KYiZ7PN2qGPEkWQLNqrqIpPvfKo3MRl0yozycuI7RhH008iwWBGoZ"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
      {errors}
    </div>
  );
};
OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);
  return { order: data };
};
export default OrderShow;
