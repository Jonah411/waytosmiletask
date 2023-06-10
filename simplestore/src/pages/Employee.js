import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FiEdit2 } from "react-icons/fi";
import { AiFillEye } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import {
  employeeListDetails,
  getEmployeeDetailsList,
  getLoginUser,
  getUserList,
  userDetails,
} from "../feature/loginReducer/loginReducer";
import { useNavigate } from "react-router-dom";
import SearchFilter from "../common/SearchFilter";

const Employee = () => {
  const user = useSelector(getLoginUser);
  const employeeList = useSelector(getEmployeeDetailsList);
  const userList = useSelector(getUserList);
  const [employeeData, setEmployeeData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (parseInt(user?.roll) === 1) {
      const listData = employeeList?.filter((userroll) => userroll?.roll === 3);
      setEmployeeData(listData);
    }
    if (parseInt(user?.roll) === 2) {
      const listData = employeeList?.filter((userroll) => userroll?.roll === 3);
      setEmployeeData(listData);
    }

    if (parseInt(user?.roll) === 3) {
      const listData = employeeList?.filter(
        (userroll) => userroll?.id === user?.id
      );
      setEmployeeData(listData);
    }
  }, [user, employeeList]);
  const navigate = useNavigate();
  const columns = [
    {
      name: "S.No",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => (row.name ? row.name : "N/A"),
      sortable: true,
    },
    {
      name: "Profile",
      selector: (row) =>
        row.profilename ? (
          <img
            src={row.profilename}
            alt="Converted"
            width={100}
            className="img-thumbnail rounded mx-auto d-block"
          />
        ) : (
          "N/A"
        ),
      sortable: true,
    },
    {
      name: "Doc",
      selector: (row) => (row.filename ? "File Upload" : "N/A"),
      sortable: true,
    },
    {
      name: "Roll",
      selector: (row) => {
        if (row?.roll === 1) {
          return "Admin";
        } else if (row?.roll === 2) {
          return "Manager";
        } else if (row?.roll === 3) {
          return "Employee";
        }
      },
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-secondary"
            onClick={() => {
              navigate(`/view-employee/${row?.id}`);
            }}
          >
            <AiFillEye />
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate(`/update-employee/${row?.id}`);
            }}
          >
            <FiEdit2 />
          </button>
          {user?.roll !== 3 ? (
            <button
              className="btn btn-danger"
              onClick={() => {
                const dataUser = employeeList?.filter(
                  (user) => user?.id !== row?.id
                );
                const UserListDetails = userList?.filter(
                  (user) => user?.id !== row?.id
                );
                dispatch(employeeListDetails(dataUser));
                dispatch(userDetails(UserListDetails));
                //   navigate("/addagent");
              }}
            >
              <GiCancel />
            </button>
          ) : (
            <div></div>
          )}
        </div>
      ),
    },
  ];
  const [searchData, setSearchData] = useState(employeeData);
  const handleSearch = (searchValue) => {
    setSearchData(searchValue);
  };
  return (
    <DataTable
      className="data-table-hris"
      title={<p>Employee List</p>}
      columns={columns}
      data={employeeData?.filter((user) =>
        user?.email?.toLowerCase().includes(searchData)
      )}
      pagination
      fixedHeader
      fixedHeaderScrollHeight="300px"
      highlightOnHover
      subHeader
      subHeaderComponent={<SearchFilter handleSearch={handleSearch} />}
      actions={
        user?.roll !== 3 && (
          <button
            className="btn btn-success"
            onClick={() => {
              navigate("/add-user");
            }}
          >
            Add
          </button>
        )
      }
    />
  );
};

export default Employee;
