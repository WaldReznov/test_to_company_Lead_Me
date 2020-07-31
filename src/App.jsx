import React, { Component } from 'react';
import logo from './assets/images/logo.svg';
import bush from './assets/images/Bush.png';
import cow from './assets/images/Group 271.png';
import classes from './App.module.scss';
import Form from './components/Form/Form.jsx'
import Facts from './components/Facts/Facts';

class App extends Component {

  uuid = () => ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,c=>(c^crypto.getRandomValues(new Uint8Array(1))[0]&15 >> c/4).toString(16));

  state = {
    activeQuiz: 0,
    isFinished: false,
    quizes: [
      {
        id: (this.uuid()),
        question: <>Сколько у вас <span>дойных коров?</span></>,
        answer: '',
        placeholder: 'Например: 45'
      },
      {
        id: (this.uuid()),
        question: <>Сколько <span>молока в сутки вы доите?</span></>,
        answer: '',
        placeholder: 'Например: 45'
      },
      {
        id: (this.uuid()),
        question: <><span>Вы являетесь?</span></>,
        answers: ['Руководителем фермы', 'Зоотехником', 'Ветеренаром'],
        answer: 'Руководителем фермы'
      }
    ],
    sendAnswers: null,
    answerSended: false
  }

  componentDidMount() {
    const sendAnswers = {
      question: <><span>Куда прислать вам ответ?</span></>,
      answer: null,
      inputAnswer: '',
      answers: [
        {
          id: (this.uuid()),
          title: 'По телефону',
          type: 'phone'
        },
        {
          id: (this.uuid()),
          title: 'E-mail',
          type: 'email'
        },
        {
          id: (this.uuid()),
          title: 'Viber',
          type: 'phone'
        },
        {
          id: (this.uuid()),
          title: 'Telegram',
          type: 'phone'
        },
        {
          id: (this.uuid()),
          title: 'Whatsaap',
          type: 'phone'
        }
      ]
    }
    sendAnswers.answer = sendAnswers.answers[0];
    
    this.setState({
      sendAnswers
    })
  }

  facts = [
    {
      id: (this.uuid()),
      title: <>Своевременного <br/> определения половой охоты</>,
      subtitle: <>особенно если она не заметна <br/> по внешним признакам</>
    },
    {
      id: (this.uuid()),
      title: <>Анализом состояния <br/> здоровья коровы</>,
      subtitle: <>при наблюдении за жвачкой, <br/> активностью и температурой тела</>
    },
    {
      id: (this.uuid()),
      title: <>Выявление хромоты</>,
      subtitle: <>предупреждением <br/> и выявлением развития <br/> хромоты</>
    }
  ]

  sendedAnswers = () => {
    if(this.isValidAnswer()) {
      this.setState({
        answerSended: true
      })
    } else {
      alert('Введите корректные данные')
    }
  }

  isValidAnswer = () => {
    const {answer: {type}, inputAnswer} = this.state.sendAnswers;

    return type === 'phone' ? this.isValidPhone(inputAnswer) : this.isValidEmail(inputAnswer);
  }

  isValidPhone = (inputAnswer) => {
    return inputAnswer.length === 17
  }

  isValidEmail = (inputAnswer) => {
    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(inputAnswer).toLowerCase());
  }

  changeAnswer = (text) => {
    const isFinished = this.state.isFinished;
    if(isFinished) {
      const answer = this.state.sendAnswers.answers.slice(0).find(item => item.title === text);
      const sendAnswers = JSON.parse(JSON.stringify(this.state.sendAnswers));
      sendAnswers.answer = answer;
      this.setState((prev) => {
        if (prev.sendAnswers.answer.type === sendAnswers.answer.type) {
          return {
            sendAnswers
          }
        }
        sendAnswers.inputAnswer = '';
        return {
          sendAnswers
        }
      })
    } else {
      const quizes = this.state.quizes.slice(0);
      const activeQuiz = this.state.activeQuiz;
      quizes[activeQuiz]['answer'] = text;
      this.setState({
        quizes
      })
    }
  } 

  inputChangeAnswer = (text) => {
    console.log(this.state)
    const sendAnswers = JSON.parse(JSON.stringify(this.state.sendAnswers));
    sendAnswers.inputAnswer = text;
    this.setState({
      sendAnswers
    })

  }

  nextQuiz = () => {
    const {activeQuiz, quizes} = this.state;

    if(activeQuiz + 2 > quizes.length) {
      this.setState({
        isFinished: true
      })
    } else {
      this.setState({
        activeQuiz: activeQuiz + 1
      })
    }
  }

  render() {
    return (
      <main className={classes.main}>
        <div className={classes.bush}>
          <img className={classes.bush__img} src={bush} alt=""/>
        </div>
        <div className={classes.main__content}>
          
        <img className={classes.cow} src={cow} alt=""/>
          <div className={classes.logo}>
            <img className={classes.logo__image} src={logo} alt=""/>
            <p className={classes.logo__text}>Система комплексного мониторинга состояния молочных коров</p>
          </div>
  
          <p className={classes.main__content__answers}>Ответьте на 3 вопроса и узнайте</p>
  
          <h1 className={classes.main__content__raise}>Как <span>увеличить удой каждой коровы до 15%</span> путем</h1>
  
          <Facts facts={this.facts} />
  
          <Form sendedAnswers={this.sendedAnswers} activeQuiz={this.state.activeQuiz} quizes={this.state.quizes} changeAnswer={this.changeAnswer} isFinished={this.state.isFinished} nextQuiz={this.nextQuiz} sendAnswers={this.state.sendAnswers} inputChangeAnswer={this.inputChangeAnswer}/>

        </div>
      </main>
    );
  }
}
export default App;
