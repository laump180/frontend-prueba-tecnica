import { Controller } from "react-hook-form";
import "./RadioButton.css";
const RadioButton = ({
  name,
  text,
  onClick,
  register,
  label,
  checked,
  solved,
  ...res
}) => {
  console.log(solved);
  return (
    <div className="radio-button-container">
      <input
        onClick={onClick}
        className="button"
        name={name}
        type="radio"
        {...register}
        {...res}
        checked={checked}
      >
        {text}
      </input>
      <div className="radio-button-label">
        {label}{" "}
        {checked && (
          <span className={`${solved ? "correct" : "incorrect"}`}>
            {`- ${solved ? "Correcto" : "Incorrecto"}`}
          </span>
        )}
      </div>
    </div>
  );
};

export default RadioButton;
