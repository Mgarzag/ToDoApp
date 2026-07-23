import { useState, type FormEvent, type ChangeEvent } from 'react';
import './App.css'

// Define the TypeScript interface for a single To-Do item
interface TodoItem {
  id: string;
  text: string;
  isCompleted: boolean;
}

function App() {

  // Define explicitly typed states for the input string and the items array
  const [inputText, setInputText] = useState<string>('');
  const [todos, setTodos] = useState<TodoItem[]>([]);

    // Create the function to handle adding a new task
    const handleAddTodo = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault(); // Prevents the browser from reloading the page

      // Guard clause: stop execution if input is empty or just spaces
      if (!inputText.trim()) return;

      // Create a new TodoItem object adhering to the interface
      const newTodo: TodoItem = {
        id: crypto.randomUUID(), // Generates a unique secure ID
        text: inputText.trim(),
        isCompleted: false,
      };

      // Update state correctly by spreading previous tasks into a new array
      setTodos((prevTodos) => [...prevTodos, newTodo]);

      // Clear the input text field for the next entry
      setInputText('');

    };

    // Create the function to handle deleting a task
    const deleteTodo = (idToDelete: string): void => {
      // Filter out the item with the matching ID
      // .filter() creates a brand new array, maintaining state immutability
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== idToDelete));
    };

    // Create function to handle checking off tasks
    const toggleTodo = (idToToggle: number): void => {
      // Map through the array and invert the completed boolean for the matching ID
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === idToToggle ? { ...todo, completed: !todo.completed } : todo
        )
      );
    };


    return (
      <div className="padded-container">
        {/* Use a form component to support both 'Enter' key and button clicks */}
        <form onSubmit={handleAddTodo}>
          <input
            type="text"
            value={inputText}
            placeholder="Enter a new task..."
            onChange={(e: ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)}
          />
          <button type="submit">Add Task</button>
        </form>
  
        {/* 5. Render the list */}
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                {/* Checkbox triggers the toggle function */}
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="todo-checkbox"
                />

                {/* Conditional styling applies a line-through if completed */}
                <span className={todo.completed ? 'todo-text completed' : 'todo-text'}>
                  {todo.text}
                </span>

                {/* Pass the item ID into the delete function on click */}
                <button 
                  onClick={() => deleteTodo(todo.id)}
                  className="delete-button"
                >
                Delete
                </button>
                </li>
            ))}
          </ul>
      </div>
    );

}

export default App;
