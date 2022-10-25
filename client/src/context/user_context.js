import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [loginName, setLoginName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const demoEmail = "stefan@webdevpro.org";
  const demoPassword = "BLdSNiXbg5+";

  const [userEmail, setUserEmail] = useState("");

  const URL = `http://localhost:8080/api/`;
  const token = cookies.get("TOKEN");

  const handleRegistration = (e) => {
    axios
      .post(`${URL}register`, { registerName, registerEmail, registerPassword })
      .then(() => {
        axios
          .post(`${URL}login`, {
            loginEmail: registerEmail,
            loginPassword: registerPassword,
          })
          .then((res) => {
            alert("Succesfully registered");
            cookies.set("TOKEN", res.data.token, {
              path: "/",
            });
            window.location.href = "/invoices";
          });
      })
      .catch((err) => {
        alert(err.response.data.err);
      });
  };

  const handleLogin = (e) => {
    axios
      .post(`${URL}login`, { loginEmail, loginPassword })

      .then((res) => {
        alert("Succesfully logged in!");
        cookies.set("TOKEN", res.data.token, {
          path: "/",
        });

        window.location.href = "/";
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const demoLogin = (e) => {
    e.preventDefault();
    console.log(demoEmail);
    axios
      .post(`${URL}login`, {
        loginEmail: demoEmail,
        loginPassword: demoPassword,
      })

      .then((res) => {
        alert("Succesfully logged in!");
        cookies.set("TOKEN", res.data.token, {
          path: "/",
        });

        window.location.href = "/";
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const handleLogout = (e) => {
    e.preventDefault(e);
    cookies.remove("TOKEN", { path: "/" });
    window.location.href = "/register";
  };

  const getUser = async () => {
    let res = await axios.get(`${URL}user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let data = res.data;
    setUserEmail(data[0].email);
    setLoginName(data[0].name);
  };

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [loginName, userEmail]);

  return (
    <UserContext.Provider
      value={{
        token,
        loginEmail,
        setLoginEmail,
        loginPassword,
        setLoginPassword,
        handleLogin,
        handleLogout,
        loginName,
        userEmail,
        registerName,
        registerEmail,
        registerPassword,
        setRegisterName,
        setRegisterEmail,
        setRegisterPassword,
        handleRegistration,
        demoLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUserContext = () => {
  return useContext(UserContext);
};
