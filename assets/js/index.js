// ########################################
/*
*	Table of Contents
*	1)	Constructors
*     a) Controller(state)
*	2)	Prototypes
*     a)
*     b)
*     c)
*     d)
*     e)
*     f)
*	3)	Objects
*     a)
*     b)
* 4)  Callbacks
*     a)
*     b)
*/
// ########################################

// #####################################
/* ---------- Constructors ---------- */
// #####################################

/* ---------- a) Controller ---------- */

var Controller = function(state) {
  // represents the state object.
  this.state = myLibrary.state || state;
};

// ###################################
/* ---------- Prototypes ---------- */
// ###################################

/* ---------- a) addItem ---------- */

Controller.prototype.addItem = function(things) {
  this.state.items.push(myLibrary.QUESTIONS);
};

/* ---------- b) getNextQuestion ---------- */

Controller.prototype.getNextQuestion = function(element) {

  addItem_Callback(this.state.items[this.state.current_question], this.state.current_question, this.state.items);
  /* DOM Rendering Functions */
  function renderScore() {
    $('.questions-page').hide();
    $('.results-page').css('display', 'block');
    $('.score').empty().append(this.state.correct);
  }
  function renderQuestion() {
    this.state.questionHTML = '<p>' + this.state.items[this.state.current_question].text + '</p>';
    element.html(this.state.questionHTML);
  }
  /* Changes State */
  function addItem_Callback(question, index, questions) {

      if (question === undefined) {
        renderScore();
      }

      else {
        renderQuestion();
        question.display = true;
        this.state.current_question += 1;
      }
  }
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
  console.log(this.state.answers[this.state.index]);
  if (this.state.answers[this.state.index] === chosenAnswer) {
    this.state.correct += 1;
  }
};

/* ---------- e) reset ---------- */

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

// ################################
/* ---------- Objects ---------- */
// ################################

/* ---------- a)  ---------- */



/* ---------- b)  ---------- */
