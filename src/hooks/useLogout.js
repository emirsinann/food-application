/* import axios from "../api/axios"; */
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    setAuth({});
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    navigate("/login");
    window.location.reload();
  };

  return logout;
};

export default useLogout;
