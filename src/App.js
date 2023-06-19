
import Board from "./components/Board";

import "./App.css"
import { useState } from "react";
import Score from "./components/Score";

const App = () => {

    const [score, setScore] = useState(0)
 
    return (
      <>
      <Score score={score}/>
      <Board score={score} setScore={setScore}/>
      </>

    );
}

export default App;
