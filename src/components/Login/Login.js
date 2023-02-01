import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import styles from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (prevState, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.value,
      isValid: action.value.includes("@"),
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: prevState.value,
      isValid: prevState.value.includes("@"),
    };
  }
  return {
    value: "",
    isValid: false,
  };
};
const pasReducer = (prevState, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.value,
      isValid: action.value.trim().length > 7,
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: prevState.value,
      isValid: prevState.value.trim().length > 7,
    };
  }
  return {
    value: "",
    isValid: false,
  };
};
const Login = (props) => {
  // const [inputEmail, setInputEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [inputPassword, setInputPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmailState] = useReducer(emailReducer, {
    value: "",
    isValid: undefined,
  });

  const [pasState, dispatchPasState] = useReducer(pasReducer, {
    value: "",
    isValid: undefined,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: pasIsValid } = pasState;

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(emailIsValid && pasIsValid);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [emailIsValid, pasIsValid]);

  const emailChangeHandler = (event) => {
    // setInputEmail(event.target.value);
    dispatchEmailState({ type: "USER_INPUT", value: event.target.value });

    // setFormIsValid(event.target.value.includes("@") && pasState.isValid);
  };

  const passwordChangeHandler = (event) => {
    // setInputPassword(event.target.value);
    dispatchPasState({ type: "USER_INPUT", value: event.target.value });
    // setFormIsValid(event.target.value.trim().length > 7 && emailState.isValid);
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmailState({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(inputPassword.trim().length > 7);
    dispatchPasState({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, pasState.value);
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${styles.control} ${
            emailState.isValid === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${styles.control} ${
            pasState.isValid === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={pasState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={styles.actions}>
          <Button type="submit" className={styles.btn} disabled={!formIsValid}>
            Вход
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;