import React, { useState, useInsertionEffect } from 'react';

function DynamicStyleComponent() {
  const [color, setColor] = useState('blue');
//   Key Characteristics:
//   Runs Before DOM Mutations: It fires synchronously after rendering but before React makes changes to the DOM.
//   Use Case: Primarily for libraries or tools injecting styles or other DOM elements during rendering.
//   Not for General Side Effects: This hook is not meant for common effects like fetching data or subscriptions—use useEffect or useLayoutEffect for that.
  useInsertionEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .dynamic-style {
        color: ${color};
        font-size: 24px;
        font-weight: bold;
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, [color]);

  return (
    <div>
      <p className="dynamic-style">This text has dynamic styles.</p>
      <button onClick={() => setColor('red')}>Change to Red</button>
      <br/>
      <button onClick={() => setColor('green')}>Change to Green</button>
      <br/>
    </div>
  );
}

export default DynamicStyleComponent;
