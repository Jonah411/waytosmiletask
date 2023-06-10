import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserList,
  userListDetails,
} from "../../feature/loginReducer/loginReducer";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
  const { id } = useParams();
  const userList = useSelector(getUserList);
  const [userListData, setuserListData] = useState(userList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const init = {
    email: "",
    password: "",
    roll: 1,
  };
  const [formValue, setFormValue] = useState(init);
  const [isSubmit, setIssubmit] = useState(false);
  const [formError, setFormError] = useState({});
  const handleUser = useCallback(() => {
    setuserListData(userList);
    const selectedUser = userList?.find((user) => user?.id === parseInt(id));
    if (selectedUser) {
      setFormValue({
        email: selectedUser?.email,
        password: selectedUser?.password,
        roll: selectedUser?.roll,
      });
    }
  }, [userList, id]);

  useEffect(() => {
    handleUser();
  }, [handleUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "roll") {
      setFormValue({ ...formValue, [name]: parseInt(value) });
    } else {
      setFormValue({ ...formValue, [name]: value });
    }
  };
  const handleSubmit = (e) => {
    console.log("hhhh");
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
      const list = userListData?.map((user) =>
        user.id === parseInt(id) ? { ...user, ...formValue } : user
      );
      setIssubmit(false);
      dispatch(userListDetails(list));
      navigate("/admin");
    }
  }, [formError, userListData, formValue, isSubmit, id, dispatch, navigate]);
  return (
    <div className="container m-5">
      <div className="card">
        <form className="p-3">
          <div className="mt-3">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={formValue?.email}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mt-3">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={formValue?.password}
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

export default UpdateUser;
