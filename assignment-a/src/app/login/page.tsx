"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import InputField from "@/components/FormElement/InputField";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import React, { ChangeEvent } from "react";
import { RootState } from "@/store";
import { login } from "@/store/authSlice";
import { useRouter } from "next/router";

const Login = () => {
  const { status } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const router = useRouter();

  const [email, setemail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>): void {
    setemail(event.target.value);
  }

  function handleemailChange(event: ChangeEvent<HTMLInputElement>): void {
    setPassword(event.target.value);
  }

  function submitFunction(): void {
    dispatch(login({ email, password }));

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
              <h3 className="card-title text-center">Login</h3>

              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    email
                  </label>
                  <InputField
                    type="text"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleemailChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <InputField
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>

                <div className="d-grid">
                  <Button
                    type="submit"
                    className="btn-primary"
                    onClick={submitFunction}
                  >
                    Login
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

export default Login;
