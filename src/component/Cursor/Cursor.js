import classNames from "classnames";
import React from "react";
import "./Cursor.css";
export default function Cursor({ locationCursor, cursorScale }) {
  const _style = {
    top: `${locationCursor.y}px`,
    left: `${locationCursor.x}px`,
  };
  return (
    <div
      style={_style}
      className={classNames("cursor", {
        "circle-scale": cursorScale,
      })}
    ></div>
  );
}
