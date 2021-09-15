import { v4 } from "uuid";
const initialState = [];
const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      localStorage.removeItem("notification");
      const newNotifyList = [...state];
      newNotifyList.push({ ...action.payload, id: v4() });
      return newNotifyList;
    case "DELETE_NOTIFICATION":
      return [...state].filter((notify) => notify.id !== action.payload);
    default:
      return state;
  }
};
export default notificationReducer;
