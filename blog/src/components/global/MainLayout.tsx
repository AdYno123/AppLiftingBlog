import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import AppNavbar from "./AppNavbar";

const MainLayout = () => {
  return (
    <Fragment>
      <header>
        <AppNavbar />
      </header>
      <Outlet />
    </Fragment>
  );
};

export default MainLayout;
