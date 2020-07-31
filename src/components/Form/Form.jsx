import React from 'react'
import arrow from '../../assets/images/Arrow 1.svg';
import classes from './Form.module.scss';
import InputMask from '../InputMask/InputMask';
import ProgressBar from '../ProgressBar/ProgressBar';

const Form = ({activeQuiz, quizes, changeAnswer, isFinished, nextQuiz, sendAnswers, inputChangeAnswer, sendedAnswers}) => {
  return (
    <div className={classes.form}>
      <div className={classes.form__progress}>
        <ProgressBar quizesLength={quizes.length} currentQuiz={activeQuiz}/>
      </div>
      <div className={`${classes.form__progress} ${classes.form__quiz}`}>
        {renderQuiz(activeQuiz, quizes.slice(0), changeAnswer, isFinished, sendAnswers, inputChangeAnswer)}
      </div>
      {nextButton(isFinished, nextQuiz, sendedAnswers)}
    </div>
  )
}


const nextButton = (isFinished, nextQuiz, sendedAnswers) => {

  return (
    <div className={isFinished ? classes.nextButton__finished : classes.nextButton} onClick={isFinished ? sendedAnswers : nextQuiz}>
      <div className={classes.nextButton__main}>
        <p>{isFinished ? 'Отправить и получить ответ' : 'Далее'}</p>
        {isFinished ? null :<img src={arrow} alt=""/>}
      </div>
      <div className={classes.nextButton__background}></div>
    </div>
  )
}

function renderQuiz(activeQuiz, quizes, changeAnswer, isFinished, sendAnswers, inputChangeAnswer) {
  if(isFinished) {
    return sendAnswer(sendAnswers.answers, sendAnswers.answer, sendAnswer.inputAnswer, changeAnswer, inputChangeAnswer)
  }
  const {question, placeholder, answers, answer} = quizes[activeQuiz];

  return (
    <>

      <div className={classes.form__quiz__number}>Вопрос {activeQuiz + 1}</div>

      <div className={classes.form__quiz__question}>{question}</div>
      
      {renderQuizAnswer(answers, placeholder, activeQuiz, answer, changeAnswer)}
    </>
  )

}

function sendAnswer(answers, answer, inputAnswer, changeAnswer, inputChangeAnswer) {
  
  return (
    <>
      
      <div className={classes.form__quiz__question}><span>Куда прислать вам ответ?</span></div>

      <div className={classes.form__quiz__sendAnswer}>
        {answers.map(item => answerItem(item.title, answer.title === item.title, changeAnswer))}
      </div>

      <div className={classes.inputMask}>
        <p className={classes.inputMask__text}>Ввведите ваш {answer.type === 'phone' ? 'номер телефона' : 'e-mail'}</p>
        {answer.type === 'phone' ? <InputMask inputChangeAnswer={inputChangeAnswer} /> : <input type="text" className={classes.inputMask__input} placeholder="simple@example.com"/>}

      </div>
    </>
  )
}

function renderQuizAnswer(answers, placeholder, activeQuiz, answer, changeAnswer) {
  if(answers === undefined) {
    console.log(`answer`, answer)
    return <input className={classes.form__quiz__input} value={answer} onChange={(e) => changeAnswer(e.target.value)} placeholder={placeholder} type="number"/>
  }

  return (
    <div className={classes.form__quiz__answers}>
      {answers.map(title => answerItem(title, answer === title, changeAnswer))}
    </div>
  )
}

function answerItem(title, isActive, changeAnswer) {
  return (
    <div className={classes.form__quiz__answers__item} onClick={() => changeAnswer(title)}>
      {renderListType(isActive)}
      <p className={classes.form__quiz__answers__item__text}>{title}</p>
    </div>
  )
}

function renderListType(isActive) {
  const listClasses = isActive ? classes.form__listType__active : classes.form__listType__unActive;
  return (
    <div className={classes.form__listType}>
      <div className={listClasses}></div>
    </div>
  )
}

export default Form;