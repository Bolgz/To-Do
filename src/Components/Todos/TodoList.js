import Todo from "./Todo";
import "./TodoList.css";
import CreateModal from "../Modals/CreateModal";

function TodoList(props) {
  //Stores the filtered todos for the currently selected date
  let todos = [];

  //Filters todos and adds them to 'todos' array
  for (let index = 0; index < props.todoList.length; index++) {
    if (props.todoList[index].date === props.selectedDate) {
      todos.push(props.todoList[index].content);
    }
  }

  function getTodoKey(key) {
    props.removeTodo(key);
  }

  //Pass original todo and edited todo up app.js
  function handleTodoEdit(originalTodoContent, newTodoContent) {
    props.getEditedTodo(originalTodoContent, newTodoContent);
  }

  //If no todos for particular day, render 'Found no todos'
  if (todos.length === 0) {
    return (
      <div className="todo_list">
        <h3 className="todo_date">{props.selectedDate}</h3>
        <CreateModal
          createTodo={props.createTodo}
          selectedDate={props.selectedDate}
        />
        <h4 className="no_todos">Found no todos</h4>
      </div>
    );
  }

  return (
    <div className="todo_list">
      <h3 className="todo_date">{props.selectedDate}</h3>
      {/*Modal (pop up) for creating new todos*/}
      <CreateModal
        createTodo={props.createTodo}
        selectedDate={props.selectedDate}
      />
      <div className="todo_container">
        {/*Create a new todo component for each todo in 'todos' array*/}
        {todos.map((todo) => (
          <Todo
            key={Math.random()}
            content={todo}
            getKey={getTodoKey}
            getEditedTodo={handleTodoEdit}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoList;
