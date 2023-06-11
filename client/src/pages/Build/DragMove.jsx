import React from "react";
import { useState } from "react";

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

export default function DragMove(props) {
  const [styles, setStyles] = useState({
    left: Math.floor(Math.random() * 75) + "%",
    top: Math.floor(Math.random() * 75) + "%",
  });
  const [diffPos, setDiffPos] = useState({ diffX: 0, diffY: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const dragStart = (e) => {
    const boundingRect = e.currentTarget.getBoundingClientRect();

    setDiffPos({
      diffX: e.screenX - boundingRect.left,
      diffY: e.screenY - boundingRect.top,
    });

    setIsDragging(true);

    return true;
  };

  const dragging = (e) => {
    const left = e.screenX - diffPos.diffX;
    const top = e.screenY - diffPos.diffY;

    setStyles({ left: left, top: top });
  };

  const dragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="draggable"
      style={{
        ...styles,
        position: "absolute",
      }}
      onDragStart={(e) => dragStart(e)}
      onDragEnd={(e) => dragging(e)}
      draggable={true}
    >
      {props.children}
    </div>
  );
}
