export default ({ value, handleChange, type, fa }) => (
  <div className="field">
    <p className="control has-icons-left has-icons-right">
      <input
        className="input"
        type={type}
        placeholder={type}
        value={value}
        onChange={handleChange}
        name={type}
      />
      <span className="icon is-small is-left">
        <i className={`fas fa-${fa}`}></i>
      </span>
      <span className="icon is-small is-right">
        <i className="fas fa-check"></i>
      </span>
    </p>
  </div>
);
