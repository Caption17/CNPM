import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import "./Notification.css";
const logoClassName = {
  success: "fas fa-check-circle",
  info: "fas fa-exclamation-circle",
  warn: "fas fa-exclamation-circle",
  error: "fas fa-exclamation-circle",
};
function Notification({ notification, removeNotify }) {
  const [height, setHeight] = useState(0);
  const [intervalId, setInterValId] = useState(null);
  const [exitNotify, setExitNotify] = useState(false);
  const delay = notification.duration / 100;
  const close = useRef(false);
  useEffect(() => {
    const id = setInterval(() => {
      setHeight((heightNew) => {
        if (heightNew >= 100) {
          clearInterval(intervalId);
          close.current = true;
        }
        return heightNew + 1;
      });
    }, delay);
    setInterValId(id);
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);
  useEffect(() => {
    if (close.current) {
      if (intervalId) {
        clearInterval(intervalId);
      }
      setTimeout(() => {
        removeNotify(notification.id);
      }, 1000);
    }
  });
  const handleCleanTimer = () => {
    clearInterval(intervalId);
  };
  const handleCreateTimer = () => {
    const id = setInterval(() => {
      setHeight((heightNew) => {
        if (heightNew >= 100) {
          clearInterval(intervalId);
          close.current = true;
        }
        return heightNew + 1;
      });
    }, delay);
    setInterValId(id);
  };
  const handleCloseNotify = () => {
    close.current = true;
    setExitNotify((exitNotify) => !exitNotify);
  };
  return (
    <div
      className={classNames(
        `notification-item notification-item-${notification.type}`,
        {
          "notification-hide-zoom-out": close.current,
        }
      )}
      onMouseEnter={handleCleanTimer}
      onMouseLeave={handleCreateTimer}
    >
      <div
        className={`notification-logo notification-logo--${notification.type}`}
      >
        <i className={logoClassName[notification.type]}></i>
      </div>
      <div className="notification-body">
        <h3 className="notification-title">{notification.title}</h3>
        <span className="notification-message">{notification.message}</span>
      </div>
      <div className="notification-close">
        <i className="fas fa-times" onClick={handleCloseNotify}></i>
      </div>
      <div className="notification-border">
        <div
          style={{ height: `${height}%` }}
          className="notification-border--countdown"
        ></div>
      </div>
    </div>
  );
}
export default React.memo(Notification);
