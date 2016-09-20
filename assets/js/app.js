// ########################################
/*
*	Table of Contents
*	1)	Initialization of Variables
*     a)  NAMESPACE: MYLIBRARY
*     b)  State Object
*     c)  questionList[obj]
* 2)  Child Functions
*     a) initLoad( )
*     b) readyQuiz( )
*     c) restartQuiz( )
*     d) populateItems( )
* 3)  Validation Checks
*     a)
*     b)
* 4)  App.js Execution
*/
// ########################################

// ####################################################
/* ---------- Initialization of Variables ---------- */
// ####################################################

/* ---------- a) NAMESPACE: MYLIBRARY ---------- */

var MYLIBRARY = MYLIBRARY || {};

/* ---------- b) State Object ---------- */

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

/* ---------- c) questionList[obj] ---------- */

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
