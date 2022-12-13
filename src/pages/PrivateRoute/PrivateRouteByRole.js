import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { USER_ROLE } from "../../utils/constants/settingSystem";

export default function PrivateRouteByRole({ roleName }) {
  const checkPrivateRole = () => {
    if (roleName === USER_ROLE.ADMIN) {
      return roleName === USER_ROLE.ADMIN ? (
        <Outlet />
      ) : (
        <Navigate to="/overview" />
      );
    } else if (roleName === USER_ROLE.HOTEL_MANAGE) {
      return roleName === USER_ROLE.HOTEL_MANAGE ? (
        <Outlet />
      ) : (
        <Navigate to="/listRoom" />
      );
    } else if (roleName === USER_ROLE.RESTAURANT) {
      return roleName === USER_ROLE.RESTAURANT ? (
        <Outlet />
      ) : (
        <Navigate to="/listRoom" />
      );
    } else if (roleName === USER_ROLE.HOUSEKEEPING) {
      return roleName === USER_ROLE.HOUSEKEEPING ? (
        <Outlet />
      ) : (
        <Navigate to="/listRoom" />
      );
    }
  };
  return checkPrivateRole();
}
