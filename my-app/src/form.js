import React, { useState } from "react";

export default function Form({ inputVal, change, submit }) {
  return (
    <div className="App">
      <div className="input">
        <form onSubmit={submit}>
          <div className="label">
            <input
              type="text"
              name="name"
              value={inputVal.name}
              onChange={change}
              placeholder="Name"
            />
          </div>
          <div className="label">
            <input
              type="text"
              name="password"
              value={inputVal.password}
              onChange={change}
              placeholder="Password"
            />
          </div>
          <div className="label">
            <input
              type="email"
              name="email"
              value={inputVal.email}
              onChange={change}
              placeholder="Email.com"
            />{" "}
          </div>
          <div className="label">
            <label>
              Terms of Service:
              <input
                type="checkbox"
                name="tos"
                checked={inputVal.tos}
                onChange={change}
              />
            </label>
          </div>
          <div className="label">
            <button
              disabled={!inputVal.email || !inputVal.name || !inputVal.role}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
