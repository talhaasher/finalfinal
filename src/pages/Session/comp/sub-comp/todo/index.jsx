import classes from "./index.module.css";
import { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTodos([...todos, inputValue]);
    setInputValue('');
  }

  function deleteTodo(index) {
    // Create a copy of todos excluding the todo at the specified index
    const updatedTodos = [...todos.slice(0, index), ...todos.slice(index + 1)];
    setTodos(updatedTodos);
  }

  return (
    <div className={classes.container}>
      <form>
        <input type='text' value={inputValue} onChange={handleChange} />
        <button onClick={handleSubmit}>Add</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
