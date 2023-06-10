import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FiEdit2 } from "react-icons/fi";
import { AiFillEye } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserList,
  userListDetails,
} from "../feature/loginReducer/loginReducer";
import SearchFilter from "../common/SearchFilter";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const userList = useSelector(getUserList);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState(userList);
  const handleSearch = (searchValue) => {
    setSearchData(searchValue);
  };
  const columns = [
    {
      name: "S.No",
      selector: (row) => row.id,
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
              navigate(`/view-user/${row?.id}`);
            }}
          >
            <AiFillEye />
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate(`/update-user/${row?.id}`);
            }}
          >
            <FiEdit2 />
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              console.log(row);
              const dataUser = userList?.filter((user) => user?.id !== row?.id);
              dispatch(userListDetails(dataUser));
              //   navigate("/addagent");
            }}
          >
            <GiCancel />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <DataTable
        className="data-table-hris"
        title={<p>User List</p>}
        columns={columns}
        data={userList?.filter((user) =>
          user?.email?.toLowerCase().includes(searchData)
        )}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="300px"
        highlightOnHover
        subHeader
        subHeaderComponent={<SearchFilter handleSearch={handleSearch} />}
        actions={
          <button
            className="btn btn-success"
            onClick={() => {
              navigate("/add-user");
            }}
          >
            Add
          </button>
        }
      />
    </div>
  );
};

export default Admin;
