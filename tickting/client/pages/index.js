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

const Index = ({ currentUser }) => {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Hello World</h1>
        <p className="subtitle">
          {currentUser ? `Welcome ${currentUser.email}!` : sign()}
        </p>
      </div>
    </section>
  );
};
// Index.getInitialProps = async (context) => {

// };
export default Index;
