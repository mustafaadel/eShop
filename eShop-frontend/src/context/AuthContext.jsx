import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
const AuthContext = createContext();
export default AuthContext;
export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );
  const [userPermissions, setUserPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  let loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });
    let data = await res.json();
    if (res.status === 200) {
      setAuthTokens({ access: data.access, refresh: data.refresh });
      setUser(jwtDecode(data.access));
      let admin = jwtDecode(data.access).is_admin;
      localStorage.setItem("authTokens", JSON.stringify(data));

      navigate("/");
    } else {
      alert("Invalid Credentials");
    }
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  const getUserPermissions = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/user-permissions/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`,
      },
    });
    let data = await res.json();
    if (res.status === 200) {
      setUserPermissions(data.permissions);
    } else if (res.status === 401) {
      logoutUser();
    } else {
      console.log(data);
    }
  };

  let contextData = {
    user: user,
    setUser: setUser,
    authTokens: authTokens,
    setAuthTokens: setAuthTokens,
    userPermissions: userPermissions,
    setUserPermissions: setUserPermissions,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens.access));
      getUserPermissions();
    }
    if (loading) {
      setLoading(false);
    }
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
