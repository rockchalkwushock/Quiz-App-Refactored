import $ from 'jquery';
import _ from 'lodash';
export const MYLIBRARY = MYLIBRARY || {};


// ########################################
/*
*	Table of Contents
* 1)  Initialization of Variables
*     a)  State Object
*     n)  questionList[obj]
*	2)	Classes
*     a) ControllerFactory
*	3)	Methods of ControllerFactory
*     a) addItem
*     b) getNextQuestion
*     c) processQuestion
*     d) renderScore
*     e) renderQuestion
*     f) renderAnswers
*     g) checkAnswer
*     h) reset
*/
// ########################################

// ########################################
/* ---- Initialization of Variables ---- */
// ########################################

/* -------- a) State Object ------------ */

MYLIBRARY.state = {
  // starting state of questions in DOM - none.
  items: [],
  // answers[] is static but will be changed out with every question iteration
  answers: [
    '0815',
    '2B',
    'BAM128',
    'Barely'
  ],
  // starting value of question when DOM Loads.
  current_question: 0,
  // starting value shown as score in DOM.
  correct: 0,
  // starting value of counter
  index: 0,
  // sets questionHTML to be 'this.'
  questionHTML: null
};

/* -------- b) questionList[obj] ------- */

MYLIBRARY.questionList = [
    {
        text: '<:48:x<:65:=<:6C:$=$=$$~<:03:+$~<:ffffffffffffffbd:+$<:ffffffffffffffb1:+$<:57:~$~<:18:x+$~<:03:+$~<:06:x-$x<:0e:x-$=x<:43:x-$',
        answer: '0185',
        display: false
    },
    {
        text: '+0+0+0+0+0+0+0+2)+0+0+9)+7))+3)-0-0-0-0-0-0-0-9)+0+0+0+0+0+0+0+0+7)-8)+3)-6)-8)-7-0-0-0-0-0-0)',
        answer: '2B',
        display: false
    },
    {
        text: '*6*3p*4*3*2*0p*2*1*0pp>0*1*0p*5*4*0p*5*4*2*1*0p*4*3p*1*0p/+0p+0*6*5*2p+0*5*0p',
        answer: 'BAM128',
        display: false
    },
    {
        text: ']xhhhhooooooooohhhhhhxooooooooxooooooxjjjxhoooohhhxhohhhhhhhxhhhhjjjhhhxhhhhooooooooohhhhhhxjjjxxjjjjjjjxjhhhhxjhhhhhhhhjjjhh~',
        answer: 'Barely',
        display: false
    }
];

// ########################################
/* -------------- Classes -------------- */
// ########################################

/* -------- a) ControllerFactory ------- */

export default class ControllerFactory {
    // constructor will build new objects.
    constructor(state) {
      this.state = MYLIBRARY.state || state;
    }

    // Methods of constructor
    // Will be inherited to all protoypes of constructor.

    /* Static Method (via MDN):
    The static keyword defines a static method for a class.
    Static methods are called without instantiating their class and
    are also not callable when the class is instantiated.
    Static methods are often used to create utility
    functions for an application.
    */
    static getController() {
      return new ControllerFactory();
    }

    addItem() {
      this.state.items = MYLIBRARY.questionList;
    }

    getNextQuestion(element) {
      this.processQuestion(this.state.items[this.state.current_question], this.state.current_question, element);
    }

    processQuestion(question, index, element) {
      if (question === undefined) {
        this.renderScore();
      }
      else {
        this.renderQuestion(question, element);
        question.display = true;
        this.state.current_question += 1;
      }
    }

    renderScore() {
      $('.questions-page').hide();
      $('.results-page').css('display', 'block');
      $('.score').empty().append(this.state.correct);
    }

    renderQuestion(question, element) {
      this.state.questionHTML = '<p>' + question.text + '</p>';
      element.html(this.state.questionHTML);
    }

    renderAnswers(element) {
      /* Callback Function */
      function renderAnswers_Callback(answer) {
        return '<li><button class="answers-btn" type="button">' + answer + '</button></li>';
      }
      // Iterate over the answers array & apply the callback.
      var answersHTML = _.map(this.state.answers, renderAnswers_Callback);

      element.html(answersHTML);
    }

    checkAnswer(chosenAnswer) {
      if (this.state.index === 0) {
        if (this.state.answers[this.state.index] === chosenAnswer) {
          this.state.correct += 1;
          this.state.index += 1;
        }
      } else {
        if (this.state.answers[this.state.index] === chosenAnswer) {
          this.state.correct += 1;
          if (this.state.correct < 4) {
            this.state.index += 1;
          }
        }
      }
    }

    reset(element, element2) {
      this.state.items = [];
      this.state.answers = this.state.answers;
      this.state.current_question = 0;
      this.state.correct = 0;
      this.state.index = 0;
      this.state.questionHTML = null;

      element.css('display', 'none');
      element2.show();
    }
}
