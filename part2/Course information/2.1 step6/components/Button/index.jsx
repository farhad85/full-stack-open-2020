import React from "react";

function Button({ setFn, children }) {
  return <button onClick={() => setFn((x) => x + 1)}>{children}</button>;
}

export default Button;
