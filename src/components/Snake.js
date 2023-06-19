import React from "react";
import classes from "./Snake.module.css";

const Snake = (props) => {
  return (
    <>
      {props.snakeBody.map((dot, i) => {
        return (
          <div
            className={classes.snake}
            key={i}
            style={{ left: `${dot[0]}%`, top: `${dot[1]}%` }}
          ></div>
        );
      })}
    </>
  );
};

export default Snake;
