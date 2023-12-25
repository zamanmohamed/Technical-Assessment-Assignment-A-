"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./login/page";
import Profile from "./profile/page";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

export default function Home() {
  const { user } = useSelector((state: RootState) => state.auth);

  const file = user ? <Profile /> : <Login />;

  return <>{file}</>;
}
