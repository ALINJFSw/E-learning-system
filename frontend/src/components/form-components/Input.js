import { SwitchTransition } from "react-transition-group";
import { validate } from "../../Validator/validators";
import { useEffect, useReducer } from "react";
import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.TYPE) {
    case "INPUT":
      return {...state,
        value: action.val,
        isValid: validate(action.val, action.validator) || false,
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};
const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isTouched: false,
    isValid: props.initialValid || false
  });
  const inputChangeHandler = (event) => {
    dispatch({
      TYPE: "INPUT",
      val: event.target.value,
      validator: props.validator,
    });
  };

  const touchHandler = () => {
    dispatch({
      TYPE: "TOUCH",
    });
  };
  const { id, onInput } = props;
  const { value, isValid } = inputState;
  useEffect(() => {
    onInput(id, value, isValid)
  }, [id, value, isValid, onInput]);

  if (props.textAria) {
    return (
      <div className="textAria">
        <label
          htmlFor="textaria"
          value={props.label}
          onChange={inputChangeHandler}
          className={`label ${
            props.labelClassName ? props.labelClassName : ""
          }`}
        />
        <textarea
          id="textaria"
          value={props.value}
          rows={props.rows ? props.rows : 3}
        />
      </div>
    );
  }
  return (
    <div
      className={`input ${
        !inputState.isValid && inputState.isTouched && "input--invalid"
      }`}
    >
      <label
        htmlFor="input"
        className={` ${props.labelClassName ? props.labelClassName : ""}`}
      >
        {props.label} :{" "}
      </label>
      <input
        onChange={inputChangeHandler}
        onBlur={touchHandler}
        value={props.value}
        className={` ${props.inputClassName ? props.inputClassName : ""}`}
        id="input"
      />
    </div>
  );
};
export default Input;
