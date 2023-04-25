import React, { useEffect, useState } from "react";

const PaintableCell = ({
  color: colorData,
  day,
  hour,
  onMouseDown,
  onMouseEnter,
  dragging,
  paintIt,
  clearIt,
  startCell,
}) => {
  const [color, setColor] = useState(colorData);
  const [colorClass, setColorClass] = useState(`cell_${color}`);
  const handleMouseDown = () => {
    const newColor = color === "red" ? "white" : "red";
    setColor(newColor);
    setColorClass(`cell_${newColor}`);
    onMouseDown({ day, hour, newColor });
  };
  const handleMouseEnter = () => {
    if (dragging) {
      onMouseEnter({ day, hour, oldColor: color });
    }
  };

  useEffect(() => {
    if (paintIt) {
      for (let i = 0; i < paintIt.length; i++) {
        if (dragging && paintIt[i].day === day && paintIt[i].hour === hour) {
          setColorClass(`cell_${paintIt[i].newColor}_${color}`);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paintIt]);

  useEffect(() => {
    if (clearIt) {
      for (let i = 0; i < clearIt.length; i++) {
        if (clearIt[i].day === day && clearIt[i].hour === hour) {
          setColorClass(`cell_${color}`);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearIt]);

  useEffect(() => {
    if (!dragging) {
      for (let i = 0; i < paintIt.length; i++) {
        if (paintIt[i].day === day && paintIt[i].hour === hour) {
          setColorClass(`cell_${paintIt[i].newColor}`);
          setColor(paintIt[i].newColor);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragging]);

  return (
    <td
      id={`ID_${day}:${hour}`}
      className={colorClass}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
    ></td>
  );
};

export default PaintableCell;
