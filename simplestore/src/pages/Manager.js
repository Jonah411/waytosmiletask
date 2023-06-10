import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FiEdit2 } from "react-icons/fi";
import { AiFillEye } from "react-icons/ai";
import { useSelector } from "react-redux";
import {
  getLoginUser,
  getManagerDetailsList,
} from "../feature/loginReducer/loginReducer";
import SearchFilter from "../common/SearchFilter";
import { useNavigate } from "react-router-dom";

const Manager = () => {
  const user = useSelector(getLoginUser);
  const managerList = useSelector(getManagerDetailsList);
  const [managerData, setManagerData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (parseInt(user?.roll) === 1) {
      const listData = managerList?.filter((userroll) => userroll?.roll === 2);
      setManagerData(listData);
    }

    if (parseInt(user?.roll) === 2) {
      const listData = managerList?.filter(
        (userroll) => userroll?.id === user?.id
      );
      setManagerData(listData);
    }
  }, [user, managerList]);

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
        row.fileName ? (
          <img
            src={row.fileName}
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
              navigate(`/view-manager/${row?.id}`);
            }}
          >
            <AiFillEye />
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate(`/update-manager/${row?.id}`);
            }}
          >
            <FiEdit2 />
          </button>
          {/* <button
            className="btn btn-danger"
            onClick={() => {
              const dataUser = managerList?.filter(
                (user) => user?.id !== row?.id
              );
              dispatch(managerListDetails(dataUser));
              //   navigate("/addagent");
            }}
          >
            <GiCancel />
          </button> */}
        </div>
      ),
    },
  ];
  const [searchData, setSearchData] = useState(managerData);
  const handleSearch = (searchValue) => {
    setSearchData(searchValue);
  };
  return (
    <div>
      <DataTable
        className="data-table-hris"
        title={<p>Manager List</p>}
        columns={columns}
        data={managerData?.filter((user) =>
          user?.email?.toLowerCase().includes(searchData)
        )}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="300px"
        highlightOnHover
        subHeader
        subHeaderComponent={<SearchFilter handleSearch={handleSearch} />}
        // actions={
        //   <button
        //     className="btn btn-success"
        //     onClick={() => {
        //       navigate("/add-user");
        //     }}
        //   >
        //     Add
        //   </button>
        // }
      />
    </div>
  );
};

export default Manager;
