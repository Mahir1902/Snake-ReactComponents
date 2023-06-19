import React from "react";
import classes from "./Food.module.css"


const Food = props => {

    const style = {
        left: `${props.foodPos[0]}%`,
        top: `${props.foodPos[1]}%`
    }

  return (
    <>
        <div className={classes.food} style={style}>
            
        </div>
    </>
  )
}

export default Food