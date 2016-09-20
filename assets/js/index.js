// ########################################
/*
*	Table of Contents
*	1)	Constructors
*     a) Controller(state)
*	2)	Prototypes
*     a) addItem
*     b) getNextQuestion
*     c) processQuestion
*     d) renderScore
*     e) renderQuestion
*     f) renderAnswers
*     g) checkAnswer
*     h) reset
*	3)	Objects
*     a) myQuiz
*/
// ########################################

// #####################################
/* ---------- Constructors ---------- */
// #####################################

/* ---------- a) Controller ---------- */

var Controller = function(state) {
  // represents the state object.
  this.state = MYLIBRARY.state || state;
};

// ###################################
/* ---------- Prototypes ---------- */
// ###################################

/* ---------- a) addItem ---------- */

Controller.prototype.addItem = function() {
  this.state.items = MYLIBRARY.questionList;
};

/* ---------- b) getNextQuestion ---------- */

Controller.prototype.getNextQuestion = function(element) {
  this.processQuestion(this.state.items[this.state.current_question], this.state.current_question, element);
};

/* ---------- c) processQuestion ---------- */

Controller.prototype.processQuestion = function(question, index, element) {
  if (question === undefined) {
    this.renderScore();
  }
  else {
    this.renderQuestion(question, element);
    question.display = true;
    this.state.current_question += 1;
  }
};

/* ---------- d) renderScore ---------- */

Controller.prototype.renderScore = function() {
  $('.questions-page').hide();
  $('.results-page').css('display', 'block');
  $('.score').empty().append(this.state.correct);
};

/* ---------- e) renderQuestion ---------- */

Controller.prototype.renderQuestion = function(question, element) {
    this.state.questionHTML = '<p>' + question.text + '</p>';
    element.html(this.state.questionHTML);
};

/* ---------- c) renderAnswers ---------- */

Controller.prototype.renderAnswers = function(element) {

  /* Callback Function */
  function renderAnswers_Callback(answer) {
    return '<li><button class="answers-btn" type="button">' + answer + '</button></li>';
  }
  // Iterate over the answers array & apply the callback.
  var answersHTML = _.map(this.state.answers, renderAnswers_Callback);

  element.html(answersHTML);
};

/* ---------- d) checkAnswer ---------- */

Controller.prototype.checkAnswer = function(chosenAnswer) {
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
};

/* ---------- e) reset ---------- */

Controller.prototype.reset = function(element, element2) {

  this.state.items = [];
  this.state.answers = this.state.answers;
  this.state.current_question = 0;
  this.state.correct = 0;
  this.state.index = 0;
  this.state.questionHTML = null;

  element.css('display', 'none');
  element2.show();

  initLoad();
};

// ################################
/* ---------- Objects ---------- */
// ################################

/* ---------- a) myQuiz ---------- */

var myQuiz = new Controller();
