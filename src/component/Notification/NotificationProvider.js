import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deleteNotification } from "../../actions/Notification";
import Notification from "./Notification";
import "./Notification.css";

export default function NotificationProvider() {
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const handleRemoveNotify = (id) => {
    dispatch(deleteNotification(id));
  };
  return (
    <>
      <div id="notification">
        {notifications.length !== 0 &&
          notifications.map((notify) => (
            <Notification
              key={notify.id}
              notification={notify}
              removeNotify={handleRemoveNotify}
            />
          ))}
      </div>
    </>
  );
}
