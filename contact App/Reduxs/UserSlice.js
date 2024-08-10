import { createSlice, nanoid } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    data: []
  },
  reducers: {
    addUser(state, action) {
      let id = nanoid();
      let person = { id, ...action.payload };
      state.data.push(person);
    },
    updateUser(state, action) {
      const { id, name, surname, mobile } = action.payload;
      const user = state.data.find(user => user.id === id);
      if (user) {
        user.name = name;
        user.surname = surname;
        user.mobile = mobile;
      }
    },
    deleteUser(state, action) {
      state.data = state.data.filter(item => item.id !== action.payload);
    },
    deleteAllUsers(state) {
      state.data = [];
    }
  }
});

export const { addUser, updateUser, deleteUser, deleteAllUsers } = UserSlice.actions;
export default UserSlice.reducer;
