import classNames from "classnames";
import React, { useState } from "react";
import Cursor from "../Cursor/Cursor";
import "./Footer.css";
export default function Footer() {
  const [cursor, setCursor] = useState(false);
  const [locationCursor, setLocationCursor] = useState({});
  const [textChange, setTextChange] = useState(false);
  const handleShowCursor = (event) => {
    setLocationCursor({
      x: event.pageX,
      y: event.pageY,
    });
    setCursor(true);
  };
  const handleHideCursor = () => {
    setCursor(false);
  };
  const handleChangeText = () => {
    setTextChange(true);
  };
  const handleTextReset = () => {
    setTextChange(false);
  };
  return (
    <div
      className="footer"
      onMouseMove={handleShowCursor}
      onMouseLeave={handleHideCursor}
    >
      <div className="footer-bg">
        <h2
          className={classNames({ "text-hover": textChange })}
          onMouseEnter={handleChangeText}
          onMouseLeave={handleTextReset}
        >
          CẢM ƠN VÀ HẸN GẶP LẠI LẦN SAU
        </h2>
      </div>
      {cursor && (
        <Cursor locationCursor={locationCursor} cursorScale={textChange} />
      )}
    </div>
  );
}
