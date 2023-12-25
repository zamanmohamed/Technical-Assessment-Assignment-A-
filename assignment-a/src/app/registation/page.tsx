// pages/register.tsx
"use client";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import InputField from "@/components/FormElement/InputField";
import Button from "@/components/FormElement/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect } from "react";
import { profile, signup } from "@/store/authSlice";

const Register = () => {
  const { status } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [email, setEmail] = React.useState("");

  async function onsubmitHandler(e: React.MouseEvent<HTMLButtonElement> | any) {
    e.preventDefault();
    await dispatch(signup({ fullName: username, email, password }));
  }

  useEffect(() => {
    if (status == "succeeded") {
      router.push("/profile");
      dispatch(profile());
    }
  }, [status]);

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
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setUsername(event.target.value)
                    }
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
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setEmail(event.target.value)
                    }
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
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setPassword(event.target.value)
                    }
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
