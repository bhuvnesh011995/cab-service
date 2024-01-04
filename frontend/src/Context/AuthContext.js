import { createContext, useEffect, useState } from "react";
import BASE_URL from "../config/config";
import axios from "axios";

const authContext = createContext();

const initialAdmin = {
  name: null,
  username: null,
  email: null,
  token: null,
  role: null,
  permissions: null,
};

export default function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(initialAdmin);
  const token = localStorage.getItem("token") || admin.token;

  useEffect(() => {
    if (token) getLoginUser();
  }, [token]);

  const getLoginUser = async () => {
    const response = await axios.get(BASE_URL + "/auth/loginedUser/" + token);
    setAdmin({
      name: response.data.name,
      email: response.data.email,
      username: response.data.name,
      token: response.data.token,
      role: response.data.role,
      permissions: response.data.permissions,
    });
    console.log(response);
  };

  const NewAxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "x-token-header": admin?.token?.length
        ? admin?.token
        : localStorage.getItem("token"),
    },
  });

  return (
    <authContext.Provider
      value={{ admin, setAdmin, initialAdmin, NewAxiosInstance }}
    >
      {children}
    </authContext.Provider>
  );
}

export { authContext };
