import React from 'react'
import classes from './Score.module.css'

const Score = ({score}) => {
  return (
    <div className={classes.score}>
        Score: {score}
    </div>
  )
}

export default Score