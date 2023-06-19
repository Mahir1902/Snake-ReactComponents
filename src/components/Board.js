// import { Component } from "react";
// import classes from "./Board.module.css";
// import Food from "./Food";
// import Snake from "./Snake";

// const getRandomCoordinate = () => {
//   let min = 1;
//   let max = 98;
//   let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
//   let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;

//   return [x, y];
// };

// const initialState = {
//   snakeBody: [
//     [0, 0],
//     [2, 0],
//     [4, 0],
//   ],
//   foodPos: getRandomCoordinate(),
//   direction: "RIGHT",
//   speed: 200,
// };

// class Board extends Component {
//   state = initialState;

//   componentDidMount() {
//     this.interval = setInterval(this.moveSnake, this.state.speed);
//     document.onkeydown = this.handleKeyDown;
//   }

//   componentDidUpdate(prevProp, prevState) {
//     this.checkIfOutOfBounds();
//     this.checkIfCollasped();
//     this.checkIfFoodIsEaten();
//     if (this.state.speed !== prevState.speed) {
//       clearInterval(this.interval);
//       this.interval = setInterval(this.moveSnake, this.state.speed);
//     }
//   }

//   componentWillUnmount() {
//     clearInterval(this.interval);
//   }

//   handleKeyDown = (e) => {
//     switch (e.key) {
//       case "ArrowUp":
//         if (this.state.direction === "DOWN") return;
//         this.setState({ direction: "UP" });
//         break;
//       case "ArrowDown":
//         if (this.state.direction === "UP") return;
//         this.setState({ direction: "DOWN" });
//         break;
//       case "ArrowLeft":
//         if (this.state.direction === "RIGHT") return;
//         this.setState({ direction: "LEFT" });
//         break;
//       case "ArrowRight":
//         if (this.state.direction === "LEFT") return;
//         this.setState({ direction: "RIGHT" });
//         break;
//       default:
//         return;
//     }
//   };

//   moveSnake = () => {
//     let dots = [...this.state.snakeBody];
//     let head = dots[dots.length - 1];

//     switch (this.state.direction) {
//       case "RIGHT":
//         head = [head[0] + 2, head[1]];
//         console.log("RIGHT");
//         break;
//       case "LEFT":
//         head = [head[0] - 2, head[1]];
//         break;
//       case "UP":
//         head = [head[0], head[1] - 2];
//         break;
//       case "DOWN":
//         head = [head[0], head[1] + 2];
//         break;
//       default:
//     }
//     dots.push(head);
//     dots.shift();
//     this.setState({ snakeBody: dots });
//   };

//   checkIfOutOfBounds = () => {
//     let head = this.state.snakeBody[this.state.snakeBody.length - 1];

//     if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
//       this.gameOver();
//     }
//   };

//   checkIfCollasped = () => {
//     let snake = [...this.state.snakeBody];
//     let head = snake[snake.length - 1];
//     snake.pop();
//     snake.forEach((dot) => {
//       if (head[0] === dot[0] && head[1] === dot[1]) {
//         this.gameOver();
//       }
//     });
//   };

//   enlargeSnake = () => {
//     let newSnake = [...this.state.snakeBody];
//     newSnake.unshift([]);
//     this.setState({
//       snakeBody: newSnake,
//     });
//   };

//   increaseSpeed() {
//     if (this.state.speed > 10) {
//       this.setState({
//         speed: this.state.speed - 10,
//       });
//     }
//   }

//   gameOver = () => {
//     alert(`Game Over! Snake length is: ${this.state.snakeBody.length}`);
//     this.setState(initialState);
//   };

//   checkIfFoodIsEaten = () => {
//     let head = this.state.snakeBody[this.state.snakeBody.length - 1];

//     if (
//       head[0] === this.state.foodPos[0] &&
//       head[1] === this.state.foodPos[1]
//     ) {
//       this.setState({ foodPos: getRandomCoordinate() });
//       this.enlargeSnake();
//       this.increaseSpeed();
//     }
//   };

//   render() {
//     return (
//       <div className={classes.board}>
//         <Snake snakeBody={this.state.snakeBody} />
//         <Food foodPos={this.state.foodPos} />
//       </div>
//     );
//   }
// }

// export default Board;


import React, { useState, useEffect, useCallback } from "react";
import classes from "./Board.module.css";
import Food from "./Food";
import Snake from "./Snake";

const getRandomCoordinate = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

const initialState = {
  snakeBody: [
    [0, 0],
    [2, 0],
    [4, 0],
  ],
  foodPos: getRandomCoordinate(),
  direction: "RIGHT",
  speed: 200,
};

const Board = ({score, setScore}) => {
  const [gameState, setGameState] = useState(initialState);
  const [isPaused, setIsPaused] = useState(false)

  const moveSnake = useCallback(() => {

    if(isPaused) return

    let dots = [...gameState.snakeBody];
    let head = dots[dots.length - 1];

    switch (gameState.direction) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
      default:
    }

    const checkIfOutOfBounds = () => {
      return (
        head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0
      );
    };

    const checkIfCollasped = () => {
      return gameState.snakeBody.some(
        (dot) => head[0] === dot[0] && head[1] === dot[1]
      );
    };

    const checkIfFoodIsEaten = () => {
      return (
        head[0] === gameState.foodPos[0] &&
        head[1] === gameState.foodPos[1]
      );
    };

    const gameOver = () => {
      alert(`Game Over! Snake length is: ${gameState.snakeBody.length}`);
      setGameState(initialState);
    };

    if (checkIfOutOfBounds() || checkIfCollasped()) {
      return gameOver();
    }

    if (checkIfFoodIsEaten()) {
      dots = [...dots, head];  // Add a new block to the snake's body
      let newSpeed = gameState.speed > 10 ? gameState.speed - 10 : 10;

      setScore(score + 1)

      return setGameState({
        ...gameState,
        snakeBody: dots,
        foodPos: getRandomCoordinate(),
        speed: newSpeed,
      });
    }

    dots.shift();
    dots.push(head);
    setGameState({ ...gameState, snakeBody: dots });
  }, [gameState, isPaused,score,setScore]);

  const handleKeyDown = useCallback(
    (e) => {
      e.preventDefault()
      let direction = gameState.direction;

      switch (e.key) {
        case "ArrowUp":
          if (direction === "DOWN") return;
          direction = "UP";
          break;
        case "ArrowDown":
          if (direction === "UP") return;
          direction = "DOWN";
          break;
        case "ArrowLeft":
          if (direction === "RIGHT") return;
          direction = "LEFT";
          break;
        case "ArrowRight":
          if (direction === "LEFT") return;
          direction = "RIGHT";
          break;
        default:
          return;
      }

      setGameState({ ...gameState, direction });
    },
    [gameState]
  );

  useEffect(() => {
    const interval = setInterval(moveSnake, gameState.speed);
    document.onkeydown = handleKeyDown;

    return () => {
      clearInterval(interval);
    };
  }, [moveSnake, gameState.speed, handleKeyDown]);

  return (
    <div className={classes.board}>
      <Snake snakeBody={gameState.snakeBody} />
      <Food foodPos={gameState.foodPos} />
      <button className={classes.pause} onClick={()=> setIsPaused(!isPaused)}>{isPaused ? 'Resume' : 'Pause'}</button>
    </div>
  );
};

export default Board;



