import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./form";
import * as yup from "yup";
import axios from "axios";

const emptyInput = {
  name: "",
  email: "",
  password: "",
  tos: false,
};

const emptyInputErrors = {
  name: "",
  email: "",
  password: "",
  tos: "",
};

function App() {
  const [member, setMember] = useState([]);
  const [inputVal, setInputVal] = useState(emptyInput);
  const [inputError, setInputError] = useState(emptyInputErrors);
  const [disabled, setDisabled] = useState(true);

  const change = (evt) => {
    const { name, value, type, checked } = evt.target;
    const valueToUse = type === "checkbox" ? checked : value;
    checker(name, valueToUse);
    setInputVal({ ...inputVal, [name]: valueToUse });
  };

  const submit = (evt) => {
    evt.preventDefault();
    const newMember = {
      password: inputVal.password,
      email: inputVal.email,
      first_name: inputVal.name,
      last_name: "",
    };

    postMember(newMember);
    setInputVal(emptyInput);
    setDisabled(!disabled);
  };

  const checks = yup.object().shape({
    name: yup
      .string()
      .required("Username is required")
      .min(3, "Username must be 3 chars or longer"),
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(5, "Password must be 5 chars or longer"),

    tos: yup.boolean(),
  });

  const checker = (name, value) => {
    yup
      .reach(checks, name)
      .validate(value)
      .then((valid) => {
        setInputError({
          ...inputError,
          [name]: "",
        });
      })
      .catch((err) => {
        setInputError({
          ...inputError,
          [name]: err.errors[0],
        });
      });
  };

  const postMember = (newMember) => {
    axios
      .post("https://reqres.in/api/users", newMember)
      .then((res) => {
        console.log(res.data);
        setMember([...member, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("https://reqres.in/api/users")
      .then((res) => {
        setMember(...member, res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    checks.isValid(inputVal).then((state) => {
      if (inputVal.tos) setDisabled(!state);
    });
  }, [inputVal]);

  return (
    <>
      <Form
        inputVal={inputVal}
        change={change}
        submit={submit}
        disabled={disabled}
      />
      <div className="errors">
        <h4 id="errorName">{inputError.name}</h4>
        <h4 id="errorPass">{inputError.password}</h4>
        <h4 id="errorEmail">{inputError.email}</h4>
      </div>
      <div className="main">
        {member.map((item) => {
          return (
            <div className="box" key={item.id}>
              <h3>Name: {`${item.first_name} ${item.last_name}`}</h3>
              <p>Email: {item.email}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
