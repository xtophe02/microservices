import React from "react";
import { useRouter } from "next/router";

import useRequest from "../../hooks/use-request";
import SignForm from "../../components/SignForm";

export default () => {
  const router = useRouter();
  console.log(router);
  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });
  const { errors, doRequest } = useRequest({
    url: "/api/users/signin",
    method: "post",
    body: values,
    onSuccess: () => router.push("/"),
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
            <h1 className="title">Sign In</h1>
            <SignForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              values={values}
              errors={errors}
            />
          </div>
        </div>
      </section>
    </>
  );
};
