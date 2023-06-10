import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getUserList } from "../../feature/loginReducer/loginReducer";

const ViewUser = () => {
  const { id } = useParams();
  const userList = useSelector(getUserList);
  const navigate = useNavigate();
  const init = {
    email: "",
    password: "",
    roll: "",
  };

  const [formValue, setFormValue] = useState(init);
  useEffect(() => {
    console.log(userList, id);
    const selectUser = userList?.filter((user) => user?.id === parseInt(id));

    setFormValue({
      email: selectUser[0]?.email,
      password: selectUser[0]?.password,
      roll: (() => {
        if (selectUser[0]?.roll === 1) {
          return "Admin";
        } else if (selectUser[0]?.roll === 2) {
          return "Manager";
        } else if (selectUser[0]?.roll === 3) {
          return "Employee";
        }
      })(),
    });
  }, [userList, id]);
  return (
    <div className="container m-5">
      <div className="card">
        <div className="card-header">
          <div className="d-flex justify-content-between">
            <h3>User View</h3>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => navigate("/admin")}
            >
              Back
            </button>
          </div>
        </div>
        <div className="card-body">
          <form className="p-3">
            <div className="mt-3">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                readOnly
                value={formValue?.email}
                className="form-control"
              />
            </div>
            <div className="mt-3">
              <label htmlFor="password">Password:</label>
              <input
                type="text"
                name="password"
                readOnly
                value={formValue?.password}
                className="form-control"
              />
            </div>
            <div className="mt-3">
              <label htmlFor="roll">User Roll:</label>
              <input
                type="text"
                name="password"
                readOnly
                value={formValue?.roll}
                className="form-control"
              />
            </div>
            <div className="mt-3 d-grid gap-2">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => navigate(`/update-user/${id}`)}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
