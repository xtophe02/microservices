import SignFormItem from "./SignFormItem";
import { useRouter } from "next/router";

export default ({ handleChange, handleSubmit, values, errors }) => {
  const router = useRouter();
  return (
    <form onSubmit={handleSubmit}>
      <SignFormItem
        fa={"envelope"}
        type={"email"}
        value={values.email}
        handleChange={handleChange}
      />
      <SignFormItem
        fa={"lock"}
        type={"password"}
        value={values.password}
        handleChange={handleChange}
      />

      <div className="field">
        <p className="control">
          <button className="button is-success">
            {router.route.split("/")[2].toUpperCase()}
          </button>
        </p>
      </div>

      <div className="field">{errors}</div>
    </form>
  );
};
