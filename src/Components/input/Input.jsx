import "./Input.css";
const Input = ({
  text,
  onChange,
  placeholder,
  label,
  register,
  error,
  ...res
}) => {
  return (
    <div className="input-container">
      <div className="form__group field">
        <input
          type="input"
          className="form__field"
          placeholder={placeholder}
          name={label}
          id={label}
          {...register}
          {...res}
        />
        <label htmlFor={label} className="form__label">
          {label}
        </label>
      </div>
      {error && <span className="input-error">*</span>}
    </div>
  );
};

export default Input;
