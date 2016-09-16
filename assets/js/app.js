// ########################################
/*
*	Table of Contents
*	1)	Initialization of Variables
*     a)  NAMESPACE: myLibrary
*     b)  State Object
*     c)  QUESTIONS[obj]
*	2)	Constructors
*     a)
*     b)
*	3)	Prototypes
*     a)
*     b)
*	4)	Objects
*     a)
*     b)
* 5)  Child Functions
*     a) initLoad( )
*     b) readyQuiz( )
*     c) restartQuiz( )
*     d) populateItems( )
* 6)  Validation Checks
*     a)
*     b)
* 7)  App.js Execution
*/
// ########################################

// ####################################################
/* ---------- Initialization of Variables ---------- */
// ####################################################

/* ---------- a) NAMESPACE: myLibrary ---------- */

var myLibrary = myLibrary || {};

/* ---------- b) State Object ---------- */

myLibrary.state = {
  questions_array: [],
  answers: ['0815', '2B', 'BAM128','Barely'],
  score: 0,
  current_question: 0,
  correct: 0,
  count: 0,
};

/* ---------- c) QUESTIONS[obj] ---------- */

myLibrary.QUESTIONS = [
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

// ################################
/* ---------- Objects ---------- */
// ################################

/* ---------- a) myQuiz ---------- */

var myQuiz = new Controller();

/* ---------- b)  ---------- */



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
    console.log($(this).text());
    myQuiz.getNextQuestion($('.question'));
    $('.question-current').empty().append(state.current_question);
  });

  restartQuiz();
}

/* ---------- b) readyQuiz ---------- */

function readyQuiz() {
  populateItems();
  myQuiz.getNextQuestion($('.question'));
  myQuiz.renderAnswers($('.answers'));
  $('.question-current').empty().append(state.current_question);
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

  /* Callback Funcion */
  // question represents an element of QUESTIONS[obj].
  function populateItems_Callback(question, index, QUESTIONS) {
    // Apply addItem to new instance of Controller.
    myQuiz.addItem(question);
  }
  // Iterate over QUESTIONS[obj] array & apply callback.
  _.each(QUESTIONS, populateItems_Callback);
}

// ##########################################
/* ---------- Validation Checks ---------- */
// ##########################################

/* ---------- a)  ---------- */



/* ---------- b)  ---------- */



// #########################################
/* ---------- App.js Execution ---------- */
// #########################################

$(document).ready(initLoad);
