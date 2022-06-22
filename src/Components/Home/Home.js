import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import DateSelector from "../DateSelector/DateSelector";
import TodoList from "../Todos/TodoList";
import "./Home.css";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import UseAnimations from "react-useanimations";
import github from "react-useanimations/lib/github";

function Home(props) {
  //Test data, maybe use Firebase to store todos?
  const [todos, onChangeTodos] = useState([
    { id: 1, date: "19/06/2022", content: "Go shopping" },
    { id: 2, date: "20/06/2022", content: "Go skiing" },
    { id: 3, date: "21/06/2022", content: "Go somewhere" },
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

  //Remove for removing todos
  function removeTodoHandler(todoContent) {
    //Create copy of current state array without the todo to be removed
    const newArray = todos.filter(
      (todo) => todo.content !== todoContent || todo.date !== selectedDate
    );

    //Set todo list to new array with removed todo
    onChangeTodos(newArray);
  }

  //Handles todo edits
  function handleTodoEdit(originalTodoContent, newTodoContent) {
    let originalTodoObject = {};

    //Create copy of current state array without the todo being edited
    todos.forEach((todo) => {
      if (todo.content === originalTodoContent) {
        originalTodoObject = todo;
      }
    });

    let editedTodoObject = {
      id: Math.random(),
      date: originalTodoObject.date,
      content: newTodoContent,
    };

    //Create copy of current state array without the todo to be edited
    const newArray = todos.filter(
      (todo) =>
        todo.content !== originalTodoContent || todo.date !== selectedDate
    );

    onChangeTodos([editedTodoObject, ...newArray]);

    console.log(newArray);
  }

  //Handles sign out
  function signUserOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Signout successful");
        props.handleLogout();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <div className="header">
        <h1 className="title">Todo App!</h1>
      </div>
      <AwesomeButton
        type="primary"
        onPress={signUserOut}
        className="signout-button"
      >
        Sign Out
      </AwesomeButton>
      {/*Renders the calendar*/}
      <DateSelector todoList={todos} onSelectDate={setDate} />
      {/*Renders the todo list for the currently selected date*/}
      <TodoList
        selectedDate={selectedDate}
        todoList={todos}
        createTodo={addTodoHandler}
        removeTodo={removeTodoHandler}
        getEditedTodo={handleTodoEdit}
      />

      <div className="footer">
        <a href="https://github.com/Bolgz">
          <p className="copyrighttext">Marco Freemantle</p>
          <UseAnimations
            animation={github}
            size={40}
            className="github_icon"
            fillColor="White"
            strokeColor="White"
            autoplay={true}
            loop={true}
          />
        </a>
      </div>
    </div>
  );
}

export default Home;