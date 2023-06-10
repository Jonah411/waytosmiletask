import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userListList: [
    {
      id: 1,
      roll: 1,
      email: "jonah@gmail.com",
      password: "test123",
    },
  ],
  user: {
    id: 1,
    roll: 1,
    email: "jonah@gmail.com",
    password: "test123",
  },
  navList: [
    { id: 1, roll: [1], title: "Admin", pathName: "admin" },
    { id: 2, roll: [1, 2], title: "Manager", pathName: "manager" },
    { id: 3, roll: [1, 2, 3], title: "Employee", pathName: "employee" },
  ],
  managerList: [],
  employeeList: [],
};

const interviewadmin = createSlice({
  name: "interviewadmin",
  initialState,
  reducers: {
    authloginDetails: (state, { payload }) => {
      state.user = payload;
    },
    logoutDetails: (state, { payload }) => {
      state.user = null;
    },
    userListDetails: (state, { payload }) => {
      state.userListList = payload;
      state.managerList = payload
        .filter((user) => user.roll === 2)
        .map((manager) => ({
          ...manager,
          name: "",
          fileName: "",
        }));
      state.employeeList = payload
        .filter((user) => user.roll === 3)
        .map((employee) => ({
          ...employee,
          name: "",
          filename: "",
          profilename: "",
        }));
    },
    userDetails: (state, { payload }) => {
      state.userListList = payload;
    },
    managerListDetails: (state, { payload }) => {
      state.managerList = payload;
    },
    employeeListDetails: (state, { payload }) => {
      console.log(payload);
      state.employeeList = payload;
    },
  },
});
export const {
  authloginDetails,
  logoutDetails,
  userListDetails,
  managerListDetails,
  employeeListDetails,
  userDetails,
} = interviewadmin.actions;
export const getLoginUser = (state) => state?.interviewadmin?.user;
export const getUserList = (state) => state?.interviewadmin?.userListList;
export const getNavDetailsList = (state) => state?.interviewadmin?.navList;
export const getManagerDetailsList = (state) =>
  state?.interviewadmin?.managerList;
export const getEmployeeDetailsList = (state) => {
  console.log(state?.interviewadmin?.employeeList);
  return state?.interviewadmin?.employeeList;
};
export default interviewadmin.reducer;
