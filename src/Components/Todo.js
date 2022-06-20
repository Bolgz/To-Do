import "./Todo.css";
import { FaTrashAlt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";

function Todo(props) {
  return (
    <div className="todo">
      <p>{props.content}</p>
      <FaTrashAlt className="trash_icon" />
      <FaPencilAlt className="pencil_icon" />
    </div>
  );
}

export default Todo;
