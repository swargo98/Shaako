import React from 'react';
const Trigger = ({ triggerText, buttonRef, showModal }) => {
  return (
    <button
      ref={buttonRef}
      onClick={showModal}

      className="btn btn-primary" type="button"
      style={{background: "rgb(54,247,22)"}}
    >
      {triggerText}
    </button>
  );
};
export default Trigger;
