// pages/register.tsx
"use client";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import InputField from "@/components/FormElement/InputField";
import Button from "@/components/FormElement/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/router";
import React, { ChangeEvent } from "react";
import { signup } from "@/store/authSlice";

const Register = () => {
  const { status } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const router = useRouter();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [email, setEmail] = React.useState("");

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>): void {
    setUsername(event.target.value);
  }
  function handleUsernameChange(event: ChangeEvent<HTMLInputElement>): void {
    setPassword(event.target.value);
  }
  function handleUseremailChange(event: ChangeEvent<HTMLInputElement>): void {
    setEmail(event.target.value);
  }

  function onsubmitHandler() {
    dispatch(signup({ fullName: username, email, password }));

    if (status == "succeeded") {
      router.push("/profile");
    } else {
      alert("Login Failed");
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Register</h3>

              <form onSubmit={onsubmitHandler}>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">
                    Full Name
                  </label>
                  <InputField
                    type="text"
                    id="fullName"
                    placeholder="Enter your full name"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <InputField
                    type="text"
                    id="username"
                    placeholder="Enter your username"
                    value={email}
                    onChange={handleUseremailChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <InputField
                    type="text"
                    id="username"
                    placeholder="Enter your username"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>

                <div className="d-grid">
                  <Button type="submit" className="btn-primary">
                    Register
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
