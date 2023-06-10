import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { getLoginUser } from "./feature/loginReducer/loginReducer";

const PrivateRoutes = ({ allowRolles }) => {
  const auth = useSelector(getLoginUser);
  console.log(auth);
  const Rollid = auth?.roll;
  console.log(Rollid === allowRolles);
  return Rollid === allowRolles ? (
    <Outlet />
  ) : auth ? (
    <Navigate to="/page_403" />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
