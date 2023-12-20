// pages/profile.tsx

import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "@/components/FormElement/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import router, { useRouter } from "next/router";
import React, { ChangeEvent, useEffect } from "react";
import { profile } from "@/store/authSlice";

const Profile = () => {
  const { user, status } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    if (status == "succeeded") {
      router.push("/login");
    } else {
      alert("Login Failed");
    }
  };

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  return (
    <div className="container mt-5">
      <Head>
        <title>User Profile</title>
      </Head>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">User Profile</h3>

              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">
                  Full Name
                </label>
                <p className="form-control-static">{user.fullName}</p>
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <p className="form-control-static">{user.email}</p>
              </div>

              <div className="d-grid gap-2">
                <Button
                  type="button"
                  className="btn-danger"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
