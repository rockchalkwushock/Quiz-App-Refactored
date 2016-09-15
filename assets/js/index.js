// The State

var state = {
  // starting state of questions in DOM - none.
  'questions_array': [],
  // answers[] is static but will be changed out with every question iteration
  'answers': [
    '0815',
    '2B',
    'BAM128',
    'Barely'
  ],
  // starting value shown as score in DOM.
  'score': 0,
  // starting value of question when DOM Loads.
  'current_question': 0,
  // This is the answer index for Q1
  // NOTE: if QUESTIONS[objs] were randomized this will be 'false'.
  'correct': 0,
  // starting value of counter
  'count': 0,
};


// The Action
// NOTE: state will always be a parameter to Action Functions.

var addItem = function(state, question) {
  state.questions_array.push(question);
};

var getNextQuestion = function(state, element) {
  
};
