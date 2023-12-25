"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import InputField from "@/components/FormElement/InputField";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import React, { ChangeEvent, useEffect } from "react";
import { AppDispatch, RootState } from "@/store";
import { login } from "@/store/authSlice";
import { useRouter } from "next/navigation";

const Login = () => {
  const { status, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const [email, setemail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function submitFunction(e: React.MouseEvent<HTMLButtonElement> | any): void {
    e.preventDefault();
    dispatch(login({ email, password }));
  }

  useEffect(() => {
    if (user) {
      router.push("/profile");
    }
  }, [user]);

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
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setemail(event.target.value)
                    }
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
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setPassword(event.target.value)
                    }
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
