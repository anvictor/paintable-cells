import React, { useState, useEffect, useRef } from "react";
import data from "./data.json";
import PaintableCell from "./PaintableCell";
const daysOfWeek = data.daysOfWeek;
const hoursOfDay = Array.from({ length: 24 }, (_, i) => i);

const PaintableTable = ({ getStatus }) => {
  const [paintThisArea, setPaintThisArea] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [startCell, setStartCell] = useState({ day: null, hour: null });
  const [finishCell, setFinishCell] = useState({ day: null, hour: null });
  const [newColor, setNewColor] = useState("white");
  const [unPaintThisArea, setUnPaintThisArea] = useState([]);
  const prevPaintThisAreaRef = useRef(paintThisArea);

  const handleMouseDown = ({ day, hour, newColor }) => {
    setNewColor(newColor);
    setDragging(true);
    setStartCell({ day, hour });
  };

  const handleMouseEnter = ({ day, hour }) => {
    if (dragging) {
      setFinishCell({ day, hour });
    }
  };

  const checkStatus = () => {
    const PaintableTable = document.getElementById("PaintableTable");

    const body = PaintableTable.children[1].children;
    const status = [];
    for (let d = 0; d < body.length; d++) {
      const day = body[d].cells;
      let dayArr = [];
      dayArr.push(body[d].cells[0].innerText);
      for (let h = 1; h < day.length; h++) {
        const hour = body[d].cells[h].className === "cell_white" ? null : h - 1;
        dayArr.push(hour);
      }
      status.push(dayArr);
    }

    return status;
  };

  const handleMouseUp = () => {
    setDragging(false);
    setStartCell({ day: null, hour: null });
    setFinishCell({ day: null, hour: null });
    if (finishCell.day === null && finishCell.hour === null) {
      setPaintThisArea([]);
    }
  };

  const getAreaPaint = () => {
    const paintingArea = [];

    if (
      startCell.day !== null &&
      finishCell.day !== null &&
      startCell.hour !== null &&
      finishCell.hour !== null
    ) {
      const minDay =
        startCell.day < finishCell.day ? startCell.day : finishCell.day;
      const maxDay =
        startCell.day < finishCell.day ? finishCell.day : startCell.day;
      const minHour =
        startCell.hour < finishCell.hour ? startCell.hour : finishCell.hour;
      const maxHour =
        startCell.hour < finishCell.hour ? finishCell.hour : startCell.hour;
      for (let day = minDay; day <= maxDay; day++) {
        for (let hour = minHour; hour <= maxHour; hour++) {
          paintingArea.push({
            day,
            hour,
            newColor,
          });
        }
      }
      setPaintThisArea(paintingArea);
    }
  };

  const getDifference = (oldArray, newArray) => {
    const difference = oldArray.filter((oldItem) => {
      return !newArray.some(
        (newItem) =>
          newItem.day === oldItem.day &&
          newItem.hour === oldItem.hour &&
          newItem.newColor === oldItem.newColor
      );
    });
    return difference;
  };

  useEffect(() => {
    if (dragging) {
      getAreaPaint();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finishCell]);

  useEffect(() => {
    const difference = getDifference(
      prevPaintThisAreaRef.current,
      paintThisArea
    );
    prevPaintThisAreaRef.current = paintThisArea;
    setUnPaintThisArea(difference);
  }, [paintThisArea]);

  useEffect(() => {
    if (!dragging) {
      setTimeout(
        () => getStatus(checkStatus()),

        200
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragging]);

  return (
    <table
      id="PaintableTable"
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
    >
      <thead>
        <tr>
          <th>day\hour</th>
          {hoursOfDay.map((hour) => (
            <th key={hour}>{hour}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {daysOfWeek.map((day, rowIndex) => (
          <tr key={day}>
            <td>{day}</td>
            {hoursOfDay.map((_, colIndex) => (
              <PaintableCell
                key={`${rowIndex}:${colIndex}`}
                color={newColor}
                day={rowIndex}
                hour={colIndex}
                onMouseDown={handleMouseDown}
                onMouseEnter={handleMouseEnter}
                dragging={dragging}
                paintIt={paintThisArea}
                clearIt={unPaintThisArea}
                startCell={startCell}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PaintableTable;
