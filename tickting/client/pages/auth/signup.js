import React from "react";
import Router from "next/router";

import useRequest from "../../hooks/use-request";

export default () => {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });
  const { errors, doRequest } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: values,
    onSuccess: () => Router.push("/"),
  });
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await doRequest();
  };
  return (
    <>
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Sign Up</h1>
            <form onSubmit={handleSubmit}>
              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    // type="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                    name="email"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-check"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <button className="button is-success">Login</button>
                </p>
              </div>

              <div className="field">{errors}</div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
