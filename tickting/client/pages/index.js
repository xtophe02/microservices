import React from "react";
import Link from "next/link";
import axios from "axios";

const Index = ({ currentUser }) => {
  console.log(currentUser);
  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Hello World</h1>
        <p className="subtitle">
          My first website with <strong>Bulma</strong>!
        </p>
        <Link href="/auth/signup">
          <a>Sign Up</a>
        </Link>
      </div>
    </section>
  );
};
Index.getInitialProps = async ({ req }) => {
  let res;
  if (typeof window === "undefined") {
    //http://SERVICENAME.NAMESPACE.svc.cluster.local
    res = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      {
        headers: req.headers,
      }
    );
  } else {
    res = await axios.get("/api/users/currentuser");
  }

  return res.data;
};
export default Index;
