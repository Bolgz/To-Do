import React, { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import DateSelector from "../DateSelector/DateSelector";
import TodoList from "../Todos/TodoList";
import "./Home.css";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import UseAnimations from "react-useanimations";
import github from "react-useanimations/lib/github";
import * as utilities from "../Utilities/FireStoreUtilities";

function Home(props) {
  //State for todo list
  const [todos, setTodosState] = useState([]);

  //Currently selected date
  const [selectedDate, setSelectedDate] = useState("");

  /**This hook allows utilities.getTodos() to be called when the page is first rendered
   *  but not when state changes */
  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      const auth = getAuth();
      utilities.getTodos(auth.currentUser.uid).then((todoList) => {
        console.log(todoList);
        setTodosState(todoList);
        return;
      });
    }
    return () => {
      ignore = true;
    };
    //This comment removes warnings for some reason???
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Sets the currently selected date
  function setDate(date) {
    const amendedDate = date.toLocaleString();
    //Subtring gives date in dd/mm/yyyy format
    setSelectedDate(amendedDate.substring(0, 10));
  }

  //Adds a todo to the todo object list
  function addTodoHandler(todo) {
    setTodosState((prevTodos) => {
      //Add todo to firestore database
      utilities.setTodos(getAuth().currentUser.uid, [todo, ...prevTodos]);
      return [todo, ...prevTodos];
    });
  }

  //Function for removing todos
  function removeTodoHandler(todoContent) {
    //Create copy of current state array without the todo to be removed
    const newArray = todos.filter(
      (todo) => todo.content !== todoContent || todo.date !== selectedDate
    );

    //Remove todo to firestore database
    utilities.setTodos(getAuth().currentUser.uid, newArray);

    //Set todo list to new array with removed todo
    setTodosState(newArray);
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

    setTodosState([editedTodoObject, ...newArray]);

    console.log(newArray);
  }

  //Handles sign out
  function signUserOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Signout successful");
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
