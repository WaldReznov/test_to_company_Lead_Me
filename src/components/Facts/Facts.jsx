import React from 'react';
import classes from './Facts.module.scss';
import listType from '../../assets/images/list-type.svg';

const Facts = ({facts}) => {
  return (
    <div className={classes.facts}>
      {facts.map(fact => <Fact {...fact} key={fact.id}/>)}
    </div>
  )
}

const Fact = ({title, subtitle}) => {
  return (
    <div className={classes.facts__item}>
      <img src={listType} className={classes.facts__item__img} alt=""/>
      <p className={classes.facts__item__text}>
        <span>{title}<br/></span>
        {subtitle}
      </p>
    </div>
  )
}

export default Facts;