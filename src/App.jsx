import { useState } from "react";
import "./App.css";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo, changeStatusTodo } from "./app/todoSlice";

function App() {
  const dispatch = useDispatch();
  const inputText = useRef();
  const { todos, completedCount, unCompletedCount } = useSelector(
    (state) => state.todos
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = inputText.current.value.trim();
    if (value) {
      dispatch(
        addTodo({
          id: Math.random(),
          text: value,
          // completed: flase,
        })
      );
      console.log(value);
      toast.success("Added successfuly");
    } else {
      toast.error("please, Write something");
    }
    inputText.current.value = "";
  };

  return (
    <div className="wrapper-card">
      <video
        className="bg-video"
        src="./bg-video.mp4 "
        autoPlay
        muted
        loop
      ></video>
      <div className="wrapper-data">
        <h1 className="title">ToDo List - {todos.length}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-input">
            <span className="text">Text:</span>
            <input
              minLength={2}
              maxLength={7}
              placeholder="type here"
              ref={inputText}
              type="text"
            />
          </div>
          <button className="btn-add">ADD</button>
        </form>
        {todos.map((todo) => {
          return (
            <div
              key={todo.id}
              className={`todo ${todo.completed ? "completed" : ""}`}
            >
              <h4 className="todoTex">{todo.text}</h4>
              <div>
                <input
                  type="checkbox"
                  onClick={() => dispatch(changeStatusTodo(todo.id))}
                  checked={todo.completed}
                  readOnly
                />
                <button
                  className="btn-delet"
                  onClick={() => dispatch(removeTodo(todo.id))}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}

        <div className="counter">
          <h4 className="count-comp">Completed: {completedCount}</h4>
          <h4 className="count-uncomp">Uncompleted: {unCompletedCount}</h4>
        </div>
      </div>
    </div>
  );
}

export default App;
