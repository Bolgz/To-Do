import "./Todo.css";
import { FaTrashAlt } from "react-icons/fa";
import EditModal from "./Modals/EditModal";

function Todo(props) {
  //The prop content acts as a key since 'key' cannot be passed as prop
  function getKey() {
    props.getKey(props.content);
  }

  //Pass original todo and edited todo up todolist.js
  function handleTodoEdit(originalTodoContent, newTodoContent) {
    props.getEditedTodo(originalTodoContent, newTodoContent);
  }

  return (
    <div className="todo">
      <p>{props.content}</p>
      <FaTrashAlt className="trash_icon" onClick={getKey} />
      <EditModal todoContent={props.content} getEditedTodo={handleTodoEdit} />
    </div>
  );
}

export default Todo;
