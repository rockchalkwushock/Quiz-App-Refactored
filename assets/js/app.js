import $ from 'jquery';
import ControllerFactory, {MYLIBRARY} from './controller';

// ########################################
/*
*	Table of Contents
*	1)	Objects
*     a)  myQuiz
* 2)  Child Functions
*     a) initLoad( )
*     b) readyQuiz( )
*     c) restartQuiz( )
*     d) populateItems( )
* 4)  App.js Execution
*/
// ########################################

// ########################################
/* --------------- Objects ------------- */
// ########################################

/* ------------- a) myQuiz ------------- */

let myQuiz = ControllerFactory.getController();

// ########################################
/* ---------- Child Functions ---------- */
// ########################################

/* ------------ a) initLoad ------------ */
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
}

/* ------------ b) readyQuiz ----------- */

function readyQuiz() {
  populateItems();
  myQuiz.getNextQuestion($('.question'));
  myQuiz.renderAnswers($('.answers'));
  $('.question-current').empty().append(MYLIBRARY.state.current_question);
  $('.questions-total').empty().append('4');
}

/* ----------- c) restartQuiz ---------- */

function restartQuiz() {
  $('.restart-button').on('click', function(event) {
    event.preventDefault();
    myQuiz.reset($('.results-page'), $('.questions-page'));
    initLoad();
  });
}

/* ---------- d) populateItems --------- */

function populateItems() {
    myQuiz.addItem();
}

// ########################################
/* ---------- App.js Execution --------- */
// ########################################

$(document).ready(initLoad);
