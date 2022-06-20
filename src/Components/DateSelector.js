import Calendar from "react-calendar";
import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import "./DateSelector.css";

function DateSelector(props) {
  //Sets the current calnedar value (date)
  const [value, onChange] = useState(new Date());

  //Shows a red dot on the days that have scheduled events
  function showTodoIcon(date) {
    for (let index = 0; index < props.todoList.length; index++) {
      if (props.todoList[index].date === date.toLocaleDateString()) {
        return <div className="red_circle" />;
      }
    }
  }

  //Prints the scheduled events for that day, if any
  function onSelectDay(date) {
    let todos = [];

    for (let index = 0; index < props.todoList.length; index++) {
      if (props.todoList[index].date === date.toLocaleDateString()) {
        todos.push(props.todoList[index].content);
      }
    }
    props.onSelectDate(date, todos);
  }

  /**This hook allows onSelectDay to be called when the page is first rendered
   *  but not when state changes */
  useEffect(() => {
    let ignore = false;

    if (!ignore) onSelectDay(value);
    return () => {
      ignore = true;
    };
    //This comment removes warnings for some reason???
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Calendar
        onChange={onChange}
        onClickDay={onSelectDay}
        value={value}
        className="calendar"
        tileContent={({ activeStartDate, date, view }) => showTodoIcon(date)}
      />
    </div>
  );
}

export default DateSelector;
