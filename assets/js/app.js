/* jshint esversion: 6 */
// ########################################
/*
*	Table of Contents
*	1)	Webpack Imports
*     a)  control
* 2)  Child Functions
*     a) initLoad( )
*     b) readyQuiz( )
*     c) restartQuiz( )
*     d) populateItems( )
* 4)  App.js Execution
*/
// ########################################

// ########################################
/* ---------- Webpack Imports ---------- */
// ########################################

/* ---------- a) control ---------- */

let control = require('./controller');

// ########################################
/* ---------- Child Functions ---------- */
// ########################################

/* ---------- a) initLoad ---------- */
function initLoad()
{
  readyQuiz();

  $('.answers-btn').on('click', function(event) {
    event.preventDefault();

    myQuiz.checkAnswer($(this).text());
    myQuiz.getNextQuestion($('.question'));
    $('.question-current').empty().append(MYLIBRARY.state.current_question);
  });

  restartQuiz();
  initLoad();
}

/* ---------- b) readyQuiz ---------- */

function readyQuiz() {
  populateItems();
  myQuiz.getNextQuestion($('.question'));
  myQuiz.renderAnswers($('.answers'));
  $('.question-current').empty().append(MYLIBRARY.state.current_question);
  $('.questions-total').empty().append('4');
}

/* ---------- c) restartQuiz ---------- */

function restartQuiz() {
  $('.restart-button').on('click', function(event) {
    event.preventDefault();
    myQuiz.reset($('.results-page'), $('.questions-page'));
  });
}

/* ---------- d) populateItems ---------- */

function populateItems() {
    myQuiz.addItem();
}

// #########################################
/* ---------- App.js Execution ---------- */
// #########################################

$(document).ready(initLoad);
