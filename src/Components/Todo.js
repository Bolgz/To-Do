import "./Todo.css";
import { FaTrashAlt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";

function Todo(props) {
  function getKey() {
    //Get key for deleting todo
  }

  return (
    <div className="todo">
      <p>{props.content}</p>
      <FaTrashAlt className="trash_icon" onClick={getKey} />
      <FaPencilAlt className="pencil_icon" />
    </div>
  );
}

export default Todo;
