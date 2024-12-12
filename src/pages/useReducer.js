import React, { useReducer } from "react";

const Counter = () => {
  // Initialize state and reducer
  const initialState = { count: 0 };

  // Define the reducer function
const counterReducer = (state, action) => {
    switch (action.type) {
      case "INCREMENT":
        return { count: state.count + 1 };
      case "DECREMENT":
        return { count: state.count - 1 };
      case "RESET":
        return { count: 0 };
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  };

  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div style={{ display: "flex", gap: "50px" , textAlign: "center", marginTop: "50px", justifyContent: "center" }}>
      <h1>Counter: {state.count}</h1>
      <button onClick={() => dispatch({ type: "INCREMENT", data: 1 })}>Increment</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>Decrement</button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
    </div>
  );
};

export default Counter;

// Why Use useReducer?
// Complex State Management: Handles state logic that involves multiple sub-values or transitions.
// Predictability: The reducerFunction makes state updates predictable and easy to debug.
// Scalability: Easier to manage than useState in large-scale applications.
// This approach is commonly used in situations such as form handling, managing a to-do list, or complex UI states.

