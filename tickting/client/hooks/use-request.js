import axios from "axios";
import { useState } from "react";

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);
  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      const res = await axios[method](url, { ...body, ...props });
      if (onSuccess) {
        onSuccess(res.data);
      }
      return res.data;
    } catch (err) {
      setErrors(
        <div className="notification is-danger">
          <button className="delete"></button>
          <ul>
            {err.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { errors, doRequest };
};
