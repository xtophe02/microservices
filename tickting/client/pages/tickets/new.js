import React from "react";
import useRequest from "../../hooks/use-request";
import Link from "next/link";
import { useRouter } from "next/router";
import { route } from "next/dist/next-server/server/router";

const initValues = { title: "", price: "" };
const NewTicket = () => {
  const [values, setValues] = React.useState(initValues);
  const router = useRouter();
  const { doRequest, errors } = useRequest({
    url: "/api/tickets",
    method: "post",
    body: { ...values },
    onSuccess: () => router.push("/"),
  });
  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleBlur = () => {
    const { price } = values;
    const value = parseFloat(price);
    if (isNaN(value)) {
      return;
    }
    setValues({ ...values, price: value.toFixed(2) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValues(initValues);
    await doRequest();
  };
  return (
    <>
      <h1 className="title">Create a Ticket</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={values.title}
              name="title"
              onChange={handleOnChange}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Price</label>
          <div className="control">
            <input
              className="input"
              type="number"
              onBlur={handleBlur}
              placeholder="EUR"
              value={values.price}
              name="price"
              step="0.01"
              onChange={handleOnChange}
            />
          </div>
        </div>

        <div className="field is-grouped">
          <p className="control">
            <button
              className="button is-primary"
              // type="submit"
              // onClick={handleSubmit}
            >
              Submit
            </button>
          </p>
          <p className="control">
            <Link href="/">
              <a className="button is-light">Cancel</a>
            </Link>
          </p>
        </div>
        <div className="field">{errors}</div>
      </form>
    </>
  );
};

export default NewTicket;
