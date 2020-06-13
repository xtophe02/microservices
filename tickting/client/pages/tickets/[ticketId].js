// export default (props) => {
//   console.log(props);
//   return <h1>First Post</h1>;
// };

import React from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";
import { useRouter } from "next/router";

const TicketShow = ({ ticket }) => {
  const router = useRouter();
  const { doRequest, errors } = useRequest({
    url: "/api/orders",
    method: "post",
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) =>
      router.push("/orders/[orderId]", `/orders/${order.id}`),
  });
  return (
    <div>
      <h1 className="title">Purchase</h1>
      <div className="box">
        <article className="media">
          <div className="media-content">
            <div className="content">
              <p className="title is-4">{ticket.title}</p>
              <p className="subtitle">{ticket.price}&euro;</p>
              {errors}
            </div>
          </div>
          <div className="media-right ">
            <div className="field is-grouped is-grouped-right">
              <p className="control">
                <a
                  className="button is-danger is-outlined"
                  onClick={() => Router.back()}
                >
                  Cancel
                </a>
              </p>
              <p className="control">
                <a
                  className="button is-primary is-outlined"
                  onClick={doRequest}
                >
                  Purchase
                </a>
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
TicketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;

  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return { ticket: data };
};
export default TicketShow;
