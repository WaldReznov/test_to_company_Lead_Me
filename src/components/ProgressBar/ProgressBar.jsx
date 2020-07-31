import React, { Fragment } from 'react';
import classes from './ProgressBar.module.scss'

function ProgressBar({quizesLength, currentQuiz}) {
  const quizes = Array(quizesLength).fill(1).map((item, index) => {
    return (
      <Fragment key={index}>
        {circle(currentQuiz >= index)}
        {quizesLength > index + 1 ? progressDiv(currentQuiz > index) : null}
      </Fragment>
    )
  })

  return quizes;
}

function circle(isActive) {
  const circleClass = `${classes.progress__circle} ${isActive ? classes.progress__circle__active : classes.progress__circle__unActive}`
  return (
    <div className={classes.circle__background}>
      <div className={circleClass}></div>
    </div>
  )
}

function progressDiv(isActive) {
  const progressClass = `${isActive ? classes.progress__div__active : classes.progress__div__unActive}`

  return (
    <div className={classes.progress__div}>
      <div className={progressClass}></div>
    </div>
  )
}

export default ProgressBar;