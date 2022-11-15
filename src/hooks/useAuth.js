import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { selectToken } from "../store/authSlice";

const useAuth = () => {
  const token = useSelector(selectToken);

  if (token) {
    const decoded = jwtDecode(token);

    localStorage.setItem("jwt", token);

    const data = decoded;

    return { data };
  }

  return { data: null };
};
export default useAuth;
