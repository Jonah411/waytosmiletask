import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Pages404 from "./pages/Pages404";
import ForbiddenPages from "./pages/ForbiddenPages";
import SideNavBar from "./Layouts/SideNavBar";
import HeaderNav from "./Layouts/HeaderNav";
import AlertToast from "./common/AlertToast";
import { useSelector } from "react-redux";
import { getLoginUser } from "./feature/loginReducer/loginReducer";
import Employee from "./pages/Employee";
import Manager from "./pages/Manager";
import AddUser from "./common/admin/AddUser";
import ViewUser from "./common/admin/ViewUser";
import UpdateUser from "./common/admin/UpdateUser";
import ViewManager from "./common/manager/ViewManager";
import UpdateManager from "./common/manager/UpdateManager";
import UpdateEmployee from "./common/employee/UpdateEmployee";
import ViewEmployee from "./common/employee/ViewEmployee";

const App = () => {
  const authUser = useSelector(getLoginUser);
  console.log(authUser);
  const [sideBar, setSideBar] = useState(false);
  const Roles = {
    Admin: 1,
    Manager: 2,
    Employee: 3,
  };
  return (
    <div className="app">
      <Router>
        <div className={sideBar ? "sidebar-active" : "sidebar-inactive"}>
          <SideNavBar sideBar={sideBar} setSideBar={setSideBar} />
        </div>
        <div className="window-body">
          <HeaderNav />
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route path="*" element={<Pages404 />} />
            <Route path="/page_403" element={<ForbiddenPages />} />
            <Route path="/" element={<PrivateRoutes />}>
              <Route exact path="/login" element={<Login />} />
            </Route>
            {Roles.Admin === authUser?.roll && (
              <Route
                path="/"
                element={<PrivateRoutes allowRolles={Roles.Admin} />}
              >
                <Route exact path="/admin" element={<Admin />} />
                <Route exact path="/add-user" element={<AddUser />} />
                <Route exact path="/view-user/:id" element={<ViewUser />} />
                <Route exact path="/update-user/:id" element={<UpdateUser />} />
                <Route exact path="/manager" element={<Manager />} />
                <Route
                  exact
                  path="/view-manager/:id"
                  element={<ViewManager />}
                />
                <Route
                  exact
                  path="/update-manager/:id"
                  element={<UpdateManager />}
                />
                <Route exact path="/employee" element={<Employee />} />
                <Route
                  exact
                  path="/update-employee/:id"
                  element={<UpdateEmployee />}
                />
                <Route
                  exact
                  path="/view-employee/:id"
                  element={<ViewEmployee />}
                />
              </Route>
            )}
            {Roles.Manager === authUser?.roll && (
              <Route
                path="/"
                element={<PrivateRoutes allowRolles={Roles.Manager} />}
              >
                <Route exact path="/manager" element={<Manager />} />
                <Route exact path="/add-user" element={<AddUser />} />
                <Route
                  exact
                  path="/view-manager/:id"
                  element={<ViewManager />}
                />
                <Route
                  exact
                  path="/update-manager/:id"
                  element={<UpdateManager />}
                />
                <Route exact path="/employee" element={<Employee />} />
                <Route
                  exact
                  path="/update-employee/:id"
                  element={<UpdateEmployee />}
                />
                <Route
                  exact
                  path="/view-employee/:id"
                  element={<ViewEmployee />}
                />
              </Route>
            )}
            {Roles.Employee === authUser?.roll && (
              <Route
                path="/"
                element={<PrivateRoutes allowRolles={Roles.Employee} />}
              >
                <Route exact path="/employee" element={<Employee />} />
                <Route
                  exact
                  path="/update-employee/:id"
                  element={<UpdateEmployee />}
                />
                <Route
                  exact
                  path="/view-employee/:id"
                  element={<ViewEmployee />}
                />
              </Route>
            )}
          </Routes>
        </div>
      </Router>
      <AlertToast />
    </div>
  );
};

export default App;
