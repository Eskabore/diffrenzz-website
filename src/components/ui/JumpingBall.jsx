import React from "react";

const JumpingBall = ({ width = 0 }) => (
  <div
    className="ball-container"
    style={{ width: `calc(${width}px + 5rem)`, top: "-0.6em" }}
  >
    <div className="ball">
      <div className="ball-shadow" />
    </div>
  </div>
);

export default JumpingBall;
