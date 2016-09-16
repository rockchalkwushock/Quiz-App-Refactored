// Global Variables

var state = {
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

var QUESTIONS = [
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

// This will be our Constructor for handling the state object.

var Controller = function(state) {
  // represents the state object.
  // this.state = myLibrary.state || state;
  this.state = state;
};

// These prototypes of our Constructor Controller() are the ACTIONS.
// Meaning that these protoypes will change the state.

Controller.prototype.addItem = function(QUESTIONS) {
  this.state.items.push(QUESTIONS);
};

Controller.prototype.getNextQuestion = function(element) {

  // Iterate over the array of question objects apply the callback.
  // _.each(this.state.items, addItem_Callback);
  addItem_Callback(this.state.items[this.state.current_question], this.state.current_question, this.state.items);
  /* DOM Rendering Functions */
  function renderScore() {
    $('.questions-page').hide();
    $('.results-page').css('display', 'block');
    $('.score').empty().append(this.state.correct);
  }
  function renderQStart() {
    this.state.questionHTML = '<p>' + this.state.items[0].text + '</p>';
    element.html(this.state.questionHTML);
  }
  function renderQInProgress() {
    this.state.questionHTML = '<p>' + this.state.items[this.state.index + 1].text + '</p>';
    element.html(this.state.questionHTML);
  }

  function renderQuestion() {
    this.state.questionHTML = '<p>' + this.state.items[this.state.current_question].text + '</p>';
    element.html(this.state.questionHTML);
  }
  /* Callback Function */
  function addItem_Callback(question, index, questions) {

      if (question === undefined) {
        renderScore();
      }

      else {
        renderQuestion();
        question.display = true;
        this.state.current_question += 1;
        // element.html(this.state.questionHTML);
      }
  }
  // element.html(this.state.questionHTML); Should go here!!!!
};

Controller.prototype.renderAnswers = function(element) {

  /* Callback Function */
  function renderAnswers_Callback(answer) {
    return '<li><button class="answers-btn" type="button">' + answer + '</button></li>';
  }
  // Iterate over the answers array & apply the callback.
  var answersHTML = _.map(this.state.answers, renderAnswers_Callback);

  element.html(answersHTML);
};

Controller.prototype.checkAnswer = function(chosenAnswer) {
  console.log(this.state.answers[this.state.index]);
  if (this.state.answers[this.state.index] === chosenAnswer) {
    this.state.correct += 1;
  }
};

Controller.prototype.reset = function(element, element2) {

  this.state.items = [];
  this.state.answers = this.state.answers; // NOTE: Answers never change state or order.
  this.state.current_question = 0;
  this.state.correct = 0;
  this.state.index = 0;
  this.state.questionHTML = null;

  element.css('display', 'none');
  element2.show();

  populateItems();

  myQuiz.getNextQuestion($('.question'));

  $('.question-current').empty().append(this.state.current_question);

  myQuiz.renderAnswers($('.answers'));
};

// Create a new instance of Controller Constructor Function.
var myQuiz = new Controller(state);
// var myQuiz2 = new Controller();



function initLoad() {

  readyQuiz();

  $('.answers-btn').on('click', function(event) {
    event.preventDefault();

    myQuiz.checkAnswer($(this).text());
    console.log($(this).text());
    myQuiz.getNextQuestion($('.question'));
    $('.question-current').empty().append(state.current_question);
  });

  restartQuiz();
}

function readyQuiz() {
  populateItems();
  myQuiz.getNextQuestion($('.question'));
  myQuiz.renderAnswers($('.answers'));
  $('.question-current').empty().append(state.current_question);
  $('.questions-total').empty().append('4');
}

function restartQuiz() {
  $('.restart-button').on('click', function(event) {
    event.preventDefault();
    myQuiz.reset($('.results-page'), $('.questions-page'));
  });
}

function populateItems() {

  /* Callback Funcion */
  // question represents an element of QUESTIONS[obj].
  function populateItems_Callback(question, index, QUESTIONS) {
    // Apply addItem to new instance of Controller.
    myQuiz.addItem(question);
  }
  // Iterate over QUESTIONS[obj] array & apply callback.
  _.each(QUESTIONS, populateItems_Callback);
}

$(document).ready(initLoad);
