import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeDetailsList } from "../../feature/loginReducer/loginReducer";

const ViewEmployee = () => {
  const { id } = useParams();
  const employeeList = useSelector(getEmployeeDetailsList);
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
    name: "",
    filename: "",
    profilename: "",
  });
  useEffect(() => {
    const selectUser = employeeList?.find((user) => user?.id === parseInt(id));
    const employeeProfile = {
      email: selectUser ? selectUser?.email : "",
      password: selectUser ? selectUser?.password : "",
      name: selectUser ? selectUser?.name : "",
      filename: selectUser ? selectUser?.filename : "",
      profilename: selectUser ? selectUser?.profilename : "",
    };
    setFormValue(employeeProfile);
  }, [id, employeeList]);
  const downloadFile = (base64Data, fileName) => {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleFileDownload = () => {
    if (formValue?.filename) {
      const fileName = `${formValue?.name}.pdf`;
      downloadFile(formValue?.filename, fileName);
    }
  };
  return (
    <div className="container m-5">
      <div className="card">
        <div className="card-header">
          <div className="d-flex justify-content-between">
            <h3>User View</h3>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => navigate("/employee")}
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
                  src={formValue?.profilename}
                  alt="Converted"
                  width={100}
                  className="img-thumbnail rounded mx-auto d-block"
                />
              </div>
            </div>
            <div className="mt-3">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
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
              <button
                onClick={handleFileDownload}
                className="btn btn-secondary"
              >
                {formValue?.filename
                  ? "Download File"
                  : "No any .doc or .pdf File"}
              </button>
            </div>
            <div className="mt-3 d-grid gap-2">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => navigate(`/update-employee/${id}`)}
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

export default ViewEmployee;
