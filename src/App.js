import React, { useState } from "react";

import "./App.css";
import DateSelector from "./Components/DateSelector";
import TodoList from "./Components/TodoList";

function App() {
  const [todos, onChangeTodos] = useState([
    { id: Math.random.toString, date: "19/06/2022", content: "Go shopping" },
    { id: Math.random.toString, date: "20/06/2022", content: "Go somewhere 2" },
    { id: Math.random.toString, date: "20/06/2022", content: "Go somewhere" },
    { id: Math.random.toString, date: "23/06/2022", content: "Go cycling" },
  ]);
  const [selectedDate, setSelectedDate] = useState("");
  const [filteredTodos, setFilteredTodos] = useState([]);

  function addTodoHandler(todo) {
    onChangeTodos((prevTodos) => {
      return [todo, ...prevTodos];
    });
    console.log(todos);
    console.log(todo);
  }

  function getFilteredTodos(date, todos) {
    const amendedDate = date.toLocaleString();
    //Subtring gives date in dd/mm/yyyy format
    setSelectedDate(amendedDate.substring(0, 10));
    setFilteredTodos(todos);
  }

  return (
    <div>
      <DateSelector todoList={todos} onSelectDate={getFilteredTodos} />
      <TodoList
        selectedDate={selectedDate}
        filteredTodos={filteredTodos}
        createTodo={addTodoHandler}
      />
    </div>
  );
}

export default App;
