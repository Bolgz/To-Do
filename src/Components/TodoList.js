import Todo from "./Todo";
import "./TodoList.css";
import CreateModal from "./Modals/CreateModal";

function TodoList(props) {
  if (props.filteredTodos.length === 0) {
    return (
      <div className="todo_list">
        <h3 className="todo_date">{props.selectedDate}</h3>
        <CreateModal createTodo={props.createTodo} />
        <h4 className="no_todos">Found no todos</h4>
      </div>
    );
  }

  return (
    <div className="todo_list">
      <h3 className="todo_date">{props.selectedDate}</h3>
      <CreateModal createTodo={props.createTodo} />
      {props.filteredTodos.map((todo) => (
        <Todo key={Math.random()} content={todo} />
      ))}
    </div>
  );
}

export default TodoList;
