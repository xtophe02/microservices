import React from "react";
import Link from "next/link";

const sign = () => (
  <>
    Please to{" "}
    <Link href="/auth/signup">
      <a>Sign Up</a>
    </Link>{" "}
    or{" "}
    <Link href="/auth/signin">
      <a>Sign In</a>
    </Link>
  </>
);

const Index = ({ currentUser, tickets }) => {
  const ticketList = tickets.map((ticket) => (
    <Link
      href="/tickets/[ticketId]"
      as={`/tickets/${ticket.id}`}
      key={ticket.id}
    >
      <tr>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
      </tr>
    </Link>
  ));
  return (
    <>
      <h1 className="title">Tickets</h1>
      <p className="subtitle">
        {currentUser ? `Welcome ${currentUser.email}!` : sign()}
      </p>

      {tickets.length !== 0 ? (
        <table className="table is-striped is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Title</th>

              <th>Price</th>
            </tr>
          </thead>
          <tbody>{ticketList}</tbody>
        </table>
      ) : (
        <p>not tickets found</p>
      )}
    </>
  );
};
Index.getInitialProps = async (context, client) => {
  const { data } = await client.get("/api/tickets");

  return { tickets: data };
};
export default Index;
