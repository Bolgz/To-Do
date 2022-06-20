import { FaPlusSquare } from "react-icons/fa";
import React, { useState } from "react";
import "./CreateModal.css";

function CreateModal(props) {
  const [modal, setModal] = useState(false);
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  function titleChangeHandler(event) {
    setEnteredTitle(event.target.value);
  }

  function dateChangeHandler(event) {
    setEnteredDate(event.target.value);
  }

  const toggleModal = () => {
    setModal(!modal);
  };

  function submitHandler(event) {
    //Stops the form from sending a request to URL. Can handle form submission with JS
    event.preventDefault();
    const dateObj = new Date(enteredDate).toLocaleString();

    const newTodo = {
      id: Math.random(),
      date: dateObj.substring(0, 10),
      content: enteredTitle,
    };

    //Resets inputs - a two-way binding has been set up
    setEnteredDate("");
    setEnteredTitle("");

    props.createTodo(newTodo);
  }

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <div>
      <FaPlusSquare className="create_icon" onClick={toggleModal} />

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Create Todo</h2>
            <form onSubmit={submitHandler}>
              <label>Todo:</label>
              <input
                type="text"
                onChange={titleChangeHandler}
                value={enteredTitle}
              />
              <label>Date:</label>
              <input
                type="date"
                onChange={dateChangeHandler}
                value={enteredDate}
              />
              <button type="submit">Add Todo</button>
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

export default CreateModal;
