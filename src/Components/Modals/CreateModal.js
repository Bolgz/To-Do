import React, { useState } from "react";
import "./CreateModal.css";
import UseAnimations from "react-useanimations";
import plusToX from "react-useanimations/lib/plusToX";

function CreateModal(props) {
  //Is modal currently open
  const [modal, setModal] = useState(false);
  //State for todo title
  const [enteredTitle, setEnteredTitle] = useState("");

  function titleChangeHandler(event) {
    setEnteredTitle(event.target.value);
  }

  const toggleModal = () => {
    setEnteredTitle("");
    setModal(!modal);
  };

  function submitHandler(event) {
    //Stops the form from sending a request to URL. Can handle form submission with JS
    event.preventDefault();

    //New todo object
    const newTodo = {
      id: Math.random(),
      date: props.selectedDate,
      content: enteredTitle,
    };

    //Resets inputs - a two-way binding has been set up
    setEnteredTitle("");

    //Passes new todo up to 'todolist.js' which is passed up to 'app.js'
    props.createTodo(newTodo);
  }

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <div>
      {/* + Icon*/}
      <UseAnimations
        animation={plusToX}
        size={28}
        speed={0}
        className="pulse"
        onClick={toggleModal}
      />

      {/*If modal is true return everything after &&*/}
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Create Todo</h2>
            <form onSubmit={submitHandler}>
              <input
                type="text"
                onChange={titleChangeHandler}
                value={enteredTitle}
                className="todo_input"
              />
              <button type="submit" className="submit_button">
                Add Todo
              </button>
            </form>

            {/* Close modal icon*/}
            <UseAnimations
              animation={plusToX}
              size={28}
              speed={0}
              className="close-modal"
              onClick={toggleModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateModal;
