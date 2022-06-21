import "./Todo.css";
import EditModal from "./Modals/EditModal";
import UseAnimations from "react-useanimations";
import trash2 from "react-useanimations/lib/trash2";

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
      <EditModal todoContent={props.content} getEditedTodo={handleTodoEdit} />
      <UseAnimations
        animation={trash2}
        size={28}
        className="trash_icon"
        onClick={getKey}
      />
    </div>
  );
}

export default Todo;
