import React from 'react'
import {IMaskInput} from 'react-imask';
import classes from './InputMask.module.scss';

function InputMask({inputChangeAnswer}) {
  return (
    <IMaskInput
      className={classes.inputMask__input}
      mask={'+375(00)000-00-00'}
      unmask={true}
      onChange={(event) => inputChangeAnswer(event.target.value)}
      placeholder={'+375 (__) ___-__-__'}
    />
  )
}
export default InputMask;