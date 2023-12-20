import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./login/page";
import Profile from "./profile/page";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

export default function Home() {
  const { status } = useSelector((state: RootState) => state.auth);

  const file = status === "succeeded" ? <Profile /> : <Login />;

  return <>{file}</>;
}
