import { Outlet } from "react-router";

import Navbar from "./Navbar";

function Layout() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
