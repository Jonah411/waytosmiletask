import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  authloginDetails,
  getUserList,
} from "../feature/loginReducer/loginReducer";

const Login = () => {
  const userList = useSelector(getUserList);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const init = {
    email: "",
    password: "",
  };
  const [formValue, setFormValue] = useState(init);
  const [isSubmit, setIssubmit] = useState(false);
  const [formError, setFormError] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const handleClick = (e) => {
    e.preventDefault();
    setIssubmit(true);
    setFormError(validation(formValue));
  };
  const validation = (value) => {
    const error = {};
    if (!value.email) {
      error.email = "Email Field is required";
    }
    if (!value.password) {
      error.password = "password Field is required";
    }
    return error;
  };
  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      const userDataList = userList?.map((user) => {
        if (
          user?.email === formValue?.email &&
          user?.password === formValue?.password
        ) {
          const userData = { id: user?.id, roll: user?.roll, ...formValue };
          dispatch(authloginDetails(userData));
          return user;
        } else {
          return null;
        }
      });
      if (userDataList.some((user) => user !== null)) {
        setIssubmit(false);
        toast.success(`Login Successfully`, {
          // Toast configuration options
        });
        navigate("/");
      } else {
        setIssubmit(false);
        toast.error(`Email or Password incorrect!`, {
          // Toast configuration options
        });
      }
    }
  }, [formError, isSubmit, formValue, userList, dispatch, navigate]);

  return (
    <div className="container">
      <div className="m-5 card p-3">
        <div className="mt-3">
          <input
            className="form-control p-2"
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <p className="text-danger">{formError?.email}</p>
        </div>
        <div className="mt-3">
          <input
            className="form-control p-2"
            name="password"
            type="password"
            placeholder="Pasword"
            onChange={handleChange}
          />
          <p className="text-danger">{formError?.password}</p>
        </div>
        <div className="mt-3">
          <button className="btn btn-primary" onClick={(e) => handleClick(e)}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
