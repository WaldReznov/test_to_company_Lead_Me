import React, { Component } from 'react';
import classes from './ProgressBar.module.scss'

function ProgressBar({quizesLength, currentQuiz}) {
  console.log(`quizesLength`, quizesLength)
  console.log(`currentQuiz`, currentQuiz)
  const quizes = Array(quizesLength).fill(1).map((item, index) => {
    return (
      <>
        {circle(currentQuiz >= index)}
        {quizesLength > index + 1 ? progressDiv(currentQuiz > index) : null}
      </>
    )
  })
  return (
    quizes
  )
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