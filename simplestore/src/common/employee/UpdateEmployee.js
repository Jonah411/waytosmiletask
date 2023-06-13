import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  employeeListDetails,
  getEmployeeDetailsList,
  getUserList,
  userDetails,
} from "../../feature/loginReducer/loginReducer";

const UpdateEmployee = () => {
  const { id } = useParams();
  const employeeList = useSelector(getEmployeeDetailsList);
  const [employeeDetailsList] = useState(employeeList);
  const userListArray = useSelector(getUserList);
  const [userList] = useState(userListArray);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
    name: "",
    filename: "",
    profilename: "",
  });
  const [isSubmit, setIssubmit] = useState(false);
  const [formError, setFormError] = useState({});
  useEffect(() => {
    const selectUser = employeeDetailsList?.find(
      (user) => user?.id === parseInt(id)
    );
    const employeeProfile = {
      email: selectUser ? selectUser?.email : "",
      password: selectUser ? selectUser?.password : "",
      name: selectUser ? selectUser?.name : "",
      filename: selectUser ? selectUser?.filename : "",
      profilename: selectUser ? selectUser?.profilename : "",
    };
    setFormValue(employeeProfile);
  }, [id, employeeDetailsList]);
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
    const validMimeTypes = ["application/msword", "application/pdf"];
    const validExtensions = [".doc", ".docx", ".pdf"];
    if (!value?.email) {
      error.email = "Email is Required";
    }
    if (!value?.password) {
      error.password = "Password is Required";
    }
    if (!value?.name) {
      error.name = "Name is Required";
    }
    if (!value?.profilename) {
      error.profilename = "profilename is Required";
    }
    if (value?.profilename && !allowedTypes.includes(value.profilename.type)) {
      error.profilename =
        "Invalid file type. Only JPEG, PNG, and GIF images are allowed.";
    }
    if (value?.profilename && value.profilename.size > maxSizeInBytes) {
      error.profilename =
        "File size exceeds the limit. Maximum size allowed is 5MB.";
    }
    if (
      !validMimeTypes.includes(value?.filename.type) ||
      !validExtensions.some((ext) => value?.filename.name.endsWith(ext))
    ) {
      error.filename = "Invalid file type or extension";
    }
    return error;
  };
  const [dataURIList, setDataURIList] = useState({
    filename: null,
    profilename: null,
  });
  useEffect(() => {
    let isMounted = true;

    const convertToDataURI = async (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(file);
      });
    };

    const convertFileToDataURI = async (file) => {
      if (file) {
        try {
          const dataURI = await convertToDataURI(file);
          return dataURI;
        } catch (error) {
          console.error("Error converting file to Data URI:", error);
        }
      }
      return null;
    };

    const updateDataURIList = async () => {
      const promises = [];

      if (formValue?.filename) {
        promises.push(
          convertFileToDataURI(formValue.filename).then((dataURI) => {
            if (isMounted && dataURI) {
              setDataURIList((prevDataURIList) => ({
                ...prevDataURIList,
                filename: dataURI,
              }));
            }
          })
        );
      }

      if (formValue?.profilename) {
        promises.push(
          convertFileToDataURI(formValue.profilename).then((dataURI) => {
            if (isMounted && dataURI) {
              setDataURIList((prevDataURIList) => ({
                ...prevDataURIList,
                profilename: dataURI,
              }));
            }
          })
        );
      }

      await Promise.all(promises);
    };

    updateDataURIList();

    return () => {
      isMounted = false;
    };
  }, [formValue?.filename, formValue?.profilename]);

  const userValue = useCallback(() => {
    const userDatalist = userList.map((user) =>
      user.id === parseInt(id)
        ? {
            ...user,
            email: formValue?.email,
            password: formValue.password,
          }
        : user
    );
    return userDatalist;
  }, [formValue, id, userList]);
  const empValue = useCallback(() => {
    const empList = employeeDetailsList.map((employee) =>
      employee.id === parseInt(id)
        ? {
            ...employee,
            name: formValue.name,
            email: formValue?.email,
            password: formValue.password,
            profilename: dataURIList?.profilename,
            filename: dataURIList?.filename,
          }
        : employee
    );
    return empList;
  }, [formValue, id, dataURIList, employeeDetailsList]);
  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      const dataEmployeeValue = empValue();
      dispatch(employeeListDetails(dataEmployeeValue));

      const dataUserValue = userValue();
      dispatch(userDetails(dataUserValue));

      navigate("/employee");
    }
  }, [
    formError,
    isSubmit,
    formValue,
    id,
    dispatch,
    navigate,
    userValue,
    empValue,
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
              name="profilename"
              onChange={handleChange}
              className="form-control"
            />
            <p className="text-danger">{formError?.profilename}</p>
          </div>
          <div className="mt-3">
            <label htmlFor="password">Doc File:</label>
            <input
              type="file"
              name="filename"
              onChange={handleChange}
              className="form-control"
            />
            <p className="text-danger">{formError?.filename}</p>
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

export default UpdateEmployee;
