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
        answers: [
            '0815',
            '2B',
            'BAM128',
            'Barely'
        ],
        correct: 0,
        display: false
    },
    {
        text: '+0+0+0+0+0+0+0+2)+0+0+9)+7))+3)-0-0-0-0-0-0-0-9)+0+0+0+0+0+0+0+0+7)-8)+3)-6)-8)-7-0-0-0-0-0-0)',
        answers: [
            '0815',
            '2B',
            'BAM128',
            'Barely'
        ],
        correct: 1,
        display: false
    },
    {
        text: '*6*3p*4*3*2*0p*2*1*0pp>0*1*0p*5*4*0p*5*4*2*1*0p*4*3p*1*0p/+0p+0*6*5*2p+0*5*0p',
        answers: [
            '0815',
            '2B',
            'BAM128',
            'Barely'
        ],
        correct: 2,
        display: false
    },
    {
        text: ']xhhhhooooooooohhhhhhxooooooooxooooooxjjjxhoooohhhxhohhhhhhhxhhhhjjjhhhxhhhhooooooooohhhhhhxjjjxxjjjjjjjxjhhhhxjhhhhhhhhjjjhh~',
        answers: [
            '0815',
            '2B',
            'BAM128',
            'Barely'
        ],
        correct: 3,
        display: false
    }
];

// This will be our Constructor for handling the state object.

var Controller = function(state) {
  // represents the state object.
  this.state = state;
  // represents the QUESTIONS[obj] that will be passed.
  this.questions = this.state.items;
  // represents the static answers.
  this.answers = this.state.answers;
  // represents the current question state.
  this.current_question = this.state.current_question;
  // represents our counter.
  this.index = this.state.index;
  // represents the user's score.
  this.correct = this.state.correct;
  // represents ............ 'this'
  this.questionHTML = this.state.questionHTML;
};

// These prototypes of our Constructor Controller() are the ACTIONS.
// Meaning that these protoypes will change the state.

Controller.prototype.addItem = function(array) {
  this.questions.push(array);
};

Controller.prototype.getNextQuestion = function(element) {

  /* DOM Rendering Functions */
  function renderScore() {
    $('.questions-page').hide();
    $('.results-page').css('display', 'block');
    $('.score').empty().append(this.correct);
  }
  function renderQStart() {
    this.questionHTML = '<p>' + this.questions[0].text + '</p>';
  }
  function renderQInProgress() {
    this.questionHTML = '<p>' + this.questions[this.index + 1].text + '</p>';
  }
  /* Callback Function */
  function addItem_Callback(question, index, questions) {
    // Is the Quiz in progress or not
    if (this.questions[this.index].display) {
      this.questions[this.index].display = false;
      this.current_question += 1;
      // Have we gone passed the number of elements in the array?
      // TRUE: Show Score & Hide the Questions Page.
      if (this.questions[this.index + 1] === undefined) {
        renderScore();
      }
      // FALSE: Render the next question in the array.
      else {
        this.questions[this.index + 1].display = true;
        renderQuestion();
        this.index++;
      }
    }
  }

  // Iterate over the array of question objects apply the callback.
  _.each(this.questions, addItem_Callback);
  // Have we started the Quiz?
  // If not then start at question #1 & render question to the DOM.
  if (this.questionHTML === null) {
    this.questions[0].display = true;
    renderQStart();
    this.current_question += 1;
  }

  element.html(this.questionHTML);
};

Controller.prototype.renderAnswers = function(element) {

  /* Callback Function */
  function renderAnswers_Callback(answer) {
    return '<li><button class="answers-btn" type="button">' + answer + '</button></li>';
  }
  // Iterate over the answers array & apply the callback.
  var answersHTML = _.map(this.answers, renderAnswers_Callback);

  element.html(answersHTML);
};

Controller.prototype.checkAnswer = function(chosenAnswer) {
  if (this.questions[this.index].answer === chosenAnswer) {
    this.correct += 1;
  }
};

Controller.prototype.reset = function(element, element2) {
  this.questions = [];
  this.answers = this.state.answers; // NOTE: Answers never change state or order.
  this.current_question = 0;
  this.correct = 0;
  this.index = 0;
  this.questionHTML = null;

  element.css('display', 'none');
  element2.show();

  populateItems();

  myQuiz.getNextQuestion($('.question'));

  $('.question-current').empty().append(this.current_question);

  myQuiz.renderAnswers($('.answers'));
};

// Create a new instance of Controller Constructor Function.
var myQuiz = new Controller(state);



function initLoad() {

  readyQuiz();

  $('.answers-btn').on('click', function(event) {
    event.preventDefault();

    myQuiz.checkAnswer($(this).text());
    myQuiz.getNextQuestion($('.question'));
    $('.question-current').empty().append(state.current_question);
  });

  restartQuiz();
}

function readyQuiz() {
  populateItems();
  myQuiz.getNextQuestion($('.question'));
  $('.question-current').empty().append(state.current_question);
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
