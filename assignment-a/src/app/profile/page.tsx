"use client";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "@/components/FormElement/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  profile,
  getUser,
  getAuthStatus,
  logout,
  getToken,
} from "@/store/authSlice";

interface User {
  fullName?: string;
  email?: string;
}

const Profile = () => {
  const router = useRouter();

  const status = useSelector(getAuthStatus);
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);
  const [userState, setUserState] = useState<User | any>(user);

  useEffect(() => {
    if (user) {
      dispatch(profile());
    } else {
      router.push("/login");
    }
  }, [user]);

  const handleLogout = async () => {
    dispatch(logout());
  };

  if (!user) {
    return <div>Profile data not available</div>;
  }

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title text-center">User Profile</h3>

                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">
                    Full Name
                  </label>
                  <p className="form-control-static">
                    {userState?.fullName ? userState?.fullName : ""}
                  </p>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <p className="form-control-static">
                    {userState?.email ? userState?.email : ""}
                  </p>
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
    </>
  );
};

export default Profile;
