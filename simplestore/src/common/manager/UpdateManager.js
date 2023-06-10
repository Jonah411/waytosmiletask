import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getManagerDetailsList,
  getUserList,
  managerListDetails,
  userDetails,
} from "../../feature/loginReducer/loginReducer";

const UpdateManager = () => {
  const { id } = useParams();
  const managerList = useSelector(getManagerDetailsList);
  const userList = useSelector(getUserList);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
    name: "",
    fileName: "",
  });
  const [isSubmit, setIssubmit] = useState(false);
  const [formError, setFormError] = useState({});
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

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === "file") {
      setFormValue({ ...formValue, [name]: files[0] });
    } else {
      setFormValue({ ...formValue, [name]: value });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIssubmit(true);
    setFormError(validation(formValue));
  };
  const validation = (value) => {
    const error = {};
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (!value?.email) {
      error.email = "Email is Required";
    }
    if (!value?.password) {
      error.password = "Password is Required";
    }
    if (!value?.name) {
      error.name = "Name is Required";
    }
    if (!value?.fileName) {
      error.name = "Name is Required";
    }
    if (!allowedTypes.includes(value.fileName.type)) {
      error.fileName =
        "Invalid file type. Only JPEG, PNG, and GIF images are allowed.";
    }
    if (value.fileName.size > maxSizeInBytes) {
      error.fileName =
        "File size exceeds the limit. Maximum size allowed is 5MB.";
    }
    return error;
  };
  const convertToDataURI = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };
  const [dataURIList, setDataURIList] = useState({});
  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      try {
        const convertFileNameToDataURI = async () => {
          const dataURI = await convertToDataURI(formValue?.fileName);
          setDataURIList((prevDataURIList) => {
            return { ...prevDataURIList, dataURI };
          });
        };

        convertFileNameToDataURI().then(() => {
          const list = managerList?.map((manager) =>
            manager.id === parseInt(id)
              ? {
                  ...manager,
                  name: formValue.name,
                  email: formValue?.email,
                  password: formValue.password,
                  fileName: dataURIList.dataURI,
                }
              : manager
          );

          dispatch(managerListDetails(list));

          const userDatalist = userList?.map((user) =>
            user.id === parseInt(id)
              ? {
                  ...user,
                  email: formValue?.email,
                  password: formValue.password,
                }
              : user
          );

          dispatch(userDetails(userDatalist));
          navigate("/manager");
        });
      } catch (error) {
        console.error("Error converting file to data URI:", error);
      }
    }
  }, [
    formError,
    isSubmit,
    formValue,
    dataURIList,
    dispatch,
    navigate,
    managerList,
    userList,
    id,
  ]);

  return (
    <div className="container m-5">
      <div className="card">
        <form className="p-3">
          <div className="mt-3">
            <label htmlFor="email">Email:</label>
            <input
              type="eamil"
              name="eamil"
              value={formValue?.email}
              onChange={handleChange}
              className="form-control"
            />
            <p className="text-danger">{formError?.email}</p>
          </div>
          <div className="mt-3">
            <label htmlFor="email">Password:</label>
            <input
              type="password"
              name="password"
              value={formValue?.password}
              onChange={handleChange}
              className="form-control"
            />
            <p className="text-danger">{formError?.password}</p>
          </div>
          <div className="mt-3">
            <label htmlFor="email">Name:</label>
            <input
              type="name"
              name="name"
              value={formValue?.name}
              onChange={handleChange}
              className="form-control"
            />
            <p className="text-danger">{formError?.name}</p>
          </div>
          <div className="mt-3">
            <label htmlFor="password">Image File:</label>
            <input
              type="file"
              name="fileName"
              onChange={handleChange}
              className="form-control"
            />
            <p className="text-danger">{formError?.fileName}</p>
          </div>

          <div className="mt-3 d-grid gap-2">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => handleSubmit(e)}
            >
              Save{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateManager;
