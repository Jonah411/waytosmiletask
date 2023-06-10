import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getManagerDetailsList } from "../../feature/loginReducer/loginReducer";

const ViewManager = () => {
  const { id } = useParams();
  const managerList = useSelector(getManagerDetailsList);
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({});
  useEffect(() => {
    const selectUser = managerList?.find((user) => user?.id === parseInt(id));
    const profile = {
      email: selectUser ? selectUser?.email : "",
      password: selectUser ? selectUser?.password : "",
      name: selectUser ? selectUser?.name : "",
      fileName: selectUser ? selectUser?.fileName : "",
    };
    setFormValue(profile);
  }, [id, managerList]);
  return (
    <div className="container m-5">
      <div className="card">
        <div className="card-header">
          <div className="d-flex justify-content-between">
            <h3>User View</h3>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => navigate("/manager")}
            >
              Back
            </button>
          </div>
        </div>
        <div className="card-body">
          <form className="p-3">
            <div className="d-flex justify-content-between">
              <div className="mt-3">
                <label htmlFor="email">Name:</label>
                <input
                  type="text"
                  name="name"
                  readOnly
                  value={formValue?.name ? formValue?.name : "N/A"}
                  className="form-control"
                />
              </div>
              <div className="text-center mt-3">
                <label htmlFor="email">Profile Image:</label>
                <img
                  src={formValue?.fileName}
                  alt="Converted"
                  width={100}
                  className="img-thumbnail rounded mx-auto d-block"
                />
              </div>
            </div>
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

            <div className="mt-3 d-grid gap-2">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => navigate(`/update-manager/${id}`)}
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

export default ViewManager;
