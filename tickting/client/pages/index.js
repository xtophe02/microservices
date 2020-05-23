import React from "react";
import Link from "next/link";

export default function Index() {
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
}
