import React, { useState } from "react";

import "./App.css";
import DateSelector from "./Components/DateSelector";
import TodoList from "./Components/TodoList";

function App() {
  //Test data, maybe use Firebase to store todos?
  const [todos, onChangeTodos] = useState([
    { id: 1, date: "19/06/2022", content: "Go shopping" },
    { id: 2, date: "20/06/2022", content: "Go skiing" },
    { id: 3, date: "20/06/2022", content: "Go somewhere" },
    { id: 4, date: "23/06/2022", content: "Go cycling" },
    { id: 5, date: "25/06/2022", content: "Go boxing" },
    { id: 6, date: "29/06/2022", content: "Go gym" },
    { id: 7, date: "29/06/2022", content: "Go asda" },
  ]);

  //Currently selected date
  const [selectedDate, setSelectedDate] = useState("");

  //Adds a todo to the todo object list
  function addTodoHandler(todo) {
    onChangeTodos((prevTodos) => {
      return [todo, ...prevTodos];
    });
  }

  //Sets the currently selected date
  function setDate(date) {
    const amendedDate = date.toLocaleString();
    //Subtring gives date in dd/mm/yyyy format
    setSelectedDate(amendedDate.substring(0, 10));
  }

  return (
    <div>
      {/*Renders the calendar*/}
      <DateSelector todoList={todos} onSelectDate={setDate} />
      {/*Renders the todo list for the currently selected date*/}
      <TodoList
        selectedDate={selectedDate}
        todoList={todos}
        createTodo={addTodoHandler}
      />
    </div>
  );
}

export default App;
