export const createNotification = (notify) => {
  return {
    type: "SHOW_NOTIFICATION",
    payload: notify,
  };
};
export const deleteNotification = (id) => {
  return {
    type: "DELETE_NOTIFICATION",
    payload: id,
  };
};
