import React, { useState } from "react";
import "./App.css";
import Form from "./form";

const baseData = [
  {
    name: "Reuben",
    email: "reuben@email.com",
    password: "qdwjnqwd",
    tos: true,
  },
  {
    name: "Jeff",
    email: "jeff@email.com",
    password: "dwqqdw",
    tos: true,
  },
];

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
  const [member, setMember] = useState(baseData);
  const [inputVal, setInputVal] = useState(emptyInput);
  const [inputError, setInputError] = useState(emptyInputErrors);
  const [disabled, setDisabled] = useState(true);

  const change = (evt) => {
    const { name, value } = evt.target;
    setInputVal({ ...inputVal, [name]: value });
  };

  const submit = (evt) => {
    evt.preventDefault();
    setMember([...member, inputVal]);
    setInputVal(emptyInput);
  };

  return (
    <>
      <Form inputVal={inputVal} change={change} submit={submit} />
      <div className="main">
        {member.map((item, idx) => {
          return (
            <>
              <div className="box" key={idx}>
                <h3>Name: {item.name}</h3>
                <p>Email: {item.email}</p>
                <p>Pass: {item.password}</p>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default App;
