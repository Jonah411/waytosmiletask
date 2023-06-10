import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoginUser,
  getUserList,
  userListDetails,
} from "../../feature/loginReducer/loginReducer";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const user = useSelector(getLoginUser);
  const userList = useSelector(getUserList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const init = {
    email: "",
    password: "",
    roll: user?.roll === 1 ? 1 : 3,
  };
  const [userData, setuserData] = useState(userList);
  const [formValue, setFormValue] = useState(init);
  const [isSubmit, setIssubmit] = useState(false);
  const [formError, setFormError] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "roll") {
      setFormValue({ ...formValue, [name]: parseInt(value) });
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
    if (!value.email) {
      error.email = "Email is required!";
    }
    if (!value?.password) {
      error.password = "Password is required";
    }
    if (!value?.roll) {
      error.roll = "User roll is required";
    }
    return error;
  };
  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      const id = userData?.length ? userData[userData?.length - 1].id + 1 : 1;
      const details = { id, ...formValue };
      console.log("details", details);
      const array = [...userData, details];
      setuserData(array);
      setIssubmit(false);
      dispatch(userListDetails(array));
      navigate(`/`);
    }
  }, [formError, userData, formValue, isSubmit, dispatch, navigate]);
  return (
    <div className="container m-5">
      <div className="card">
        <form className="p-3">
          <div className="mt-3">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mt-3">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mt-3">
            <label htmlFor="roll">User Roll:</label>
            <select
              className="form-select"
              name="roll"
              onChange={handleChange}
              value={parseInt(formValue?.roll)}
              disabled={user?.roll !== 1 && true}
            >
              <option value={1}>Admin</option>
              <option value={2}>Manager</option>
              <option value={3}>Employee</option>
            </select>
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

export default AddUser;
