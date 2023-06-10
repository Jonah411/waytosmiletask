import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getLoginUser,
  getNavDetailsList,
} from "../feature/loginReducer/loginReducer";
import { Link } from "react-router-dom";

const SideNavBar = ({ sideBar, setSideBar }) => {
  const navList = useSelector(getNavDetailsList);
  const auth = useSelector(getLoginUser);
  const userRole = auth?.roll;
  const [sideNavList, setSideNavList] = useState([]);
  console.log(navList);
  useEffect(() => {
    const filteredNavList = navList.filter((item) =>
      item.roll.includes(userRole)
    );
    setSideNavList(filteredNavList);
  }, [navList, userRole]);

  return (
    <div>
      <div className="p-2 d-flex justify-content-end">
        <button
          className="btn btn-secondary"
          onClick={() => setSideBar(!sideBar)}
        >
          =
        </button>
      </div>
      {auth && (
        <div className="side-nav">
          {sideNavList.map((sidenav) => (
            <ul key={sidenav.id} className="nav">
              <li className="nav-list">
                <Link
                  to={`/${sidenav?.title?.toLowerCase()}`}
                  className="nav-link"
                >
                  {sidenav.title}
                </Link>
              </li>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default SideNavBar;
