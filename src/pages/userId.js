import React, { useId } from 'react';

const Form = () => {
    const id = useId();
  return (
    <div>
      <label htmlFor={`${id}-name`}>Name:</label>
      <input id={`${id}-name`} type="text" />
    </div>
  );
};

export default Form;


// useId (React 18+)
// Purpose: Generates a unique ID that remains consistent across renders. Useful for accessibility attributes like id and htmlFor.