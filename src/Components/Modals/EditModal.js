import { FaPencilAlt } from "react-icons/fa";
import React, { useState } from "react";

function EditModal(props) {
  //Is modal currently open
  const [modal, setModal] = useState(false);
  //State for todo title
  const [enteredTitle, setEnteredTitle] = useState(props.todoContent);

  const originalTodoContent = props.todoContent;

  function titleChangeHandler(event) {
    setEnteredTitle(event.target.value);
  }

  const toggleModal = () => {
    setModal(!modal);
  };

  //Pass original todo and edited todo up to Todo.js
  function submitHandler(event) {
    //Stops the form from sending a request to URL. Can handle form submission with JS
    event.preventDefault();
    props.getEditedTodo(originalTodoContent, enteredTitle);
    toggleModal();
  }

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <div>
      {/*Pencil Icon*/}
      <FaPencilAlt className="pencil_icon" onClick={toggleModal} />

      {/*If modal is true return everything after &&*/}
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Edit Todo</h2>
            <form onSubmit={submitHandler}>
              <label>Todo:</label>
              <input
                type="text"
                onChange={titleChangeHandler}
                value={enteredTitle}
              />
              <button type="submit">Edit Todo</button>
            </form>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditModal;
