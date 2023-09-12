import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";

const HomePage = () => {
  const { user, userPermissions } = useContext(AuthContext);
  const admin = user.is_admin;
  if (admin) {
    return (
      <div>
        <h1>UnAuthorized</h1>
      </div>
    );
  } else {
    return (
      <div>
        Welcome Back!
        <h1>Home Page</h1>
        <p>Username: {user.username}</p>
        <p>User Permissions: {userPermissions.join(", ")}</p>
      </div>
    );
  }
};

export default HomePage;
